"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LeaveBalance", {
    enumerable: true,
    get: function() {
        return LeaveBalance;
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
let LeaveBalance = class LeaveBalance {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], LeaveBalance.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", (employee)=>employee.leaveBalances, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], LeaveBalance.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], LeaveBalance.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], LeaveBalance.prototype, "year", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_leavetypeentity.LeaveType, {
        onDelete: "RESTRICT"
    }),
    (0, _typeorm.JoinColumn)({
        name: "leaveTypeId"
    }),
    _ts_metadata("design:type", typeof _leavetypeentity.LeaveType === "undefined" ? Object : _leavetypeentity.LeaveType)
], LeaveBalance.prototype, "leaveType", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], LeaveBalance.prototype, "leaveTypeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 0
    }),
    _ts_metadata("design:type", Number)
], LeaveBalance.prototype, "totalDays", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 0
    }),
    _ts_metadata("design:type", Number)
], LeaveBalance.prototype, "usedDays", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 0
    }),
    _ts_metadata("design:type", Number)
], LeaveBalance.prototype, "remainingDays", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 0
    }),
    _ts_metadata("design:type", Number)
], LeaveBalance.prototype, "carriedForwardDays", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeaveBalance.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeaveBalance.prototype, "updatedAt", void 0);
LeaveBalance = _ts_decorate([
    (0, _typeorm.Entity)("leave_balances"),
    (0, _typeorm.Index)([
        "employeeId",
        "year",
        "leaveTypeId"
    ], {
        unique: true
    })
], LeaveBalance);

//# sourceMappingURL=leave-balance.entity.js.map