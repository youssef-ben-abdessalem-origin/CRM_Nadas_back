"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionsService", {
    enumerable: true,
    get: function() {
        return PermissionsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _permissionentity = require("./entities/permission.entity");
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
let PermissionsService = class PermissionsService {
    async findAll() {
        return this.permissionRepository.find({
            order: {
                module: 'ASC',
                name: 'ASC'
            }
        });
    }
    async findByModule(module) {
        return this.permissionRepository.find({
            where: {
                module
            }
        });
    }
    // Permissions are typically seeded, not created via API, but I'll add a helper
    async upsert(data) {
        const existing = await this.permissionRepository.findOne({
            where: {
                code: data.code
            }
        });
        const permission = existing || this.permissionRepository.create(data);
        permission.name = data.name;
        permission.module = data.module;
        return this.permissionRepository.save(permission);
    }
    constructor(permissionRepository){
        this.permissionRepository = permissionRepository;
    }
};
PermissionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_permissionentity.Permission)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], PermissionsService);

//# sourceMappingURL=permissions.service.js.map