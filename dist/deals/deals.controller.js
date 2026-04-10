"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DealsController", {
    enumerable: true,
    get: function() {
        return DealsController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _dealsservice = require("./deals.service");
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
const createDealExample = {
    name: "Enterprise License Deal",
    accountId: 1,
    contactId: 1,
    dealStageId: 1,
    value: 50000,
    probability: 75,
    expectedCloseDate: "2026-06-30",
    owner: "Sales Team",
    notes: "High priority deal"
};
let DealsController = class DealsController {
    // Deal Stages - must come before :id routes
    getStages() {
        return this.dealsService.getStages();
    }
    createStage(data) {
        return this.dealsService.createStage(data.name, data.color);
    }
    updateStage(id, data) {
        return this.dealsService.updateStage(+id, data);
    }
    deleteStage(id) {
        return this.dealsService.deleteStage(+id);
    }
    // Deal Reasons - must come before :id routes
    getReasons(type) {
        return this.dealsService.getReasons(type);
    }
    createReason(data) {
        return this.dealsService.createReason(data.name, data.color, data.type);
    }
    updateReason(id, data) {
        return this.dealsService.updateReason(+id, data);
    }
    deleteReason(id) {
        return this.dealsService.deleteReason(+id);
    }
    // Deal CRUD - comes after specific routes
    findAll() {
        return this.dealsService.findAll();
    }
    findByContact(contactId) {
        return this.dealsService.findByContact(+contactId);
    }
    findByAccount(accountId) {
        return this.dealsService.findByAccount(+accountId);
    }
    findByLead(leadId) {
        return this.dealsService.findByLead(+leadId);
    }
    findOne(id) {
        return this.dealsService.findOne(+id);
    }
    create(data, req) {
        return this.dealsService.create(data, req.user?.id);
    }
    update(id, data, req) {
        return this.dealsService.update(+id, data, req.user?.id);
    }
    delete(id) {
        return this.dealsService.delete(+id);
    }
    constructor(dealsService){
        this.dealsService = dealsService;
    }
};
_ts_decorate([
    (0, _common.Get)('stages'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all deal stages'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "getStages", null);
_ts_decorate([
    (0, _common.Post)('stages'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create deal stage'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "createStage", null);
_ts_decorate([
    (0, _common.Put)('stages/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update deal stage'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "updateStage", null);
_ts_decorate([
    (0, _common.Delete)('stages/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete deal stage'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "deleteStage", null);
_ts_decorate([
    (0, _common.Get)('reasons'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all deal reasons'
    }),
    _ts_param(0, (0, _common.Query)('type')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "getReasons", null);
_ts_decorate([
    (0, _common.Post)('reasons'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create deal reason'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "createReason", null);
_ts_decorate([
    (0, _common.Put)('reasons/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update deal reason'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "updateReason", null);
_ts_decorate([
    (0, _common.Delete)('reasons/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete deal reason'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "deleteReason", null);
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('contact/:contactId'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get deals by contact ID'
    }),
    _ts_param(0, (0, _common.Param)('contactId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "findByContact", null);
_ts_decorate([
    (0, _common.Get)('account/:accountId'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get deals by account ID'
    }),
    _ts_param(0, (0, _common.Param)('accountId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "findByAccount", null);
_ts_decorate([
    (0, _common.Get)('lead/:leadId'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get deals by lead ID'
    }),
    _ts_param(0, (0, _common.Param)('leadId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "findByLead", null);
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
], DealsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiBody)({
        type: Object,
        description: 'Deal data',
        examples: {
            example: {
                value: createDealExample
            }
        }
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial,
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial,
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DealsController.prototype, "update", null);
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
], DealsController.prototype, "delete", null);
DealsController = _ts_decorate([
    (0, _swagger.ApiTags)('Deals'),
    (0, _common.Controller)('deals'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dealsservice.DealsService === "undefined" ? Object : _dealsservice.DealsService
    ])
], DealsController);

//# sourceMappingURL=deals.controller.js.map