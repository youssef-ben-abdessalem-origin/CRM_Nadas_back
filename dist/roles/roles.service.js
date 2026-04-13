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
const _userentity = require("../users/entities/user.entity");
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
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
                name: 'campaigns',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'vendors',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'quotes',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'invoices',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'orders',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'payments',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'tasks',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'activities',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete'
                ]
            },
            {
                name: 'calendar',
                perms: [
                    'view',
                    'manage'
                ]
            },
            {
                name: 'documents',
                perms: [
                    'view',
                    'upload',
                    'delete',
                    'share'
                ]
            },
            {
                name: 'departments',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete',
                    'assign_representative',
                    'manage_members'
                ]
            },
            {
                name: 'automations',
                perms: [
                    'view',
                    'create',
                    'update',
                    'delete',
                    'toggle'
                ]
            },
            {
                name: 'forecast',
                perms: [
                    'view',
                    'manage'
                ]
            },
            {
                name: 'dashboard',
                perms: [
                    'view'
                ]
            },
            {
                name: 'reports',
                perms: [
                    'view',
                    'export'
                ]
            },
            {
                name: 'emails',
                perms: [
                    'view',
                    'send'
                ]
            },
            {
                name: 'gmail',
                perms: [
                    'connect',
                    'disconnect'
                ]
            },
            {
                name: 'settings',
                perms: [
                    'view',
                    'manage'
                ]
            },
            {
                name: 'team',
                perms: [
                    'view',
                    'manage_users',
                    'manage_roles',
                    'manage_perms',
                    'manage_privileges',
                    'manage_departments'
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
                desc: 'Can manage most business data',
                color: '#3b82f6',
                perms: allPerms.filter((p)=>!p.code.includes('settings.manage') && !p.code.includes('team.manage_roles') && !p.code.includes('team.manage_perms') && !p.code.includes('team.manage_privileges'))
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
            } else if (role.isSystem) {
                role.description = dr.desc;
                role.color = dr.color;
                role.permissions = dr.perms;
            }
            await this.roleRepository.save(role);
        }
        // Seed default admin user
        const adminEmail = 'admin@nexus.crm';
        const adminUser = await this.userRepository.findOne({
            where: {
                email: adminEmail
            }
        });
        if (!adminUser) {
            const adminRole = await this.roleRepository.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            const hashedPassword = await _bcrypt.hash('Admin@123', 10);
            await this.userRepository.save(this.userRepository.create({
                name: 'System Admin',
                email: adminEmail,
                password: hashedPassword,
                role: adminRole,
                enabled: true
            }));
        }
    }
    async findAll() {
        return this.roleRepository.find();
    }
    async findPaginated(page = 1, limit = 10, search) {
        const qb = this.roleRepository.createQueryBuilder('role').leftJoinAndSelect('role.permissions', 'permission');
        if (search) {
            qb.andWhere('(role.name ILIKE :search OR role.description ILIKE :search)', {
                search: `%${search}%`
            });
        }
        qb.distinct(true);
        const total = await qb.getCount();
        const data = await qb.orderBy('role.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getMany();
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    async findOne(id) {
        const role = await this.roleRepository.findOne({
            where: {
                id
            }
        });
        if (!role) throw new _common.NotFoundException(`Role with ID ${id} not found`);
        return role;
    }
    async getRolePermissions(id) {
        const role = await this.findOne(id);
        return role.permissions;
    }
    async create(data) {
        if (!data.name) throw new _common.BadRequestException('Role name is required');
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
    constructor(roleRepository, permissionRepository, userRepository){
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }
};
RolesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_roleentity.Role)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_permissionentity.Permission)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userentity.User)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], RolesService);

//# sourceMappingURL=roles.service.js.map