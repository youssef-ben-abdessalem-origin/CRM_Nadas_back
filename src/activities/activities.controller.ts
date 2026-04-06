import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ActivitiesService } from './activities.service';
import { ActivityEntityType } from './entities/activity.entity';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Get('types')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all activity types' })
  getTypes() {
    return this.activitiesService.getAllTypes();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all activities' })
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get('entity')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get activities by entity' })
  @ApiQuery({ name: 'entityType', enum: ActivityEntityType })
  @ApiQuery({ name: 'entityId', type: Number })
  findByEntity(
    @Query('entityType') entityType: ActivityEntityType,
    @Query('entityId') entityId: string,
  ) {
    return this.activitiesService.findByEntity(entityType, parseInt(entityId));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create activity' })
  create(@Body() data: {
    entityType: ActivityEntityType;
    entityId: number;
    typeId: number;
    subject?: string;
    description?: string;
    dueDate?: string;
    assignedToId?: number;
  }) {
    return this.activitiesService.create({
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update activity' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.activitiesService.update(+id, data);
  }

  @Put(':id/complete')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete activity' })
  complete(@Param('id') id: string) {
    return this.activitiesService.complete(+id);
  }

  @Put(':id/reassign')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reassign activity to another user' })
  reassign(@Param('id') id: string, @Body('assignedToId') assignedToId: number) {
    return this.activitiesService.reassign(+id, assignedToId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete activity' })
  delete(@Param('id') id: string) {
    return this.activitiesService.delete(+id);
  }
}
