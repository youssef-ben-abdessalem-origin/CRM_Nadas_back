"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreatePerformanceReviewDto", {
    enumerable: true,
    get: function() {
        return CreatePerformanceReviewDto;
    }
});
const _swagger = require("@nestjs/swagger");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreatePerformanceReviewDto = class CreatePerformanceReviewDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Employee ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreatePerformanceReviewDto.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Reviewer employee ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreatePerformanceReviewDto.prototype, "reviewerId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Review date',
        example: '2025-07-01'
    }),
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreatePerformanceReviewDto.prototype, "reviewDate", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Overall rating (0-10)',
        example: 7.5
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreatePerformanceReviewDto.prototype, "overallRating", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Strengths'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreatePerformanceReviewDto.prototype, "strengths", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Weaknesses'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreatePerformanceReviewDto.prototype, "weaknesses", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Summary / comments'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreatePerformanceReviewDto.prototype, "summary", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Status',
        default: 'Draft'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreatePerformanceReviewDto.prototype, "status", void 0);

//# sourceMappingURL=create-performance-review.dto.js.map