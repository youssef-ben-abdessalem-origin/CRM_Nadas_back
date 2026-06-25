"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateShiftDto", {
    enumerable: true,
    get: function() {
        return CreateShiftDto;
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
let CreateShiftDto = class CreateShiftDto {
};
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Shift code (auto-generated if omitted)',
        example: 'MORNING'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateShiftDto.prototype, "code", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Shift name',
        example: 'Morning Shift'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateShiftDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Start time',
        example: '08:00'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateShiftDto.prototype, "startTime", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'End time',
        example: '16:00'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateShiftDto.prototype, "endTime", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Break duration in hours',
        example: 0.5
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateShiftDto.prototype, "breakDuration", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Description'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateShiftDto.prototype, "description", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Color hex code for UI',
        example: '#3b82f6'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateShiftDto.prototype, "color", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Flexible shift',
        default: false
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], CreateShiftDto.prototype, "flexible", void 0);

//# sourceMappingURL=create-shift.dto.js.map