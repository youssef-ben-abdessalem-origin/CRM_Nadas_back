"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PerformanceReview", {
    enumerable: true,
    get: function() {
        return PerformanceReview;
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
let PerformanceReview = class PerformanceReview {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], PerformanceReview.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", (emp)=>emp.performanceReviews, {
        onDelete: "CASCADE"
    }),
    (0, _typeorm.JoinColumn)({
        name: "employeeId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], PerformanceReview.prototype, "employee", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], PerformanceReview.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)("Employee", {
        nullable: true,
        onDelete: "SET NULL"
    }),
    (0, _typeorm.JoinColumn)({
        name: "reviewerId"
    }),
    _ts_metadata("design:type", typeof Employee === "undefined" ? Object : Employee)
], PerformanceReview.prototype, "reviewer", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], PerformanceReview.prototype, "reviewerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "date"
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PerformanceReview.prototype, "reviewDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], PerformanceReview.prototype, "overallRating", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PerformanceReview.prototype, "strengths", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PerformanceReview.prototype, "weaknesses", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PerformanceReview.prototype, "summary", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: "Draft"
    }),
    _ts_metadata("design:type", String)
], PerformanceReview.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PerformanceReview.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PerformanceReview.prototype, "updatedAt", void 0);
PerformanceReview = _ts_decorate([
    (0, _typeorm.Entity)("performance_reviews")
], PerformanceReview);

//# sourceMappingURL=performance-review.entity.js.map