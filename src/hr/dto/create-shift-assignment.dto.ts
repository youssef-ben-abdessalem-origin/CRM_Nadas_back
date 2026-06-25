import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsDateString, IsString } from 'class-validator';

export class CreateShiftAssignmentDto {
  @ApiProperty({ description: 'Employee ID' })
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ description: 'Shift ID' })
  @IsNumber()
  @IsNotEmpty()
  shiftId: number;

  @ApiProperty({ description: 'Start date', example: '2025-01-01' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiPropertyOptional({ description: 'End date (leave empty for ongoing)', example: '2025-12-31' })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsString()
  @IsOptional()
  notes?: string;
}
