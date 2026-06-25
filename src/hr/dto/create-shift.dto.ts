import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateShiftDto {
  @ApiPropertyOptional({ description: 'Shift code (auto-generated if omitted)', example: 'MORNING' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ description: 'Shift name', example: 'Morning Shift' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Start time', example: '08:00' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ description: 'End time', example: '16:00' })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiPropertyOptional({ description: 'Break duration in hours', example: 0.5 })
  @IsNumber()
  @IsOptional()
  breakDuration?: number;

  @ApiPropertyOptional({ description: 'Description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Color hex code for UI', example: '#3b82f6' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ description: 'Flexible shift', default: false })
  @IsBoolean()
  @IsOptional()
  flexible?: boolean;
}
