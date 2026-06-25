"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Goal", {
    enumerable: true,
    get: function() {
        return Goal;
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
let Goal = class Goal {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Goal.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", (emp)=>emp.goals, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], Goal.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], Goal.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Goal.prototype, "title", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Goal.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Goal.prototype, "category", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date",
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Goal.prototype, "targetDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Goal.prototype, "progress", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Not Started"
    }),
    _ts_metadata("design:type", String)
], Goal.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Goal.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Goal.prototype, "updatedAt", void 0);
Goal = _ts_decorate([
    (0, _typeorm.Entity)("goals")
], Goal);

//# sourceMappingURL=goal.entity.js.map