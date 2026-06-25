"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Employee", {
    enumerable: true,
    get: function() {
        return Employee;
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
let Employee = class Employee {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Employee.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "employeeNumber", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "cin", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Employee.prototype, "dateOfBirth", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "placeOfBirth", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Employee.prototype, "gender", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Employee.prototype, "nationality", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Employee.prototype, "maritalStatus", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Employee.prototype, "childrenCount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "email", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "workEmail", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Employee.prototype, "phone", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "cnssNumber", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "passportNumber", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "emergencyContactName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "emergencyContactPhone", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "education", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "simple-json",
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Employee.prototype, "skills", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "simple-json",
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Employee.prototype, "certifications", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "address", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "city", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "postalCode", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Employee.prototype, "hireDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "workLocation", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "costCenter", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "employmentCategory", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "attendanceMode", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Department", {
        nullable: true,
        onDelete: "SET NULL"
    }),
    (0, _typeorm.JoinColumn)({
        name: "departmentId"
    }),
    _ts_metadata("design:type", typeof Department === "undefined" ? Object : Department)
], Employee.prototype, "department", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Employee.prototype, "departmentId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Position", {
        nullable: true,
        onDelete: "SET NULL"
    }),
    (0, _typeorm.JoinColumn)({
        name: "positionId"
    }),
    _ts_metadata("design:type", typeof Position === "undefined" ? Object : Position)
], Employee.prototype, "position", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Employee.prototype, "positionId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", {
        nullable: true,
        onDelete: "SET NULL"
    }),
    (0, _typeorm.JoinColumn)({
        name: "managerId"
    }),
    _ts_metadata("design:type", Object)
], Employee.prototype, "manager", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Employee.prototype, "managerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Active"
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Draft"
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "readinessStatus", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "photo", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "residenceCardNumber", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date",
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Employee.prototype, "residenceCardExpiry", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "workPermitType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "workPermitNumber", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Employee.prototype, "workPermitStatus", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date",
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Employee.prototype, "workPermitExpiry", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("Contract", (contract)=>contract.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "contracts", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("Attendance", (attendance)=>attendance.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "attendances", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("LeaveRequest", (leaveRequest)=>leaveRequest.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "leaveRequests", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("EmployeeDocument", (doc)=>doc.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "documents", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("ShiftAssignment", (sa)=>sa.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "shiftAssignments", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("OvertimeRequest", (ot)=>ot.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "overtimeRequests", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("LeaveBalance", (lb)=>lb.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "leaveBalances", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("KpiAssignment", (ka)=>ka.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "kpiAssignments", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("Goal", (g)=>g.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "goals", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("PerformanceReview", (pr)=>pr.employee),
    _ts_metadata("design:type", Array)
], Employee.prototype, "performanceReviews", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)("OvertimeRequest", (ot)=>ot.assignedBy),
    _ts_metadata("design:type", Array)
], Employee.prototype, "assignedOvertimes", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Employee.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Employee.prototype, "updatedAt", void 0);
Employee = _ts_decorate([
    (0, _typeorm.Entity)("employees")
], Employee);

//# sourceMappingURL=employee.entity.js.map