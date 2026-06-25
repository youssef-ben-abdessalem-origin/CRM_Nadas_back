"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PayrollPeriod", {
    enumerable: true,
    get: function() {
        return PayrollPeriod;
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
let PayrollPeriod = class PayrollPeriod {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], PayrollPeriod.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], PayrollPeriod.prototype, "periodName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayrollPeriod.prototype, "startDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayrollPeriod.prototype, "endDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Draft"
    }),
    _ts_metadata("design:type", String)
], PayrollPeriod.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayrollPeriod.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PayrollPeriod.prototype, "updatedAt", void 0);
PayrollPeriod = _ts_decorate([
    (0, _typeorm.Entity)("payroll_periods")
], PayrollPeriod);

//# sourceMappingURL=payroll-period.entity.js.map