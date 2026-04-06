import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { DealsService } from './deals.service';
import { AuthGuard } from '@nestjs/passport';
import { Deal } from './entities/deal.entity';
import { DealStage } from './entities/deal-stage.entity';
import { DealReason } from './entities/deal-reason.entity';

const createDealExample = {
  name: "Enterprise License Deal",
  accountId: 1,
  contactId: 1,
  dealStageId: 1,
  value: 50000,
  probability: 75,
  expectedCloseDate: "2026-06-30",
  owner: "Sales Team",
  notes: "High priority deal",
};

@ApiTags('Deals')
@Controller('deals')
export class DealsController {
  constructor(private dealsService: DealsService) {}

  // Deal Stages - must come before :id routes
  @Get('stages')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all deal stages' })
  getStages(): Promise<DealStage[]> {
    return this.dealsService.getStages();
  }

  @Post('stages')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create deal stage' })
  createStage(@Body() data: { name: string; color?: string }): Promise<DealStage> {
    return this.dealsService.createStage(data.name, data.color);
  }

  @Put('stages/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update deal stage' })
  updateStage(@Param('id') id: string, @Body() data: Partial<DealStage>): Promise<DealStage> {
    return this.dealsService.updateStage(+id, data);
  }

  @Delete('stages/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete deal stage' })
  deleteStage(@Param('id') id: string): Promise<void> {
    return this.dealsService.deleteStage(+id);
  }

  // Deal Reasons - must come before :id routes
  @Get('reasons')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all deal reasons' })
  getReasons(@Query('type') type?: string): Promise<DealReason[]> {
    return this.dealsService.getReasons(type);
  }

  @Post('reasons')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create deal reason' })
  createReason(@Body() data: { name: string; color?: string; type?: string }): Promise<DealReason> {
    return this.dealsService.createReason(data.name, data.color, data.type);
  }

  @Put('reasons/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update deal reason' })
  updateReason(@Param('id') id: string, @Body() data: Partial<DealReason>): Promise<DealReason> {
    return this.dealsService.updateReason(+id, data);
  }

  @Delete('reasons/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete deal reason' })
  deleteReason(@Param('id') id: string): Promise<void> {
    return this.dealsService.deleteReason(+id);
  }

  // Deal CRUD - comes after specific routes
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findAll(): Promise<Deal[]> {
    return this.dealsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<Deal> {
    return this.dealsService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ type: Object, description: 'Deal data', examples: { example: { value: createDealExample } } })
  create(@Body() data: Partial<Deal>): Promise<Deal> {
    return this.dealsService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() data: Partial<Deal>): Promise<Deal> {
    return this.dealsService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  delete(@Param('id') id: string): Promise<void> {
    return this.dealsService.delete(+id);
  }
}
