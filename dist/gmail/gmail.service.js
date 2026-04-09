"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailService", {
    enumerable: true,
    get: function() {
        return GmailService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _googleapis = require("googleapis");
const _nodefs = /*#__PURE__*/ _interop_require_wildcard(require("node:fs"));
const _nodepath = /*#__PURE__*/ _interop_require_wildcard(require("node:path"));
const _userentity = require("../users/entities/user.entity");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let GmailService = class GmailService {
    initOAuthClient() {
        const credentialsPath = _nodepath.join(process.cwd(), 'client_secret.json');
        const credentials = JSON.parse(_nodefs.readFileSync(credentialsPath, 'utf8'));
        const { client_id, client_secret } = credentials.web;
        this.oauth2Client = new _googleapis.google.auth.OAuth2(client_id, client_secret, 'http://localhost:3001/api/v1/gmail/callback');
    }
    getAuthUrl(userId) {
        const scopes = [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.send'
        ];
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            state: String(userId),
            prompt: 'consent'
        });
    }
    async setTokens(userId, code) {
        console.log('setTokens called with userId:', userId, 'code length:', code.length);
        const { tokens } = await this.oauth2Client.getToken(code);
        console.log('Tokens received:', tokens ? 'yes' : 'no', 'refresh_token:', !!tokens?.refresh_token);
        await this.userRepository.update(userId, {
            gmailTokens: tokens
        });
        console.log('Tokens saved to user:', userId);
        return {
            success: true
        };
    }
    async getTokens(userId) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
        console.log('getTokens for userId:', userId, 'user found:', !!user, 'tokens:', !!user?.gmailTokens);
        return user?.gmailTokens || null;
    }
    async getAuth(userId) {
        const tokens = await this.getTokens(userId);
        if (!tokens) {
            throw new Error('Gmail not connected. Please connect your Gmail account first.');
        }
        const auth = this.oauth2Client;
        auth.setCredentials(tokens);
        return auth;
    }
    async getProfile(userId) {
        const auth = await this.getAuth(userId);
        const gmail = _googleapis.google.gmail({
            version: 'v1',
            auth
        });
        const response = await gmail.users.getProfile({
            userId: 'me'
        });
        return response.data;
    }
    async listMessages(userId, maxResults = 50, pageToken, label = 'INBOX') {
        const auth = await this.getAuth(userId);
        const gmail = _googleapis.google.gmail({
            version: 'v1',
            auth
        });
        const response = await gmail.users.messages.list({
            userId: 'me',
            maxResults,
            pageToken,
            labelIds: [
                label
            ]
        });
        const messages = response.data.messages || [];
        const fullMessages = await Promise.all(messages.map(async (msg)=>{
            const fullMessage = await gmail.users.messages.get({
                userId: 'me',
                id: msg.id,
                format: 'full'
            });
            return fullMessage.data;
        }));
        return {
            messages: fullMessages,
            nextPageToken: response.data.nextPageToken || undefined,
            resultSizeEstimate: response.data.resultSizeEstimate || 0
        };
    }
    async getMessage(userId, messageId) {
        const auth = await this.getAuth(userId);
        const gmail = _googleapis.google.gmail({
            version: 'v1',
            auth
        });
        const response = await gmail.users.messages.get({
            userId: 'me',
            id: messageId,
            format: 'full'
        });
        return response.data;
    }
    async getThread(userId, threadId) {
        const auth = await this.getAuth(userId);
        const gmail = _googleapis.google.gmail({
            version: 'v1',
            auth
        });
        const response = await gmail.users.threads.get({
            userId: 'me',
            id: threadId,
            format: 'full'
        });
        return response.data;
    }
    async isConnected(userId) {
        const tokens = await this.getTokens(userId);
        return !!tokens;
    }
    async disconnect(userId) {
        await this.userRepository.update(userId, {
            gmailTokens: null
        });
    }
    async sendEmail(userId, to, subject, body, threadId) {
        const auth = await this.getAuth(userId);
        const gmail = _googleapis.google.gmail({
            version: 'v1',
            auth
        });
        const message = [
            `To: ${to}`,
            `Subject: ${subject}`,
            '',
            body
        ].join('\n');
        const encodedMessage = Buffer.from(message).toString('base64').replaceAll('+', '-').replaceAll('/', '_');
        const response = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
                threadId
            }
        });
        return {
            messageId: response.data.id
        };
    }
    constructor(userRepository){
        this.userRepository = userRepository;
        this.initOAuthClient();
    }
};
GmailService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_userentity.User)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], GmailService);

//# sourceMappingURL=gmail.service.js.map