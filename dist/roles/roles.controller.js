"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RolesController", {
    enumerable: true,
    get: function() {
        return RolesController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _rolesservice = require("./roles.service");
const _passport = require("@nestjs/passport");
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
let RolesController = class RolesController {
    findAll() {
        return this.rolesService.findAll();
    }
    findPaginated(page, limit, search) {
        return this.rolesService.findPaginated(page ? parseInt(page, 10) : 1, limit ? parseInt(limit, 10) : 10, search);
    }
    findOne(id) {
        return this.rolesService.findOne(id);
    }
    getRolePermissions(id) {
        return this.rolesService.getRolePermissions(id);
    }
    create(data) {
        return this.rolesService.create(data);
    }
    update(id, data) {
        return this.rolesService.update(id, data);
    }
    delete(id) {
        return this.rolesService.delete(id);
    }
    constructor(rolesService){
        this.rolesService = rolesService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all roles'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], RolesController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('paginated'),
    (0, _swagger.ApiOperation)({
        summary: 'Get paginated roles'
    }),
    (0, _swagger.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        example: 1
    }),
    (0, _swagger.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        example: 10
    }),
    (0, _swagger.ApiQuery)({
        name: 'search',
        required: false,
        type: String
    }),
    _ts_param(0, (0, _common.Query)('page')),
    _ts_param(1, (0, _common.Query)('limit')),
    _ts_param(2, (0, _common.Query)('search')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], RolesController.prototype, "findPaginated", null);
_ts_decorate([
    (0, _common.Get)(':id([0-9a-fA-F\\-]{36})'),
    (0, _swagger.ApiOperation)({
        summary: 'Get role by ID'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], RolesController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Get)(':id([0-9a-fA-F\\-]{36})/permissions'),
    (0, _swagger.ApiOperation)({
        summary: 'Get permissions by role ID'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], RolesController.prototype, "getRolePermissions", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create role'
    }),
    (0, _swagger.ApiBody)({
        description: 'Create a new custom role',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Sales Manager'
                },
                description: {
                    type: 'string',
                    example: 'Manages pipeline and team workflows.'
                },
                color: {
                    type: 'string',
                    example: '#6366f1'
                },
                permissionIds: {
                    type: 'array',
                    items: {
                        type: 'number'
                    },
                    example: [
                        1,
                        2,
                        3,
                        7,
                        9
                    ]
                }
            },
            required: [
                'name'
            ]
        }
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], RolesController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id([0-9a-fA-F\\-]{36})'),
    (0, _swagger.ApiOperation)({
        summary: 'Update role'
    }),
    (0, _swagger.ApiBody)({
        description: 'Update role details and permissions',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Senior Sales Manager'
                },
                description: {
                    type: 'string',
                    example: 'Extended permissions for regional management.'
                },
                color: {
                    type: 'string',
                    example: '#4f46e5'
                },
                permissionIds: {
                    type: 'array',
                    items: {
                        type: 'number'
                    },
                    example: [
                        1,
                        2,
                        3,
                        4,
                        7,
                        9,
                        10
                    ]
                }
            }
        }
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], RolesController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id([0-9a-fA-F\\-]{36})'),
    (0, _swagger.ApiOperation)({
        summary: 'Delete role'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], RolesController.prototype, "delete", null);
RolesController = _ts_decorate([
    (0, _swagger.ApiTags)('Roles'),
    (0, _common.Controller)('roles'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _rolesservice.RolesService === "undefined" ? Object : _rolesservice.RolesService
    ])
], RolesController);

//# sourceMappingURL=roles.controller.js.map