import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePositionDto {
  @ApiPropertyOptional({ description: 'Auto-generated if not provided', example: 'POS-0001' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ description: 'Position title', example: 'Senior Engineer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Department ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  departmentId: number;

  @ApiPropertyOptional({ description: 'Brief description of the role', example: 'Leads the engineering team' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Status', example: 'Active', default: 'Active' })
  @IsString()
  @IsOptional()
  status?: string;
}
