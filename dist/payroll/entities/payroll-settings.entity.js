"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PayrollSettings", {
    enumerable: true,
    get: function() {
        return PayrollSettings;
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
let PayrollSettings = class PayrollSettings {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 9.68
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "cnssEmployeeRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 17.07
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "cnssEmployerRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 1.00
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "tfpRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 0.50
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "foprolosRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 0.40
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "accidentInsuranceRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "retirementRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "TND"
    }),
    _ts_metadata("design:type", String)
], PayrollSettings.prototype, "currency", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 8,
        scale: 2,
        default: 2730
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "cnssMaxCap", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "integer",
        default: 26
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "workingDaysMonth", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 3,
        scale: 2,
        default: 1.25
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "overtimeMultiplier", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], PayrollSettings.prototype, "thirteenthMonthEnabled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "int",
        default: 12
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "thirteenthMonthMonth", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 100
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "thirteenthMonthRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], PayrollSettings.prototype, "seniorityBonusEnabled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 5
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "seniorityBonusRate5yr", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 10
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "seniorityBonusRate10yr", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 15
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "seniorityBonusRate15yr", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 20
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "seniorityBonusRate20yr", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], PayrollSettings.prototype, "absenceDeductionEnabled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "int",
        default: 26
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "workingDaysPerMonth", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 100
    }),
    _ts_metadata("design:type", Number)
], PayrollSettings.prototype, "dailySalaryDeductionRate", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayrollSettings.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayrollSettings.prototype, "updatedAt", void 0);
PayrollSettings = _ts_decorate([
    (0, _typeorm.Entity)("payroll_settings")
], PayrollSettings);

//# sourceMappingURL=payroll-settings.entity.js.map