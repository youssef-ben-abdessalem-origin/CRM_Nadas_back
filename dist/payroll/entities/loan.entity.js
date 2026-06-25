"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Loan", {
    enumerable: true,
    get: function() {
        return Loan;
    }
});
const _typeorm = require("typeorm");
const _employeeentity = require("../../hr/entities/employee.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Loan = class Loan {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Loan.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_employeeentity.Employee, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", Object)
], Loan.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], Loan.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3
    }),
    _ts_metadata("design:type", Number)
], Loan.prototype, "loanAmount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3
    }),
    _ts_metadata("design:type", Number)
], Loan.prototype, "installmentAmount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Loan.prototype, "startDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date",
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Loan.prototype, "endDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3
    }),
    _ts_metadata("design:type", Number)
], Loan.prototype, "balance", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Active"
    }),
    _ts_metadata("design:type", String)
], Loan.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Loan.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Loan.prototype, "updatedAt", void 0);
Loan = _ts_decorate([
    (0, _typeorm.Entity)("loans")
], Loan);

//# sourceMappingURL=loan.entity.js.map