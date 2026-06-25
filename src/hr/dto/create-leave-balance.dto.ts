import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeaveBalanceDto {
  @ApiProperty({ description: 'Employee ID' })
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ description: 'Year', example: 2025 })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ description: 'Leave type ID' })
  @IsNumber()
  @IsNotEmpty()
  leaveTypeId: number;

  @ApiPropertyOptional({ description: 'Total days allotted', example: 30 })
  @IsNumber()
  @IsOptional()
  totalDays?: number;

  @ApiPropertyOptional({ description: 'Used days so far', example: 5 })
  @IsNumber()
  @IsOptional()
  usedDays?: number;

  @ApiPropertyOptional({ description: 'Remaining days', example: 25 })
  @IsNumber()
  @IsOptional()
  remainingDays?: number;
}
