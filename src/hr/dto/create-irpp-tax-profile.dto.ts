import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateIrppTaxProfileDto {
  @ApiPropertyOptional({ description: 'Marital status', example: 'Single', default: 'Single' })
  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @ApiPropertyOptional({ description: 'Number of children', example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  childrenCount?: number;

  @ApiPropertyOptional({ description: 'Number of disabled dependents', example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  disabledDependents?: number;

  @ApiPropertyOptional({ description: 'Tax exemptions amount', example: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  taxExemptions?: number;
}
