"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "KpiAssignment", {
    enumerable: true,
    get: function() {
        return KpiAssignment;
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
let KpiAssignment = class KpiAssignment {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], KpiAssignment.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", (emp)=>emp.kpiAssignments, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], KpiAssignment.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], KpiAssignment.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Kpi", {
        onDelete: "RESTRICT"
    }),
    (0, _typeorm.JoinColumn)({
        name: "kpiId"
    }),
    _ts_metadata("design:type", typeof Kpi === "undefined" ? Object : Kpi)
], KpiAssignment.prototype, "kpi", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], KpiAssignment.prototype, "kpiId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], KpiAssignment.prototype, "targetValue", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], KpiAssignment.prototype, "actualValue", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], KpiAssignment.prototype, "period", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], KpiAssignment.prototype, "notes", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], KpiAssignment.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], KpiAssignment.prototype, "updatedAt", void 0);
KpiAssignment = _ts_decorate([
    (0, _typeorm.Entity)("kpi_assignments"),
    (0, _typeorm.Index)([
        "employeeId",
        "kpiId",
        "period"
    ])
], KpiAssignment);

//# sourceMappingURL=kpi-assignment.entity.js.map