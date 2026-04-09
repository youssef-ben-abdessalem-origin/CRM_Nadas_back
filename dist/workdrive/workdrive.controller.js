"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkDriveController", {
    enumerable: true,
    get: function() {
        return WorkDriveController;
    }
});
const _common = require("@nestjs/common");
const _workdriveservice = require("./workdrive.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
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
let WorkDriveController = class WorkDriveController {
    getTeam(req) {
        return this.workDriveService.getTeamByOwner(req.user.id);
    }
    createTeam(req, name) {
        return this.workDriveService.createTeam(name, req.user.id);
    }
    getFolders(req, teamId, isTeamFolder, parentId) {
        return this.workDriveService.getFolders(Number(teamId), isTeamFolder === 'true', parentId ? Number(parentId) : undefined);
    }
    createFolder(req, data) {
        return this.workDriveService.createFolder({
            ...data,
            ownerId: req.user.id
        });
    }
    getPermissions(id) {
        return this.workDriveService.getFolderPermissions(Number(id));
    }
    updatePermissions(id, permissions) {
        return this.workDriveService.updatePermissions(Number(id), permissions);
    }
    getFiles(folderId) {
        return this.workDriveService.getFiles(Number(folderId));
    }
    createFile(req, data) {
        return this.workDriveService.createFile({
            ...data,
            ownerId: req.user.id
        });
    }
    constructor(workDriveService){
        this.workDriveService = workDriveService;
    }
};
_ts_decorate([
    (0, _common.Get)('team'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkDriveController.prototype, "getTeam", null);
_ts_decorate([
    (0, _common.Post)('team'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Body)('name')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkDriveController.prototype, "createTeam", null);
_ts_decorate([
    (0, _common.Get)('folders'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Query)('teamId')),
    _ts_param(2, (0, _common.Query)('isTeamFolder')),
    _ts_param(3, (0, _common.Query)('parentId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        String,
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkDriveController.prototype, "getFolders", null);
_ts_decorate([
    (0, _common.Post)('folders'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkDriveController.prototype, "createFolder", null);
_ts_decorate([
    (0, _common.Get)('folders/:id/permissions'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkDriveController.prototype, "getPermissions", null);
_ts_decorate([
    (0, _common.Post)('folders/:id/permissions'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)('permissions')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Array
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkDriveController.prototype, "updatePermissions", null);
_ts_decorate([
    (0, _common.Get)('files'),
    _ts_param(0, (0, _common.Query)('folderId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkDriveController.prototype, "getFiles", null);
_ts_decorate([
    (0, _common.Post)('files'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkDriveController.prototype, "createFile", null);
WorkDriveController = _ts_decorate([
    (0, _common.Controller)('workdrive'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workdriveservice.WorkDriveService === "undefined" ? Object : _workdriveservice.WorkDriveService
    ])
], WorkDriveController);

//# sourceMappingURL=workdrive.controller.js.map