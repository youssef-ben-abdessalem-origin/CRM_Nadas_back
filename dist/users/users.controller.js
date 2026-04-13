"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersController", {
    enumerable: true,
    get: function() {
        return UsersController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _usersservice = require("./users.service");
const _passport = require("@nestjs/passport");
const _userentity = require("./entities/user.entity");
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
let UsersController = class UsersController {
    findAll() {
        return this.usersService.findAll();
    }
    findPaginated(page, limit, search) {
        return this.usersService.findPaginated(page ? parseInt(page, 10) : 1, limit ? parseInt(limit, 10) : 10, search);
    }
    create(data) {
        return this.usersService.create(data);
    }
    getProfile(req) {
        return req.user;
    }
    async updateProfile(req, data) {
        return this.usersService.updateProfile(req.user.id, data);
    }
    findOne(id) {
        return this.usersService.findOne(+id);
    }
    update(id, data) {
        return this.usersService.update(+id, data);
    }
    delete(id) {
        return this.usersService.delete(+id);
    }
    constructor(usersService){
        this.usersService = usersService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all users'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], UsersController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('paginated'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get paginated users'
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
], UsersController.prototype, "findPaginated", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create user'
    }),
    (0, _swagger.ApiBody)({
        description: 'Create a new user',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Jane Cooper'
                },
                email: {
                    type: 'string',
                    example: 'jane@nexus-crm.com'
                },
                password: {
                    type: 'string',
                    example: 'StrongPass123!'
                },
                roleId: {
                    type: 'string',
                    example: '7d43f5fe-0d5f-4a1e-b0ea-2a3c4f2e7d20'
                },
                phone: {
                    type: 'string',
                    example: '+1 (555) 000-0000'
                },
                enabled: {
                    type: 'boolean',
                    example: true
                }
            },
            required: [
                'name',
                'email',
                'password'
            ]
        }
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], UsersController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)('profile'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get current user profile'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], UsersController.prototype, "getProfile", null);
_ts_decorate([
    (0, _common.Put)('profile'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update current user profile'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
_ts_decorate([
    (0, _common.Get)(':id(\\d+)'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get user by ID'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], UsersController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Put)(':id(\\d+)'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update user'
    }),
    (0, _swagger.ApiBody)({
        description: 'Update an existing user',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Jane C. Cooper'
                },
                phone: {
                    type: 'string',
                    example: '+1 (555) 111-2222'
                },
                roleId: {
                    type: 'string',
                    example: '7d43f5fe-0d5f-4a1e-b0ea-2a3c4f2e7d20'
                },
                enabled: {
                    type: 'boolean',
                    example: true
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
], UsersController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id(\\d+)'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete user'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], UsersController.prototype, "delete", null);
UsersController = _ts_decorate([
    (0, _swagger.ApiTags)('Users'),
    (0, _common.Controller)('users'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], UsersController);

//# sourceMappingURL=users.controller.js.map