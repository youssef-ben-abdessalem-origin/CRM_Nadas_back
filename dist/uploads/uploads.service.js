"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UploadsService", {
    enumerable: true,
    get: function() {
        return UploadsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _userentity = require("../users/entities/user.entity");
const _leadentity = require("../leads/entities/lead.entity");
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
let UploadsService = class UploadsService {
    async uploadAvatar(userId, file) {
        const result = await this.cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
            folder: 'nexus-crm/avatars',
            public_id: `avatar_${userId}`,
            transformation: [
                {
                    width: 200,
                    height: 200,
                    crop: 'fill',
                    gravity: 'face'
                }
            ]
        });
        await this.userRepository.update(userId, {
            avatar: result.secure_url
        });
        return {
            url: result.secure_url
        };
    }
    async uploadDocument(entityType, entityId, file) {
        const result = await this.cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
            folder: `nexus-crm/${entityType}/${entityId}`
        });
        const attachment = {
            url: result.secure_url,
            name: file.originalname,
            type: file.mimetype,
            uploadedAt: new Date().toISOString()
        };
        if (entityType === 'lead') {
            const lead = await this.leadRepository.findOne({
                where: {
                    id: entityId
                }
            });
            if (lead) {
                const attachments = lead.attachments || [];
                attachments.push(attachment);
                await this.leadRepository.update(entityId, {
                    attachments
                });
            }
        }
        return {
            url: result.secure_url,
            name: file.originalname,
            type: file.mimetype
        };
    }
    async uploadLogo(file) {
        const result = await this.cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
            folder: 'nexus-crm/company',
            public_id: 'company_logo',
            transformation: [
                {
                    width: 400,
                    height: 400,
                    crop: 'limit'
                }
            ]
        });
        return {
            url: result.secure_url
        };
    }
    constructor(cloudinary, userRepository, leadRepository){
        this.cloudinary = cloudinary;
        this.userRepository = userRepository;
        this.leadRepository = leadRepository;
    }
};
UploadsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)('CLOUDINARY')),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userentity.User)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_leadentity.Lead)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], UploadsService);

//# sourceMappingURL=uploads.service.js.map