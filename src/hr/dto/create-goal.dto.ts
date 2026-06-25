import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateGoalDto {
  @ApiProperty({ description: 'Employee ID' })
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ description: 'Goal title', example: 'Close 10 deals this quarter' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Category', example: 'Sales' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Target date', example: '2025-12-31' })
  @IsDateString()
  @IsOptional()
  targetDate?: string;

  @ApiPropertyOptional({ description: 'Progress percentage', default: 0 })
  @IsNumber()
  @IsOptional()
  progress?: number;

  @ApiPropertyOptional({ description: 'Status', default: 'Not Started' })
  @IsString()
  @IsOptional()
  status?: string;
}
