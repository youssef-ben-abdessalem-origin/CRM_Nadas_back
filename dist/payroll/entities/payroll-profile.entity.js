"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PayrollProfile", {
    enumerable: true,
    get: function() {
        return PayrollProfile;
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
let PayrollProfile = class PayrollProfile {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], PayrollProfile.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)("Employee", {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], PayrollProfile.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", Number)
], PayrollProfile.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "CNSS"
    }),
    _ts_metadata("design:type", String)
], PayrollProfile.prototype, "socialRegime", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PayrollProfile.prototype, "cnssNumber", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PayrollProfile.prototype, "cnrpsNumber", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PayrollProfile.prototype, "taxStatus", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Bank Transfer"
    }),
    _ts_metadata("design:type", String)
], PayrollProfile.prototype, "paymentMethod", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PayrollProfile.prototype, "bankName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PayrollProfile.prototype, "bankAccount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PayrollProfile.prototype, "rib", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], PayrollProfile.prototype, "active", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayrollProfile.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayrollProfile.prototype, "updatedAt", void 0);
PayrollProfile = _ts_decorate([
    (0, _typeorm.Entity)("payroll_profiles")
], PayrollProfile);

//# sourceMappingURL=payroll-profile.entity.js.map