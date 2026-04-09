import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'admin@nexus.crm',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for account access',
    example: 'Admin@123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
