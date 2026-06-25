"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateKpiAssignmentDto", {
    enumerable: true,
    get: function() {
        return CreateKpiAssignmentDto;
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
let CreateKpiAssignmentDto = class CreateKpiAssignmentDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Employee ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreateKpiAssignmentDto.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'KPI ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreateKpiAssignmentDto.prototype, "kpiId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Target value override',
        example: 95
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateKpiAssignmentDto.prototype, "targetValue", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Actual value achieved',
        example: 88
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateKpiAssignmentDto.prototype, "actualValue", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Period',
        example: '2025-Q1'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateKpiAssignmentDto.prototype, "period", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Notes'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateKpiAssignmentDto.prototype, "notes", void 0);

//# sourceMappingURL=create-kpi-assignment.dto.js.map