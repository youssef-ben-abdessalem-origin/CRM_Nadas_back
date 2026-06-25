"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateOvertimeRequestDto", {
    enumerable: true,
    get: function() {
        return CreateOvertimeRequestDto;
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
let CreateOvertimeRequestDto = class CreateOvertimeRequestDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Employee ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreateOvertimeRequestDto.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Overtime category',
        enum: [
            'weekday',
            'night',
            'restDay'
        ],
        default: 'weekday'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsIn)([
        'weekday',
        'night',
        'restDay'
    ]),
    _ts_metadata("design:type", String)
], CreateOvertimeRequestDto.prototype, "category", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Approval authority level',
        enum: [
            'manager',
            'ceo',
            'hr'
        ],
        default: 'manager'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsIn)([
        'manager',
        'ceo',
        'hr'
    ]),
    _ts_metadata("design:type", String)
], CreateOvertimeRequestDto.prototype, "approvalAuthority", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Overtime date',
        example: '2025-06-01'
    }),
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateOvertimeRequestDto.prototype, "date", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Start time',
        example: '18:00'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateOvertimeRequestDto.prototype, "startTime", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'End time',
        example: '20:00'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateOvertimeRequestDto.prototype, "endTime", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Total overtime hours',
        example: 2
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreateOvertimeRequestDto.prototype, "totalHours", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Multiplier (auto-set from HR settings if category provided)',
        example: 1.25
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateOvertimeRequestDto.prototype, "multiplier", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Reason / description'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateOvertimeRequestDto.prototype, "description", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Status',
        default: 'Pending'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateOvertimeRequestDto.prototype, "status", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Approver employee ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateOvertimeRequestDto.prototype, "approvedById", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Manager who assigned this overtime'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateOvertimeRequestDto.prototype, "assignedById", void 0);

//# sourceMappingURL=create-overtime-request.dto.js.map