"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailController", {
    enumerable: true,
    get: function() {
        return GmailController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _passport = require("@nestjs/passport");
const _gmailservice = require("./gmail.service");
const _express = require("express");
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
let GmailController = class GmailController {
    getAuthUrl(req) {
        const url = this.gmailService.getAuthUrl(req.user.id);
        return {
            url
        };
    }
    async callback(code, state, res) {
        const userId = parseInt(state);
        await this.gmailService.setTokens(userId, code);
        res.redirect('http://localhost:5173/emails?gmail_connected=true');
    }
    async connect(req, code) {
        return this.gmailService.setTokens(req.user.id, code);
    }
    async getStatus(req) {
        const connected = await this.gmailService.isConnected(req.user.id);
        return {
            connected
        };
    }
    async disconnect(req) {
        await this.gmailService.disconnect(req.user.id);
        return {
            success: true
        };
    }
    async getProfile(req) {
        return this.gmailService.getProfile(req.user.id);
    }
    async listMessages(req, maxResults, pageToken) {
        return this.gmailService.listMessages(req.user.id, maxResults ? parseInt(maxResults) : 50, pageToken);
    }
    async getMessage(req, id) {
        return this.gmailService.getMessage(req.user.id, id);
    }
    constructor(gmailService){
        this.gmailService = gmailService;
    }
};
_ts_decorate([
    (0, _common.Get)('auth-url'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get Gmail OAuth URL'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], GmailController.prototype, "getAuthUrl", null);
_ts_decorate([
    (0, _common.Get)('callback'),
    (0, _swagger.ApiOperation)({
        summary: 'Gmail OAuth callback'
    }),
    _ts_param(0, (0, _common.Query)('code')),
    _ts_param(1, (0, _common.Query)('state')),
    _ts_param(2, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], GmailController.prototype, "callback", null);
_ts_decorate([
    (0, _common.Post)('connect'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Connect Gmail with authorization code'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Query)('code')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], GmailController.prototype, "connect", null);
_ts_decorate([
    (0, _common.Get)('status'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Check Gmail connection status'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], GmailController.prototype, "getStatus", null);
_ts_decorate([
    (0, _common.Post)('disconnect'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Disconnect Gmail'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], GmailController.prototype, "disconnect", null);
_ts_decorate([
    (0, _common.Get)('profile'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get Gmail profile'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], GmailController.prototype, "getProfile", null);
_ts_decorate([
    (0, _common.Get)('messages'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'List Gmail messages'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Query)('maxResults')),
    _ts_param(2, (0, _common.Query)('pageToken')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], GmailController.prototype, "listMessages", null);
_ts_decorate([
    (0, _common.Get)('messages/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get Gmail message by ID'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], GmailController.prototype, "getMessage", null);
GmailController = _ts_decorate([
    (0, _swagger.ApiTags)('Gmail'),
    (0, _common.Controller)('gmail'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gmailservice.GmailService === "undefined" ? Object : _gmailservice.GmailService
    ])
], GmailController);

//# sourceMappingURL=gmail.controller.js.map