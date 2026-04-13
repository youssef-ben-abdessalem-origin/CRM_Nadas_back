"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompanySettings", {
    enumerable: true,
    get: function() {
        return CompanySettings;
    }
});
const _typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CompanySettings = class CompanySettings {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], CompanySettings.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'Nadas Group'
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "legalName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "taxId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "commercialRegistration", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "industry", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "logoUrl", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: '#3b82f6'
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "primaryColor", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "officeAddress", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "phone", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "email", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "website", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'TND'
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "defaultCurrency", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 5,
        scale: 2,
        default: 19.00
    }),
    _ts_metadata("design:type", Number)
], CompanySettings.prototype, "defaultTaxRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'QT-{{YYYY}}-{{0000}}'
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "quoteNumberPrefix", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "termsAndConditions", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "bankName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CompanySettings.prototype, "bankIban", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CompanySettings.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CompanySettings.prototype, "updatedAt", void 0);
CompanySettings = _ts_decorate([
    (0, _typeorm.Entity)('company_settings')
], CompanySettings);

//# sourceMappingURL=company-settings.entity.js.map