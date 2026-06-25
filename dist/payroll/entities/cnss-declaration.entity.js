"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CnssDeclaration", {
    enumerable: true,
    get: function() {
        return CnssDeclaration;
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
let CnssDeclaration = class CnssDeclaration {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], CnssDeclaration.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("PayrollPeriod", {
        onDelete: "RESTRICT"
    }),
    (0, _typeorm.JoinColumn)({
        name: "payrollPeriodId"
    }),
    _ts_metadata("design:type", typeof PayrollPeriod === "undefined" ? Object : PayrollPeriod)
], CnssDeclaration.prototype, "payrollPeriod", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], CnssDeclaration.prototype, "payrollPeriodId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CnssDeclaration.prototype, "declarationDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "integer",
        default: 0
    }),
    _ts_metadata("design:type", Number)
], CnssDeclaration.prototype, "employeeCount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 12,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], CnssDeclaration.prototype, "totalGrossSalary", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 12,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], CnssDeclaration.prototype, "totalCnssEmployee", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 12,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], CnssDeclaration.prototype, "totalCnssEmployer", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 12,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], CnssDeclaration.prototype, "totalTfp", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 12,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], CnssDeclaration.prototype, "totalFoprolos", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 12,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], CnssDeclaration.prototype, "totalAccidentInsurance", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Draft"
    }),
    _ts_metadata("design:type", String)
], CnssDeclaration.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CnssDeclaration.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CnssDeclaration.prototype, "updatedAt", void 0);
CnssDeclaration = _ts_decorate([
    (0, _typeorm.Entity)("cnss_declarations")
], CnssDeclaration);

//# sourceMappingURL=cnss-declaration.entity.js.map