"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LeaveType", {
    enumerable: true,
    get: function() {
        return LeaveType;
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
let LeaveType = class LeaveType {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], LeaveType.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], LeaveType.prototype, "code", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], LeaveType.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LeaveType.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LeaveType.prototype, "nameAr", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LeaveType.prototype, "nameFr", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], LeaveType.prototype, "paid", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "integer",
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], LeaveType.prototype, "annualLimit", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], LeaveType.prototype, "requiresApproval", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], LeaveType.prototype, "requiresSupportingDocuments", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "integer",
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], LeaveType.prototype, "maxConsecutiveDays", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], LeaveType.prototype, "carryForwardAllowed", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LeaveType.prototype, "genderRestriction", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Standard"
    }),
    _ts_metadata("design:type", String)
], LeaveType.prototype, "accrualPolicy", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeaveType.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeaveType.prototype, "updatedAt", void 0);
LeaveType = _ts_decorate([
    (0, _typeorm.Entity)("leave_types")
], LeaveType);

//# sourceMappingURL=leave-type.entity.js.map