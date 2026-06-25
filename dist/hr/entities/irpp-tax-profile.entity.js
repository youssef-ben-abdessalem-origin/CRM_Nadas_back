"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IrppTaxProfile", {
    enumerable: true,
    get: function() {
        return IrppTaxProfile;
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
let IrppTaxProfile = class IrppTaxProfile {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], IrppTaxProfile.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)("Employee", {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], IrppTaxProfile.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", Number)
], IrppTaxProfile.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Single"
    }),
    _ts_metadata("design:type", String)
], IrppTaxProfile.prototype, "maritalStatus", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], IrppTaxProfile.prototype, "childrenCount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], IrppTaxProfile.prototype, "disabledDependents", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], IrppTaxProfile.prototype, "taxExemptions", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IrppTaxProfile.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IrppTaxProfile.prototype, "updatedAt", void 0);
IrppTaxProfile = _ts_decorate([
    (0, _typeorm.Entity)("irpp_tax_profiles")
], IrppTaxProfile);

//# sourceMappingURL=irpp-tax-profile.entity.js.map