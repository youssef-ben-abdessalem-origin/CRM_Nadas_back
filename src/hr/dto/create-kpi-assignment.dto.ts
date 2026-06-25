import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKpiAssignmentDto {
  @ApiProperty({ description: 'Employee ID' })
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ description: 'KPI ID' })
  @IsNumber()
  @IsNotEmpty()
  kpiId: number;

  @ApiPropertyOptional({ description: 'Target value override', example: 95 })
  @IsNumber()
  @IsOptional()
  targetValue?: number;

  @ApiPropertyOptional({ description: 'Actual value achieved', example: 88 })
  @IsNumber()
  @IsOptional()
  actualValue?: number;

  @ApiPropertyOptional({ description: 'Period', example: '2025-Q1' })
  @IsString()
  @IsOptional()
  period?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsString()
  @IsOptional()
  notes?: string;
}
