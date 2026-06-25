import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateKpiDto {
  @ApiPropertyOptional({ description: 'KPI code (auto-generated if omitted)' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ description: 'KPI name', example: 'Customer Satisfaction Score' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Category', example: 'Sales' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Target value', example: 90 })
  @IsNumber()
  @IsOptional()
  targetValue?: number;

  @ApiPropertyOptional({ description: 'Unit', example: '%' })
  @IsString()
  @IsOptional()
  unit?: string;

  @ApiPropertyOptional({ description: 'Active', default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
