"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Attendance", {
    enumerable: true,
    get: function() {
        return Attendance;
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
let Attendance = class Attendance {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Attendance.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", (employee)=>employee.attendances, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], Attendance.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], Attendance.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Attendance.prototype, "workDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Attendance.prototype, "checkIn", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Attendance.prototype, "checkOut", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Attendance.prototype, "workedHours", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Attendance.prototype, "overtimeHours", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Attendance.prototype, "lateMinutes", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Attendance.prototype, "earlyDepartureMinutes", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Attendance.prototype, "shiftName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Manual Entry"
    }),
    _ts_metadata("design:type", String)
], Attendance.prototype, "source", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Attendance.prototype, "notes", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Present"
    }),
    _ts_metadata("design:type", String)
], Attendance.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Attendance.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Attendance.prototype, "updatedAt", void 0);
Attendance = _ts_decorate([
    (0, _typeorm.Entity)("attendance"),
    (0, _typeorm.Index)([
        "employeeId",
        "workDate"
    ], {
        unique: true
    })
], Attendance);

//# sourceMappingURL=attendance.entity.js.map