"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CostCenter", {
    enumerable: true,
    get: function() {
        return CostCenter;
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
let CostCenter = class CostCenter {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], CostCenter.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], CostCenter.prototype, "code", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], CostCenter.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CostCenter.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Department", {
        nullable: true,
        onDelete: "SET NULL"
    }),
    (0, _typeorm.JoinColumn)({
        name: "departmentId"
    }),
    _ts_metadata("design:type", typeof Department === "undefined" ? Object : Department)
], CostCenter.prototype, "department", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], CostCenter.prototype, "departmentId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", {
        nullable: true,
        onDelete: "SET NULL"
    }),
    (0, _typeorm.JoinColumn)({
        name: "managerId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], CostCenter.prototype, "manager", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], CostCenter.prototype, "managerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Active"
    }),
    _ts_metadata("design:type", String)
], CostCenter.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CostCenter.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CostCenter.prototype, "updatedAt", void 0);
CostCenter = _ts_decorate([
    (0, _typeorm.Entity)("cost_centers")
], CostCenter);

//# sourceMappingURL=cost-center.entity.js.map