"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Account", {
    enumerable: true,
    get: function() {
        return Account;
    }
});
const _typeorm = require("typeorm");
const _accounttypeentity = require("./account-type.entity");
const _accountstatusentity = require("./account-status.entity");
const _accounttierentity = require("./account-tier.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Account = class Account {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Account.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Account.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "website", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "industry", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_accounttypeentity.AccountType, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'accountTypeId'
    }),
    _ts_metadata("design:type", typeof _accounttypeentity.AccountType === "undefined" ? Object : _accounttypeentity.AccountType)
], Account.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Account.prototype, "accountTypeId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_accountstatusentity.AccountStatus, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'accountStatusId'
    }),
    _ts_metadata("design:type", typeof _accountstatusentity.AccountStatus === "undefined" ? Object : _accountstatusentity.AccountStatus)
], Account.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Account.prototype, "accountStatusId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_accounttierentity.AccountTier, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'accountTierId'
    }),
    _ts_metadata("design:type", typeof _accounttierentity.AccountTier === "undefined" ? Object : _accounttierentity.AccountTier)
], Account.prototype, "tier", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Account.prototype, "accountTierId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Account.prototype, "annualRevenue", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Account.prototype, "employeeCount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "phone", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "email", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "location", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "address", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "city", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "state", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "country", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "zipCode", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "notes", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "created", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "lastActivity", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "avatar", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Account.prototype, "owner", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Account.prototype, "dealsCount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Account.prototype, "contactsCount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Account.prototype, "dealValue", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Account.prototype, "revenueTotal", void 0);
Account = _ts_decorate([
    (0, _typeorm.Entity)('accounts')
], Account);

//# sourceMappingURL=account.entity.js.map