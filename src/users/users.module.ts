import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { DataInitializer } from '../app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    PermissionsModule,
  ],
  providers: [UsersService, DataInitializer],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}