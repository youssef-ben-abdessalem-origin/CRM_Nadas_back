import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsIn } from 'class-validator';

export class CreateOvertimeRequestDto {
  @ApiProperty({ description: 'Employee ID' })
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ description: 'Overtime category', enum: ['weekday', 'night', 'restDay'], default: 'weekday' })
  @IsString()
  @IsOptional()
  @IsIn(['weekday', 'night', 'restDay'])
  category?: string;

  @ApiProperty({ description: 'Approval authority level', enum: ['manager', 'ceo', 'hr'], default: 'manager' })
  @IsString()
  @IsOptional()
  @IsIn(['manager', 'ceo', 'hr'])
  approvalAuthority?: string;

  @ApiProperty({ description: 'Overtime date', example: '2025-06-01' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'Start time', example: '18:00' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ description: 'End time', example: '20:00' })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ description: 'Total overtime hours', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  totalHours: number;

  @ApiPropertyOptional({ description: 'Multiplier (auto-set from HR settings if category provided)', example: 1.25 })
  @IsNumber()
  @IsOptional()
  multiplier?: number;

  @ApiPropertyOptional({ description: 'Reason / description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Status', default: 'Pending' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Approver employee ID' })
  @IsNumber()
  @IsOptional()
  approvedById?: number;

  @ApiPropertyOptional({ description: 'Manager who assigned this overtime' })
  @IsNumber()
  @IsOptional()
  assignedById?: number;
}
