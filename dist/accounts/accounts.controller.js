"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccountsController", {
    enumerable: true,
    get: function() {
        return AccountsController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _accountsservice = require("./accounts.service");
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
const createAccountExample = {
    name: "Acme Corp",
    website: "https://acme.com",
    industry: "Technology",
    accountTypeId: 1,
    accountStatusId: 1,
    accountTierId: 1,
    annualRevenue: 10000000,
    employeeCount: 500,
    phone: "+1 555-123-4567",
    email: "contact@acme.com",
    location: "San Francisco, CA",
    address: "123 Market St",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    zipCode: "94105",
    owner: "John Doe <john@acme.com>",
    description: "Leading technology company",
    notes: "Enterprise customer"
};
let AccountsController = class AccountsController {
    // Account Types - must come before :id routes
    getTypes() {
        return this.accountsService.getTypes();
    }
    createType(data) {
        return this.accountsService.createType(data.name, data.color);
    }
    updateType(id, data) {
        return this.accountsService.updateType(+id, data);
    }
    deleteType(id) {
        return this.accountsService.deleteType(+id);
    }
    // Account Statuses - must come before :id routes
    getStatuses() {
        return this.accountsService.getStatuses();
    }
    createStatus(data) {
        return this.accountsService.createStatus(data.name, data.color);
    }
    updateStatus(id, data) {
        return this.accountsService.updateStatus(+id, data);
    }
    deleteStatus(id) {
        return this.accountsService.deleteStatus(+id);
    }
    // Account Tiers - must come before :id routes
    getTiers() {
        return this.accountsService.getTiers();
    }
    createTier(data) {
        return this.accountsService.createTier(data.name, data.color);
    }
    updateTier(id, data) {
        return this.accountsService.updateTier(+id, data);
    }
    deleteTier(id) {
        return this.accountsService.deleteTier(+id);
    }
    // Account CRUD - comes after specific routes
    findAll() {
        return this.accountsService.findAll();
    }
    findOne(id) {
        return this.accountsService.findOne(+id);
    }
    create(data) {
        console.log('[Controller] Received data, owner:', data?.owner);
        return this.accountsService.create(data);
    }
    update(id, data) {
        return this.accountsService.update(+id, data);
    }
    delete(id) {
        return this.accountsService.delete(+id);
    }
    constructor(accountsService){
        this.accountsService = accountsService;
    }
};
_ts_decorate([
    (0, _common.Get)('types'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all account types'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "getTypes", null);
_ts_decorate([
    (0, _common.Post)('types'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create account type'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "createType", null);
_ts_decorate([
    (0, _common.Put)('types/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update account type'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "updateType", null);
_ts_decorate([
    (0, _common.Delete)('types/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete account type'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "deleteType", null);
_ts_decorate([
    (0, _common.Get)('statuses'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all account statuses'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "getStatuses", null);
_ts_decorate([
    (0, _common.Post)('statuses'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create account status'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "createStatus", null);
_ts_decorate([
    (0, _common.Put)('statuses/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update account status'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "updateStatus", null);
_ts_decorate([
    (0, _common.Delete)('statuses/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete account status'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "deleteStatus", null);
_ts_decorate([
    (0, _common.Get)('tiers'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all account tiers'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "getTiers", null);
_ts_decorate([
    (0, _common.Post)('tiers'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create account tier'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "createTier", null);
_ts_decorate([
    (0, _common.Put)('tiers/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update account tier'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "updateTier", null);
_ts_decorate([
    (0, _common.Delete)('tiers/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete account tier'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "deleteTier", null);
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiBody)({
        type: Object,
        description: 'Account data',
        examples: {
            example: {
                value: createAccountExample
            }
        }
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AccountsController.prototype, "delete", null);
AccountsController = _ts_decorate([
    (0, _swagger.ApiTags)('Accounts'),
    (0, _common.Controller)('accounts'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _accountsservice.AccountsService === "undefined" ? Object : _accountsservice.AccountsService
    ])
], AccountsController);

//# sourceMappingURL=accounts.controller.js.map