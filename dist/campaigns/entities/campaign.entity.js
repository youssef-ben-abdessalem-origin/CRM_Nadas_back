"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Campaign", {
    enumerable: true,
    get: function() {
        return Campaign;
    }
});
const _typeorm = require("typeorm");
const _userentity = require("../../users/entities/user.entity");
const _campaigntypeentity = require("./campaign-type.entity");
const _campaignstatusentity = require("./campaign-status.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Campaign = class Campaign {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Campaign.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Campaign.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_campaigntypeentity.CampaignType, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'campaignTypeId'
    }),
    _ts_metadata("design:type", typeof _campaigntypeentity.CampaignType === "undefined" ? Object : _campaigntypeentity.CampaignType)
], Campaign.prototype, "campaignType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Campaign.prototype, "campaignTypeId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_campaignstatusentity.CampaignStatus, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'statusId'
    }),
    _ts_metadata("design:type", typeof _campaignstatusentity.CampaignStatus === "undefined" ? Object : _campaignstatusentity.CampaignStatus)
], Campaign.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Campaign.prototype, "statusId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'date',
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Campaign.prototype, "startDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'date',
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Campaign.prototype, "endDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Campaign.prototype, "expectedRevenue", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Campaign.prototype, "budgetedCost", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Campaign.prototype, "actualCost", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Campaign.prototype, "expectedResponse", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Campaign.prototype, "numbersSent", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Campaign.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User, {
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'ownerId'
    }),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], Campaign.prototype, "owner", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Campaign.prototype, "ownerId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Campaign.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Campaign.prototype, "updatedAt", void 0);
Campaign = _ts_decorate([
    (0, _typeorm.Entity)('campaigns')
], Campaign);

//# sourceMappingURL=campaign.entity.js.map