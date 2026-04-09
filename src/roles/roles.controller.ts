import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './entities/role.entity';

@ApiTags('Roles')
@Controller('roles')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID' })
  findOne(@Param('id') id: string): Promise<Role> {
     return this.rolesService.findOne(id);
  }

  @Get(':id/permissions')
  @ApiOperation({ summary: 'Get permissions by role ID' })
  getRolePermissions(@Param('id') id: string) {
    return this.rolesService.getRolePermissions(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create role' })
  create(@Body() data: any): Promise<Role> {
    return this.rolesService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role' })
  update(@Param('id') id: string, @Body() data: any): Promise<Role> {
    return this.rolesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role' })
  delete(@Param('id') id: string): Promise<void> {
    return this.rolesService.delete(id);
  }
}
