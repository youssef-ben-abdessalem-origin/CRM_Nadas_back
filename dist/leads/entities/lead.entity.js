"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Lead", {
    enumerable: true,
    get: function() {
        return Lead;
    }
});
const _typeorm = require("typeorm");
const _userentity = require("../../users/entities/user.entity");
const _leadsourceentity = require("./lead-source.entity");
const _pipelinestageentity = require("./pipeline-stage.entity");
const _leadscorecategoryentity = require("./lead-score-category.entity");
const _leadpriorityentity = require("./lead-priority.entity");
const _qualificationstageentity = require("./qualification-stage.entity");
const _accountentity = require("../../accounts/entities/account.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Lead = class Lead {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Lead.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Lead.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Lead.prototype, "emails", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Lead.prototype, "phones", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "company", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "title", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_leadsourceentity.LeadSource, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'sourceId'
    }),
    _ts_metadata("design:type", typeof _leadsourceentity.LeadSource === "undefined" ? Object : _leadsourceentity.LeadSource)
], Lead.prototype, "source", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "sourceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_leadscorecategoryentity.LeadScoreCategory, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'scoreCategoryId'
    }),
    _ts_metadata("design:type", typeof _leadscorecategoryentity.LeadScoreCategory === "undefined" ? Object : _leadscorecategoryentity.LeadScoreCategory)
], Lead.prototype, "scoreCategory", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "scoreCategoryId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_pipelinestageentity.PipelineStage, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'stageId'
    }),
    _ts_metadata("design:type", typeof _pipelinestageentity.PipelineStage === "undefined" ? Object : _pipelinestageentity.PipelineStage)
], Lead.prototype, "stage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "stageId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_leadpriorityentity.LeadPriority, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'priorityId'
    }),
    _ts_metadata("design:type", typeof _leadpriorityentity.LeadPriority === "undefined" ? Object : _leadpriorityentity.LeadPriority)
], Lead.prototype, "priority", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "priorityId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_qualificationstageentity.QualificationStage, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'qualificationStageId'
    }),
    _ts_metadata("design:type", typeof _qualificationstageentity.QualificationStage === "undefined" ? Object : _qualificationstageentity.QualificationStage)
], Lead.prototype, "qualificationStage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "qualificationStageId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'active'
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'ownerId'
    }),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], Lead.prototype, "owner", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "ownerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "value", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "location", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "industry", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "website", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "notes", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Lead.prototype, "tags", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'date',
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Lead.prototype, "nextFollowUp", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "lastActivity", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], Lead.prototype, "isConverted", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Lead.prototype, "convertedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "convertedAccountId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "convertedContactId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_accountentity.Account, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'accountId'
    }),
    _ts_metadata("design:type", typeof _accountentity.Account === "undefined" ? Object : _accountentity.Account)
], Lead.prototype, "account", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Lead.prototype, "accountId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Lead.prototype, "attachments", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Lead.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Lead.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "email", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Lead.prototype, "phone", void 0);
Lead = _ts_decorate([
    (0, _typeorm.Entity)('leads')
], Lead);

//# sourceMappingURL=lead.entity.js.map