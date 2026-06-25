"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateShiftAssignmentDto", {
    enumerable: true,
    get: function() {
        return CreateShiftAssignmentDto;
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
let CreateShiftAssignmentDto = class CreateShiftAssignmentDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Employee ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreateShiftAssignmentDto.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Shift ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreateShiftAssignmentDto.prototype, "shiftId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Start date',
        example: '2025-01-01'
    }),
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateShiftAssignmentDto.prototype, "startDate", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'End date (leave empty for ongoing)',
        example: '2025-12-31'
    }),
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateShiftAssignmentDto.prototype, "endDate", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Notes'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateShiftAssignmentDto.prototype, "notes", void 0);

//# sourceMappingURL=create-shift-assignment.dto.js.map