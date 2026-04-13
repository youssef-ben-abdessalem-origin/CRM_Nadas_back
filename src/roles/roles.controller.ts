import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
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

  @Get('paginated')
  @ApiOperation({ summary: 'Get paginated roles' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  findPaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.rolesService.findPaginated(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
      search,
    );
  }

  @Get(':id([0-9a-fA-F\\-]{36})')
  @ApiOperation({ summary: 'Get role by ID' })
  findOne(@Param('id') id: string): Promise<Role> {
     return this.rolesService.findOne(id);
  }

  @Get(':id([0-9a-fA-F\\-]{36})/permissions')
  @ApiOperation({ summary: 'Get permissions by role ID' })
  getRolePermissions(@Param('id') id: string) {
    return this.rolesService.getRolePermissions(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create role' })
  @ApiBody({
    description: 'Create a new custom role',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Sales Manager' },
        description: { type: 'string', example: 'Manages pipeline and team workflows.' },
        color: { type: 'string', example: '#6366f1' },
        permissionIds: {
          type: 'array',
          items: { type: 'number' },
          example: [1, 2, 3, 7, 9],
        },
      },
      required: ['name'],
    },
  })
  create(@Body() data: any): Promise<Role> {
    return this.rolesService.create(data);
  }

  @Put(':id([0-9a-fA-F\\-]{36})')
  @ApiOperation({ summary: 'Update role' })
  @ApiBody({
    description: 'Update role details and permissions',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Senior Sales Manager' },
        description: { type: 'string', example: 'Extended permissions for regional management.' },
        color: { type: 'string', example: '#4f46e5' },
        permissionIds: {
          type: 'array',
          items: { type: 'number' },
          example: [1, 2, 3, 4, 7, 9, 10],
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() data: any): Promise<Role> {
    return this.rolesService.update(id, data);
  }

  @Delete(':id([0-9a-fA-F\\-]{36})')
  @ApiOperation({ summary: 'Delete role' })
  delete(@Param('id') id: string): Promise<void> {
    return this.rolesService.delete(id);
  }
}
