"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateLeaveBalanceDto", {
    enumerable: true,
    get: function() {
        return CreateLeaveBalanceDto;
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
let CreateLeaveBalanceDto = class CreateLeaveBalanceDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Employee ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreateLeaveBalanceDto.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Year',
        example: 2025
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreateLeaveBalanceDto.prototype, "year", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Leave type ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], CreateLeaveBalanceDto.prototype, "leaveTypeId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Total days allotted',
        example: 30
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateLeaveBalanceDto.prototype, "totalDays", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Used days so far',
        example: 5
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateLeaveBalanceDto.prototype, "usedDays", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Remaining days',
        example: 25
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateLeaveBalanceDto.prototype, "remainingDays", void 0);

//# sourceMappingURL=create-leave-balance.dto.js.map