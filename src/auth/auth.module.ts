import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GmailModule } from '../gmail/gmail.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [UsersModule, RolesModule, GmailModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}