"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Contact", {
    enumerable: true,
    get: function() {
        return Contact;
    }
});
const _typeorm = require("typeorm");
const _accountentity = require("../../accounts/entities/account.entity");
const _contactstatusentity = require("./contact-status.entity");
const _contacttierentity = require("./contact-tier.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Contact = class Contact {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Contact.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Contact.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Contact.prototype, "email", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "phone", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "company", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "title", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_contactstatusentity.ContactStatus, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'contactStatusId'
    }),
    _ts_metadata("design:type", typeof _contactstatusentity.ContactStatus === "undefined" ? Object : _contactstatusentity.ContactStatus)
], Contact.prototype, "contactStatus", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Contact.prototype, "contactStatusId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_contacttierentity.ContactTier, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'contactTierId'
    }),
    _ts_metadata("design:type", typeof _contacttierentity.ContactTier === "undefined" ? Object : _contacttierentity.ContactTier)
], Contact.prototype, "contactTier", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Contact.prototype, "contactTierId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Contact.prototype, "dealValue", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "lastContact", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "created", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "location", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "industry", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "website", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "notes", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Contact.prototype, "dealsWon", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Contact.prototype, "dealsTotal", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Contact.prototype, "revenueTotal", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Contact.prototype, "avatar", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_accountentity.Account, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'accountId'
    }),
    _ts_metadata("design:type", typeof _accountentity.Account === "undefined" ? Object : _accountentity.Account)
], Contact.prototype, "account", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Contact.prototype, "accountId", void 0);
Contact = _ts_decorate([
    (0, _typeorm.Entity)('contacts')
], Contact);

//# sourceMappingURL=contact.entity.js.map