"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IrppDeclaration", {
    enumerable: true,
    get: function() {
        return IrppDeclaration;
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
let IrppDeclaration = class IrppDeclaration {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], IrppDeclaration.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], IrppDeclaration.prototype, "taxYear", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", {
        onDelete: "RESTRICT"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], IrppDeclaration.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], IrppDeclaration.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 12,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], IrppDeclaration.prototype, "annualTaxableIncome", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 12,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], IrppDeclaration.prototype, "annualTaxDeducted", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 12,
        scale: 3,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], IrppDeclaration.prototype, "annualCnssDeducted", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Draft"
    }),
    _ts_metadata("design:type", String)
], IrppDeclaration.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IrppDeclaration.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IrppDeclaration.prototype, "updatedAt", void 0);
IrppDeclaration = _ts_decorate([
    (0, _typeorm.Entity)("irpp_declarations"),
    (0, _typeorm.Index)([
        "taxYear",
        "employeeId"
    ], {
        unique: true
    })
], IrppDeclaration);

//# sourceMappingURL=irpp-declaration.entity.js.map