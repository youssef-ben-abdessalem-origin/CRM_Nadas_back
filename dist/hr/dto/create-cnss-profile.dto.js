"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateCnssProfileDto", {
    enumerable: true,
    get: function() {
        return CreateCnssProfileDto;
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
let CreateCnssProfileDto = class CreateCnssProfileDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'CNSS number',
        example: '123456789'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateCnssProfileDto.prototype, "cnssNumber", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Registration date',
        example: '2024-01-01'
    }),
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateCnssProfileDto.prototype, "registrationDate", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Regime',
        example: 'CNSS',
        default: 'CNSS'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateCnssProfileDto.prototype, "regime", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Status',
        example: 'Active',
        default: 'Active'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateCnssProfileDto.prototype, "status", void 0);

//# sourceMappingURL=create-cnss-profile.dto.js.map