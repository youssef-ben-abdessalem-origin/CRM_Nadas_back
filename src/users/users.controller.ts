import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('paginated')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get paginated users' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  findPaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.usersService.findPaginated(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
      search,
    );
  }
  
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    description: 'Create a new user',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Jane Cooper' },
        email: { type: 'string', example: 'jane@nexus-crm.com' },
        password: { type: 'string', example: 'StrongPass123!' },
        roleId: { type: 'string', example: '7d43f5fe-0d5f-4a1e-b0ea-2a3c4f2e7d20' },
        phone: { type: 'string', example: '+1 (555) 000-0000' },
        enabled: { type: 'boolean', example: true },
      },
      required: ['name', 'email', 'password'],
    },
  })
  create(@Body() data: any): Promise<User> {
    return this.usersService.create(data);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@Request() req: any): User {
    return req.user;
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  async updateProfile(@Request() req: any, @Body() data: any): Promise<User> {
    return this.usersService.updateProfile(req.user.id, data);
  }

  @Get(':id(\\d+)')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Put(':id(\\d+)')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({
    description: 'Update an existing user',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Jane C. Cooper' },
        phone: { type: 'string', example: '+1 (555) 111-2222' },
        roleId: { type: 'string', example: '7d43f5fe-0d5f-4a1e-b0ea-2a3c4f2e7d20' },
        enabled: { type: 'boolean', example: true },
      },
    },
  })
  update(@Param('id') id: string, @Body() data: any): Promise<User> {
    return this.usersService.update(+id, data);
  }

  @Delete(':id(\\d+)')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(+id);
  }
}
