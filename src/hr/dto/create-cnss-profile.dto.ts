import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateCnssProfileDto {
  @ApiProperty({ description: 'CNSS number', example: '123456789' })
  @IsString()
  @IsNotEmpty()
  cnssNumber: string;

  @ApiPropertyOptional({ description: 'Registration date', example: '2024-01-01' })
  @IsDateString()
  @IsOptional()
  registrationDate?: string;

  @ApiPropertyOptional({ description: 'Regime', example: 'CNSS', default: 'CNSS' })
  @IsString()
  @IsOptional()
  regime?: string;

  @ApiPropertyOptional({ description: 'Status', example: 'Active', default: 'Active' })
  @IsString()
  @IsOptional()
  status?: string;
}
