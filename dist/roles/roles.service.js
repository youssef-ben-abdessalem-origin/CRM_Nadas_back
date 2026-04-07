"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RolesService", {
    enumerable: true,
    get: function() {
        return RolesService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _roleentity = require("./entities/role.entity");
const _permissionentity = require("../permissions/entities/permission.entity");
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
let RolesService = class RolesService {
    async onModuleInit() {
        await this.seed();
    }
    async seed() {
        const modules = [
            {
                name: 'leads',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete',
                    'export'
                ]
            },
            {
                name: 'deals',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete',
                    'export'
                ]
            },
            {
                name: 'accounts',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'contacts',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'products',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'team',
                perms: [
                    'view',
                    'manage_roles',
                    'manage_perms'
                ]
            }
        ];
        const allPerms = [];
        for (const m of modules){
            for (const p of m.perms){
                let perm = await this.permissionRepository.findOne({
                    where: {
                        code: `${m.name}.${p}`
                    }
                });
                if (!perm) {
                    perm = await this.permissionRepository.save(this.permissionRepository.create({
                        code: `${m.name}.${p}`,
                        name: `${p.replace('_', ' ')} ${m.name}`,
                        module: m.name
                    }));
                }
                allPerms.push(perm);
            }
        }
        const defaultRoles = [
            {
                name: 'ADMIN',
                desc: 'Full system access',
                color: '#ef4444',
                perms: allPerms
            },
            {
                name: 'MANAGER',
                desc: 'Can manage most data but no settings',
                color: '#3b82f6',
                perms: allPerms.filter((p)=>!p.code.includes('team.manage'))
            },
            {
                name: 'USER',
                desc: 'Limited access to own data',
                color: '#10b981',
                perms: allPerms.filter((p)=>p.code.includes('.view'))
            }
        ];
        for (const dr of defaultRoles){
            let role = await this.roleRepository.findOne({
                where: {
                    name: dr.name
                }
            });
            if (!role) {
                role = this.roleRepository.create({
                    name: dr.name,
                    description: dr.desc,
                    color: dr.color,
                    isSystem: true,
                    permissions: dr.perms
                });
                await this.roleRepository.save(role);
            }
        }
    }
    async findAll() {
        return this.roleRepository.find();
    }
    async findOne(id) {
        const role = await this.roleRepository.findOne({
            where: {
                id
            }
        });
        if (!role) throw new _common.NotFoundException('Role not found');
        return role;
    }
    async create(data) {
        const existing = await this.roleRepository.findOne({
            where: {
                name: data.name
            }
        });
        if (existing) throw new _common.BadRequestException('Role already exists');
        const role = this.roleRepository.create({
            name: data.name,
            description: data.description,
            color: data.color,
            isSystem: false
        });
        if (data.permissionIds && data.permissionIds.length > 0) {
            role.permissions = await this.permissionRepository.find({
                where: {
                    id: (0, _typeorm1.In)(data.permissionIds)
                }
            });
        }
        return this.roleRepository.save(role);
    }
    async update(id, data) {
        const role = await this.findOne(id);
        if (data.name) role.name = data.name;
        if (data.description) role.description = data.description;
        if (data.color) role.color = data.color;
        if (data.permissionIds) {
            role.permissions = await this.permissionRepository.find({
                where: {
                    id: (0, _typeorm1.In)(data.permissionIds)
                }
            });
        }
        return this.roleRepository.save(role);
    }
    async delete(id) {
        const role = await this.findOne(id);
        if (role.isSystem) throw new _common.BadRequestException('Cannot delete system roles');
        await this.roleRepository.remove(role);
    }
    constructor(roleRepository, permissionRepository){
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }
};
RolesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_roleentity.Role)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_permissionentity.Permission)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], RolesService);

//# sourceMappingURL=roles.service.js.map