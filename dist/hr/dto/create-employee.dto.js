"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateEmployeeDto", {
    enumerable: true,
    get: function() {
        return CreateEmployeeDto;
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
let CreateEmployeeDto = class CreateEmployeeDto {
};
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Auto-generated if not provided',
        example: 'EMP-0001'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "employeeNumber", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'First name',
        example: 'Ahmed'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "firstName", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Last name',
        example: 'Ben Salem'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "lastName", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'CIN (national ID)',
        example: '09876543'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "cin", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Date of birth',
        example: '1990-01-15'
    }),
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "dateOfBirth", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Place of birth',
        example: 'Tunis'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "placeOfBirth", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Gender',
        example: 'Male',
        enum: [
            'Male',
            'Female'
        ]
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "gender", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Nationality',
        example: 'Tunisian'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "nationality", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Marital status',
        example: 'Single',
        default: 'Single'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "maritalStatus", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Number of children',
        example: 0,
        default: 0
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.Min)(0),
    _ts_metadata("design:type", Number)
], CreateEmployeeDto.prototype, "childrenCount", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Personal email',
        example: 'ahmed@gmail.com'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "email", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Work email',
        example: 'ahmed@company.com'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "workEmail", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Phone / mobile number',
        example: '+21650123456'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "phone", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'CNSS number',
        example: '123456789'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "cnssNumber", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Passport number',
        example: 'AB123456'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "passportNumber", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Emergency contact name',
        example: 'Fatma Ben Salem'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "emergencyContactName", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Emergency contact phone',
        example: '+21650123457'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "emergencyContactPhone", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Education background',
        example: 'Bachelor in Computer Science'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "education", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Skills',
        example: [
            'JavaScript',
            'Python'
        ]
    }),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Array)
], CreateEmployeeDto.prototype, "skills", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Certifications',
        example: [
            'AWS Certified',
            'PMP'
        ]
    }),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Array)
], CreateEmployeeDto.prototype, "certifications", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Address',
        example: '123 Rue de la Liberté'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "address", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'City',
        example: 'Tunis'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "city", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Postal code',
        example: '1001'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "postalCode", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Hire date',
        example: '2024-03-01'
    }),
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "hireDate", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Primary work location',
        example: 'Tunis HQ'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "workLocation", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Cost center',
        example: 'HR-OPS'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "costCenter", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Employment category',
        example: 'Cadre'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "employmentCategory", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Attendance mode',
        example: 'On Site'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "attendanceMode", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Department ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateEmployeeDto.prototype, "departmentId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Position ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateEmployeeDto.prototype, "positionId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Manager employee ID'
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateEmployeeDto.prototype, "managerId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Employment status',
        example: 'Active',
        default: 'Active'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "status", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Onboarding readiness status',
        example: 'Draft',
        default: 'Draft'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "readinessStatus", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Photo URL'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "photo", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Residence card number for foreign employees'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "residenceCardNumber", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Residence card expiry date',
        example: '2027-01-01'
    }),
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "residenceCardExpiry", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Work permit type',
        example: 'Contract Visa'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "workPermitType", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Work permit number',
        example: 'WP-2026-0012'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "workPermitNumber", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Work permit status',
        example: 'Approved'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "workPermitStatus", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        description: 'Work permit expiry date',
        example: '2027-01-01'
    }),
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateEmployeeDto.prototype, "workPermitExpiry", void 0);

//# sourceMappingURL=create-employee.dto.js.map