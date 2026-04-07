import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { AuthGuard } from '@nestjs/passport';
import { Permission } from './entities/permission.entity';

@ApiTags('Permissions')
@Controller('permissions')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available permissions' })
  findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }
}
