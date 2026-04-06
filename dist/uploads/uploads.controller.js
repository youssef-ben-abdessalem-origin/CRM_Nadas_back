"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UploadsController", {
    enumerable: true,
    get: function() {
        return UploadsController;
    }
});
const _common = require("@nestjs/common");
const _platformexpress = require("@nestjs/platform-express");
const _swagger = require("@nestjs/swagger");
const _passport = require("@nestjs/passport");
const _uploadsservice = require("./uploads.service");
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
let UploadsController = class UploadsController {
    async uploadAvatar(req, file) {
        return this.uploadsService.uploadAvatar(req.user.id, file);
    }
    async uploadDocument(req, file, entityType, entityId) {
        return this.uploadsService.uploadDocument(entityType, entityId, file);
    }
    constructor(uploadsService){
        this.uploadsService = uploadsService;
    }
};
_ts_decorate([
    (0, _common.Post)('avatar'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Upload user avatar'
    }),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)('file')),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.UploadedFile)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof _express.Express === "undefined" || typeof _express.Express.Multer === "undefined" || typeof _express.Express.Multer.File === "undefined" ? Object : _express.Express.Multer.File
    ]),
    _ts_metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadAvatar", null);
_ts_decorate([
    (0, _common.Post)('document'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Upload document to lead/contact/account'
    }),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)('file')),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.UploadedFile)()),
    _ts_param(2, (0, _common.Body)('entityType')),
    _ts_param(3, (0, _common.Body)('entityId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof _express.Express === "undefined" || typeof _express.Express.Multer === "undefined" || typeof _express.Express.Multer.File === "undefined" ? Object : _express.Express.Multer.File,
        String,
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadDocument", null);
UploadsController = _ts_decorate([
    (0, _swagger.ApiTags)('Uploads'),
    (0, _common.Controller)('uploads'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _uploadsservice.UploadsService === "undefined" ? Object : _uploadsservice.UploadsService
    ])
], UploadsController);

//# sourceMappingURL=uploads.controller.js.map