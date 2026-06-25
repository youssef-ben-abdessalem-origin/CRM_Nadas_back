import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateEmployeeDocumentDto {
  @ApiProperty({ description: 'Employee ID' })
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ description: 'Document type', example: 'CIN', enum: ['CIN', 'Passport', 'Diploma', 'Work Permit', 'Medical Certificate', 'Contract', 'Other'] })
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @ApiPropertyOptional({ description: 'File name' })
  @IsString()
  @IsOptional()
  fileName?: string;

  @ApiPropertyOptional({ description: 'File URL' })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiPropertyOptional({ description: 'Expiry date', example: '2027-01-01' })
  @IsDateString()
  @IsOptional()
  expiryDate?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsString()
  @IsOptional()
  notes?: string;
}
