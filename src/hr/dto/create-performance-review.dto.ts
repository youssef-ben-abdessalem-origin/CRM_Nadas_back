import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreatePerformanceReviewDto {
  @ApiProperty({ description: 'Employee ID' })
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @ApiPropertyOptional({ description: 'Reviewer employee ID' })
  @IsNumber()
  @IsOptional()
  reviewerId?: number;

  @ApiProperty({ description: 'Review date', example: '2025-07-01' })
  @IsDateString()
  @IsNotEmpty()
  reviewDate: string;

  @ApiPropertyOptional({ description: 'Overall rating (0-10)', example: 7.5 })
  @IsNumber()
  @IsOptional()
  overallRating?: number;

  @ApiPropertyOptional({ description: 'Strengths' })
  @IsString()
  @IsOptional()
  strengths?: string;

  @ApiPropertyOptional({ description: 'Weaknesses' })
  @IsString()
  @IsOptional()
  weaknesses?: string;

  @ApiPropertyOptional({ description: 'Summary / comments' })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiPropertyOptional({ description: 'Status', default: 'Draft' })
  @IsString()
  @IsOptional()
  status?: string;
}
