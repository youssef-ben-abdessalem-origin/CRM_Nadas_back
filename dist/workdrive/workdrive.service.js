"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkDriveService", {
    enumerable: true,
    get: function() {
        return WorkDriveService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workdriveteamentity = require("./entities/workdrive-team.entity");
const _workdrivefolderentity = require("./entities/workdrive-folder.entity");
const _workdrivefileentity = require("./entities/workdrive-file.entity");
const _workdrivepermissionentity = require("./entities/workdrive-permission.entity");
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
let WorkDriveService = class WorkDriveService {
    async getTeamByOwner(ownerId) {
        return this.teamRepo.findOne({
            where: {
                ownerId
            }
        });
    }
    async createTeam(name, ownerId) {
        const team = this.teamRepo.create({
            name,
            ownerId
        });
        return this.teamRepo.save(team);
    }
    async getFolders(teamId, isTeamFolder, parentId) {
        return this.folderRepo.find({
            where: {
                teamId,
                isTeamFolder,
                parentId: parentId || null
            },
            order: {
                name: 'ASC'
            }
        });
    }
    async createFolder(data) {
        const folder = this.folderRepo.create(data);
        return this.folderRepo.save(folder);
    }
    async updatePermissions(folderId, permissions) {
        // Delete existing permissions for this folder
        await this.permissionRepo.delete({
            folderId
        });
        // Add new ones
        const entities = permissions.map((p)=>this.permissionRepo.create({
                folderId,
                userId: p.userId,
                role: p.role
            }));
        return this.permissionRepo.save(entities);
    }
    async getFolderPermissions(folderId) {
        return this.permissionRepo.find({
            where: {
                folderId
            },
            relations: [
                'user'
            ]
        });
    }
    async getFiles(folderId) {
        return this.fileRepo.find({
            where: {
                folderId
            }
        });
    }
    async createFile(data) {
        const file = this.fileRepo.create(data);
        return this.fileRepo.save(file);
    }
    constructor(teamRepo, folderRepo, fileRepo, permissionRepo){
        this.teamRepo = teamRepo;
        this.folderRepo = folderRepo;
        this.fileRepo = fileRepo;
        this.permissionRepo = permissionRepo;
    }
};
WorkDriveService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workdriveteamentity.WorkDriveTeam)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workdrivefolderentity.WorkDriveFolder)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workdrivefileentity.WorkDriveFile)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_workdrivepermissionentity.WorkDrivePermission)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkDriveService);

//# sourceMappingURL=workdrive.service.js.map