"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PayslipDetail", {
    enumerable: true,
    get: function() {
        return PayslipDetail;
    }
});
const _typeorm = require("typeorm");
const _salarycomponententity = require("./salary-component.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PayslipDetail = class PayslipDetail {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], PayslipDetail.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Payslip", (payslip)=>payslip.details, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "payslipId"
    }),
    _ts_metadata("design:type", typeof Payslip === "undefined" ? Object : Payslip)
], PayslipDetail.prototype, "payslip", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], PayslipDetail.prototype, "payslipId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_salarycomponententity.SalaryComponent, {
        onDelete: "RESTRICT"
    }),
    (0, _typeorm.JoinColumn)({
        name: "componentId"
    }),
    _ts_metadata("design:type", typeof _salarycomponententity.SalaryComponent === "undefined" ? Object : _salarycomponententity.SalaryComponent)
], PayslipDetail.prototype, "component", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], PayslipDetail.prototype, "componentId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3
    }),
    _ts_metadata("design:type", Number)
], PayslipDetail.prototype, "amount", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayslipDetail.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayslipDetail.prototype, "updatedAt", void 0);
PayslipDetail = _ts_decorate([
    (0, _typeorm.Entity)("payslip_details")
], PayslipDetail);

//# sourceMappingURL=payslip-detail.entity.js.map