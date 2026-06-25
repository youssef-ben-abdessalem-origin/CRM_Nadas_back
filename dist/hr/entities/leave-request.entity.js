"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LeaveRequest", {
    enumerable: true,
    get: function() {
        return LeaveRequest;
    }
});
const _typeorm = require("typeorm");
const _leavetypeentity = require("./leave-type.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LeaveRequest = class LeaveRequest {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], LeaveRequest.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", (employee)=>employee.leaveRequests, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], LeaveRequest.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], LeaveRequest.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_leavetypeentity.LeaveType, {
        onDelete: "RESTRICT"
    }),
    (0, _typeorm.JoinColumn)({
        name: "leaveTypeId"
    }),
    _ts_metadata("design:type", typeof _leavetypeentity.LeaveType === "undefined" ? Object : _leavetypeentity.LeaveType)
], LeaveRequest.prototype, "leaveType", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], LeaveRequest.prototype, "leaveTypeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeaveRequest.prototype, "startDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeaveRequest.prototype, "endDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float"
    }),
    _ts_metadata("design:type", Number)
], LeaveRequest.prototype, "days", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LeaveRequest.prototype, "reason", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Pending"
    }),
    _ts_metadata("design:type", String)
], LeaveRequest.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeaveRequest.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeaveRequest.prototype, "updatedAt", void 0);
LeaveRequest = _ts_decorate([
    (0, _typeorm.Entity)("leave_requests")
], LeaveRequest);

//# sourceMappingURL=leave-request.entity.js.map