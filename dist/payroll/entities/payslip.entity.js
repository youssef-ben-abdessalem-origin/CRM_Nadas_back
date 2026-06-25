"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Payslip", {
    enumerable: true,
    get: function() {
        return Payslip;
    }
});
const _typeorm = require("typeorm");
const _payrollperiodentity = require("./payroll-period.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Payslip = class Payslip {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Payslip.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], Payslip.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], Payslip.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_payrollperiodentity.PayrollPeriod, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "payrollPeriodId"
    }),
    _ts_metadata("design:type", typeof _payrollperiodentity.PayrollPeriod === "undefined" ? Object : _payrollperiodentity.PayrollPeriod)
], Payslip.prototype, "payrollPeriod", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], Payslip.prototype, "payrollPeriodId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3
    }),
    _ts_metadata("design:type", Number)
], Payslip.prototype, "grossSalary", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3
    }),
    _ts_metadata("design:type", Number)
], Payslip.prototype, "totalEarnings", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3
    }),
    _ts_metadata("design:type", Number)
], Payslip.prototype, "totalDeductions", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Payslip.prototype, "totalEmployerContributions", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3
    }),
    _ts_metadata("design:type", Number)
], Payslip.prototype, "netSalary", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date",
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Payslip.prototype, "paymentDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Draft"
    }),
    _ts_metadata("design:type", String)
], Payslip.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("PayslipDetail", (detail)=>detail.payslip, {
        cascade: true
    }),
    _ts_metadata("design:type", Array)
], Payslip.prototype, "details", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Payslip.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Payslip.prototype, "updatedAt", void 0);
Payslip = _ts_decorate([
    (0, _typeorm.Entity)("payslips")
], Payslip);

//# sourceMappingURL=payslip.entity.js.map