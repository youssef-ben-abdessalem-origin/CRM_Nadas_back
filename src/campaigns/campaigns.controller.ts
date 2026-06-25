import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post(':id/recipients')
  async addRecipients(@Param('id') id: number, @Body('leadIds') leadIds: number[]) {
    return this.campaignsService.addRecipients(id, leadIds);
  }

  @Post(':id/import-recipients')
  @UseInterceptors(FileInterceptor('file'))
  async importRecipients(
    @Param('id') id: number,
    @UploadedFile() file?: Express.Multer.File,
    @Body('recipients') recipientsJson?: string,
  ) {
    let records: any[] = [];
    if (file) {
      const csvText = file.buffer.toString('utf8');
      records = this.parseCsv(csvText);
    } else if (recipientsJson) {
      records = JSON.parse(recipientsJson);
    }
    return this.campaignsService.importRecipients(id, records);
  }

  @Post(':id/send')
  async sendCampaign(@Param('id') id: number, @Request() req: any) {
    return this.campaignsService.sendCampaign(id, req.user.id);
  }

  @Post(':id/convert-leads')
  async convertCampaignLeads(@Param('id') id: number, @Body('ownerId') ownerId?: number) {
    return this.campaignsService.convertCampaignLeads(id, { ownerId });
  }

  @Get(':id/analytics')
  async getCampaignAnalytics(@Param('id') id: number) {
    return this.campaignsService.getCampaignAnalytics(id);
  }

  @Get(':id/responses')
  async getCampaignResponses(@Param('id') id: number) {
    return this.campaignsService.getCampaignResponses(id);
  }

  @Get(':id/report')
  async generateCampaignReport(@Param('id') id: number) {
    return this.campaignsService.generateCampaignReport(id);
  }

  private parseCsv(text: string): any[] {
    const lines = text.split(/\r?\n/);
    if (lines.length <= 1) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
    const records = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = [];
      let currentVal = '';
      let inQuotes = false;
      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        const char = line[charIndex];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentVal.trim());
          currentVal = '';
        } else {
          currentVal += char;
        }
      }
      values.push(currentVal.trim());
      
      const record: any = {};
      headers.forEach((header, index) => {
        let val = values[index] || '';
        val = val.replace(/^["']|["']$/g, '');
        record[header] = val;
      });
      records.push(record);
    }
    
    return records;
  }
}
