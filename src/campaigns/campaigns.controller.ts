import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CampaignType } from './entities/campaign-type.entity';
import { CampaignStatus } from './entities/campaign-status.entity';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  async findAll(): Promise<Campaign[]> {
    return this.campaignsService.findAll();
  }

  @Get('types')
  async getTypes(): Promise<CampaignType[]> {
    return this.campaignsService.getTypes();
  }

  @Get('statuses')
  async getStatuses(): Promise<CampaignStatus[]> {
    return this.campaignsService.getStatuses();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Campaign> {
    return this.campaignsService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Campaign>): Promise<Campaign> {
    return this.campaignsService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Campaign>): Promise<Campaign> {
    return this.campaignsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.campaignsService.delete(id);
  }
}
