import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsArray, Min } from 'class-validator';

export class CreateEmployeeDto {
  @ApiPropertyOptional({ description: 'Auto-generated if not provided', example: 'EMP-0001' })
  @IsString()
  @IsOptional()
  employeeNumber?: string;

  @ApiProperty({ description: 'First name', example: 'Ahmed' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Ben Salem' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'CIN (national ID)', example: '09876543' })
  @IsString()
  @IsNotEmpty()
  cin: string;

  @ApiProperty({ description: 'Date of birth', example: '1990-01-15' })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiPropertyOptional({ description: 'Place of birth', example: 'Tunis' })
  @IsString()
  @IsOptional()
  placeOfBirth?: string;

  @ApiProperty({ description: 'Gender', example: 'Male', enum: ['Male', 'Female'] })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ description: 'Nationality', example: 'Tunisian' })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiPropertyOptional({ description: 'Marital status', example: 'Single', default: 'Single' })
  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @ApiPropertyOptional({ description: 'Number of children', example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  childrenCount?: number;

  @ApiPropertyOptional({ description: 'Personal email', example: 'ahmed@gmail.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Work email', example: 'ahmed@company.com' })
  @IsString()
  @IsOptional()
  workEmail?: string;

  @ApiProperty({ description: 'Phone / mobile number', example: '+21650123456' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ description: 'CNSS number', example: '123456789' })
  @IsString()
  @IsOptional()
  cnssNumber?: string;

  @ApiPropertyOptional({ description: 'Passport number', example: 'AB123456' })
  @IsString()
  @IsOptional()
  passportNumber?: string;

  @ApiPropertyOptional({ description: 'Emergency contact name', example: 'Fatma Ben Salem' })
  @IsString()
  @IsOptional()
  emergencyContactName?: string;

  @ApiPropertyOptional({ description: 'Emergency contact phone', example: '+21650123457' })
  @IsString()
  @IsOptional()
  emergencyContactPhone?: string;

  @ApiPropertyOptional({ description: 'Education background', example: 'Bachelor in Computer Science' })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiPropertyOptional({ description: 'Skills', example: ['JavaScript', 'Python'] })
  @IsArray()
  @IsOptional()
  skills?: string[];

  @ApiPropertyOptional({ description: 'Certifications', example: ['AWS Certified', 'PMP'] })
  @IsArray()
  @IsOptional()
  certifications?: string[];

  @ApiPropertyOptional({ description: 'Address', example: '123 Rue de la Liberté' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ description: 'City', example: 'Tunis' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ description: 'Postal code', example: '1001' })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiProperty({ description: 'Hire date', example: '2024-03-01' })
  @IsDateString()
  @IsNotEmpty()
  hireDate: string;

  @ApiPropertyOptional({ description: 'Primary work location', example: 'Tunis HQ' })
  @IsString()
  @IsOptional()
  workLocation?: string;

  @ApiPropertyOptional({ description: 'Cost center', example: 'HR-OPS' })
  @IsString()
  @IsOptional()
  costCenter?: string;

  @ApiPropertyOptional({ description: 'Employment category', example: 'Cadre' })
  @IsString()
  @IsOptional()
  employmentCategory?: string;

  @ApiPropertyOptional({ description: 'Attendance mode', example: 'On Site' })
  @IsString()
  @IsOptional()
  attendanceMode?: string;

  @ApiPropertyOptional({ description: 'Department ID' })
  @IsNumber()
  @IsOptional()
  departmentId?: number;

  @ApiPropertyOptional({ description: 'Position ID' })
  @IsNumber()
  @IsOptional()
  positionId?: number;

  @ApiPropertyOptional({ description: 'Manager employee ID' })
  @IsNumber()
  @IsOptional()
  managerId?: number;

  @ApiPropertyOptional({ description: 'Employment status', example: 'Active', default: 'Active' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Onboarding readiness status', example: 'Draft', default: 'Draft' })
  @IsString()
  @IsOptional()
  readinessStatus?: string;

  @ApiPropertyOptional({ description: 'Photo URL' })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiPropertyOptional({ description: 'Residence card number for foreign employees' })
  @IsString()
  @IsOptional()
  residenceCardNumber?: string;

  @ApiPropertyOptional({ description: 'Residence card expiry date', example: '2027-01-01' })
  @IsDateString()
  @IsOptional()
  residenceCardExpiry?: string;

  @ApiPropertyOptional({ description: 'Work permit type', example: 'Contract Visa' })
  @IsString()
  @IsOptional()
  workPermitType?: string;

  @ApiPropertyOptional({ description: 'Work permit number', example: 'WP-2026-0012' })
  @IsString()
  @IsOptional()
  workPermitNumber?: string;

  @ApiPropertyOptional({ description: 'Work permit status', example: 'Approved' })
  @IsString()
  @IsOptional()
  workPermitStatus?: string;

  @ApiPropertyOptional({ description: 'Work permit expiry date', example: '2027-01-01' })
  @IsDateString()
  @IsOptional()
  workPermitExpiry?: string;
}
