"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CampaignsController", {
    enumerable: true,
    get: function() {
        return CampaignsController;
    }
});
const _common = require("@nestjs/common");
const _campaignsservice = require("./campaigns.service");
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
let CampaignsController = class CampaignsController {
    async findAll() {
        return this.campaignsService.findAll();
    }
    async getTypes() {
        return this.campaignsService.getTypes();
    }
    async getStatuses() {
        return this.campaignsService.getStatuses();
    }
    async findOne(id) {
        return this.campaignsService.findOne(id);
    }
    async create(data) {
        return this.campaignsService.create(data);
    }
    async update(id, data) {
        return this.campaignsService.update(id, data);
    }
    async delete(id) {
        return this.campaignsService.delete(id);
    }
    constructor(campaignsService){
        this.campaignsService = campaignsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('types'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "getTypes", null);
_ts_decorate([
    (0, _common.Get)('statuses'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "getStatuses", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "delete", null);
CampaignsController = _ts_decorate([
    (0, _common.Controller)('campaigns'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _campaignsservice.CampaignsService === "undefined" ? Object : _campaignsservice.CampaignsService
    ])
], CampaignsController);

//# sourceMappingURL=campaigns.controller.js.map