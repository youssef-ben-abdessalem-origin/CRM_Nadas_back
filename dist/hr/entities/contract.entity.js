"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Contract", {
    enumerable: true,
    get: function() {
        return Contract;
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
let Contract = class Contract {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Contract.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", (employee)=>employee.contracts, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], Contract.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], Contract.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], Contract.prototype, "contractNumber", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Contract.prototype, "contractType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Contract.prototype, "startDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date",
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Contract.prototype, "endDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date",
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Contract.prototype, "probationEndDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3
    }),
    _ts_metadata("design:type", Number)
], Contract.prototype, "baseSalary", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 40
    }),
    _ts_metadata("design:type", Number)
], Contract.prototype, "workingHoursPerWeek", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Active"
    }),
    _ts_metadata("design:type", String)
], Contract.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Contract.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Contract.prototype, "updatedAt", void 0);
Contract = _ts_decorate([
    (0, _typeorm.Entity)("contracts")
], Contract);

//# sourceMappingURL=contract.entity.js.map