"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OvertimeRequest", {
    enumerable: true,
    get: function() {
        return OvertimeRequest;
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
let OvertimeRequest = class OvertimeRequest {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], OvertimeRequest.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", (employee)=>employee.overtimeRequests, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], OvertimeRequest.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], OvertimeRequest.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar",
        default: "weekday"
    }),
    _ts_metadata("design:type", String)
], OvertimeRequest.prototype, "category", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar",
        default: "manager"
    }),
    _ts_metadata("design:type", String)
], OvertimeRequest.prototype, "approvalAuthority", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "int",
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], OvertimeRequest.prototype, "assignedManagerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], OvertimeRequest.prototype, "date", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar"
    }),
    _ts_metadata("design:type", String)
], OvertimeRequest.prototype, "startTime", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar"
    }),
    _ts_metadata("design:type", String)
], OvertimeRequest.prototype, "endTime", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float"
    }),
    _ts_metadata("design:type", Number)
], OvertimeRequest.prototype, "totalHours", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 1.25
    }),
    _ts_metadata("design:type", Number)
], OvertimeRequest.prototype, "multiplier", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], OvertimeRequest.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Pending"
    }),
    _ts_metadata("design:type", String)
], OvertimeRequest.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", {
        nullable: true,
        onDelete: "SET NULL"
    }),
    (0, _typeorm.JoinColumn)({
        name: "approvedById"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], OvertimeRequest.prototype, "approvedBy", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], OvertimeRequest.prototype, "approvedById", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", {
        nullable: true,
        onDelete: "SET NULL"
    }),
    (0, _typeorm.JoinColumn)({
        name: "assignedById"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], OvertimeRequest.prototype, "assignedBy", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], OvertimeRequest.prototype, "assignedById", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], OvertimeRequest.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], OvertimeRequest.prototype, "updatedAt", void 0);
OvertimeRequest = _ts_decorate([
    (0, _typeorm.Entity)("overtime_requests")
], OvertimeRequest);

//# sourceMappingURL=overtime-request.entity.js.map