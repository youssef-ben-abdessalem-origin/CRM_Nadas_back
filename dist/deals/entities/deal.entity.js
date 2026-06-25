"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Deal", {
    enumerable: true,
    get: function() {
        return Deal;
    }
});
const _typeorm = require("typeorm");
const _userentity = require("../../users/entities/user.entity");
const _leadentity = require("../../leads/entities/lead.entity");
const _accountentity = require("../../accounts/entities/account.entity");
const _contactentity = require("../../contacts/entities/contact.entity");
const _dealstageentity = require("./deal-stage.entity");
const _dealreasonentity = require("./deal-reason.entity");
const _campaignentity = require("../../campaigns/entities/campaign.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Deal = class Deal {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Deal.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Deal.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Deal.prototype, "company", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "value", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Deal.prototype, "contact", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "probability", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "daysInStage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'date',
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Deal.prototype, "expectedCloseDate", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_dealstageentity.DealStage, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'dealStageId'
    }),
    _ts_metadata("design:type", typeof _dealstageentity.DealStage === "undefined" ? Object : _dealstageentity.DealStage)
], Deal.prototype, "stage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "dealStageId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_dealreasonentity.DealReason, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'dealReasonId'
    }),
    _ts_metadata("design:type", typeof _dealreasonentity.DealReason === "undefined" ? Object : _dealreasonentity.DealReason)
], Deal.prototype, "reason", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "dealReasonId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_leadentity.Lead, {
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'leadId'
    }),
    _ts_metadata("design:type", typeof _leadentity.Lead === "undefined" ? Object : _leadentity.Lead)
], Deal.prototype, "lead", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "leadId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_accountentity.Account, {
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'accountId'
    }),
    _ts_metadata("design:type", typeof _accountentity.Account === "undefined" ? Object : _accountentity.Account)
], Deal.prototype, "account", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "accountId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_contactentity.Contact, {
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'contactId'
    }),
    _ts_metadata("design:type", typeof _contactentity.Contact === "undefined" ? Object : _contactentity.Contact)
], Deal.prototype, "contactEntity", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "contactId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User, {
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'ownerId'
    }),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], Deal.prototype, "owner", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "ownerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Deal.prototype, "notes", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Deal.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_campaignentity.Campaign, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'campaignId'
    }),
    _ts_metadata("design:type", typeof _campaignentity.Campaign === "undefined" ? Object : _campaignentity.Campaign)
], Deal.prototype, "campaign", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Deal.prototype, "campaignId", void 0);
Deal = _ts_decorate([
    (0, _typeorm.Entity)('deals')
], Deal);

//# sourceMappingURL=deal.entity.js.map