import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { AuthGuard } from '@nestjs/passport';
import { Lead } from './entities/lead.entity';
import { LeadSource } from './entities/lead-source.entity';
import { PipelineStage } from './entities/pipeline-stage.entity';
import { LeadScoreCategory } from './entities/lead-score-category.entity';
import { LeadPriority } from './entities/lead-priority.entity';
import { QualificationStage } from './entities/qualification-stage.entity';

const createLeadExample = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 555-123-4567",
  company: "Acme Corp",
  title: "CEO",
  sourceId: 1,
  stageId: 1,
  scoreCategoryId: 1,
  priorityId: 1,
  qualificationStageId: 1,
  value: 50000,
  location: "San Francisco, CA",
  industry: "Technology",
  website: "https://acme.com",
  notes: "Interested in enterprise plan",
  tags: "enterprise,hot-lead",
};

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all leads' })
  findAll(): Promise<Lead[]> {
    return this.leadsService.findAll();
  }

  @Get('paginated')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get paginated leads for table view' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'stageId', required: false, type: Number })
  findAllPaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('stageId') stageId?: string,
  ) {
    return this.leadsService.findAllPaginated(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
      search,
      stageId ? parseInt(stageId) : undefined,
    );
  }

  @Get('sources')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all lead sources' })
  getSources(): Promise<LeadSource[]> {
    return this.leadsService.getSources();
  }

  @Get('stages')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all pipeline stages' })
  getStages(): Promise<PipelineStage[]> {
    return this.leadsService.getStages();
  }

  @Get('scores')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all score categories' })
  getScores(): Promise<LeadScoreCategory[]> {
    return this.leadsService.getScores();
  }

  @Get('priorities')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all priorities' })
  getPriorities(): Promise<LeadPriority[]> {
    return this.leadsService.getPriorities();
  }

  @Get('qualifications')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all qualification stages' })
  getQualifications(): Promise<QualificationStage[]> {
    return this.leadsService.getQualifications();
  }

  @Post('sources')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create lead source' })
  createSource(@Body() body: { name: string }): Promise<LeadSource> {
    return this.leadsService.createSource(body.name);
  }

  @Put('sources/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update lead source' })
  updateSource(@Param('id') id: string, @Body() body: Partial<LeadSource>): Promise<LeadSource> {
    return this.leadsService.updateSource(+id, body);
  }

  @Delete('sources/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete lead source' })
  deleteSource(@Param('id') id: string): Promise<void> {
    return this.leadsService.deleteSource(+id);
  }

  @Post('stages')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create pipeline stage' })
  createStage(@Body() body: { name: string; order?: number; color?: string }): Promise<PipelineStage> {
    return this.leadsService.createStage(body.name, body.order);
  }

  @Put('stages/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update pipeline stage' })
  updateStage(@Param('id') id: string, @Body() body: Partial<PipelineStage>): Promise<PipelineStage> {
    return this.leadsService.updateStage(+id, body);
  }

  @Delete('stages/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete pipeline stage' })
  deleteStage(@Param('id') id: string): Promise<void> {
    return this.leadsService.deleteStage(+id);
  }

  @Post('scores')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create score category' })
  createScore(@Body() body: { name: string; color?: string }): Promise<LeadScoreCategory> {
    return this.leadsService.createScore(body.name, body.color);
  }

  @Put('scores/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update score category' })
  updateScore(@Param('id') id: string, @Body() body: Partial<LeadScoreCategory>): Promise<LeadScoreCategory> {
    return this.leadsService.updateScore(+id, body);
  }

  @Delete('scores/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete score category' })
  deleteScore(@Param('id') id: string): Promise<void> {
    return this.leadsService.deleteScore(+id);
  }

  @Post('priorities')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create priority' })
  createPriority(@Body() body: { name: string; color?: string }): Promise<LeadPriority> {
    return this.leadsService.createPriority(body.name, body.color);
  }

  @Put('priorities/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update priority' })
  updatePriority(@Param('id') id: string, @Body() body: Partial<LeadPriority>): Promise<LeadPriority> {
    return this.leadsService.updatePriority(+id, body);
  }

  @Delete('priorities/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete priority' })
  deletePriority(@Param('id') id: string): Promise<void> {
    return this.leadsService.deletePriority(+id);
  }

  @Post('qualifications')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create qualification stage' })
  createQualification(@Body() body: { name: string }): Promise<QualificationStage> {
    return this.leadsService.createQualification(body.name);
  }

  @Put('qualifications/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update qualification stage' })
  updateQualification(@Param('id') id: string, @Body() body: Partial<QualificationStage>): Promise<QualificationStage> {
    return this.leadsService.updateQualification(+id, body);
  }

  @Delete('qualifications/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete qualification stage' })
  deleteQualification(@Param('id') id: string): Promise<void> {
    return this.leadsService.deleteQualification(+id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get lead by ID' })
  findOne(@Param('id') id: string): Promise<Lead> {
    return this.leadsService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create lead' })
  @ApiBody({ type: Object, description: 'Lead data', examples: { example: { value: createLeadExample } } })
  create(@Body() data: Partial<Lead>): Promise<Lead> {
    return this.leadsService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update lead' })
  update(@Param('id') id: string, @Body() data: Partial<Lead>): Promise<Lead> {
    return this.leadsService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete lead' })
  delete(@Param('id') id: string): Promise<void> {
    return this.leadsService.delete(+id);
  }

  @Post(':id/convert')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Convert lead to Account + Contact' })
  convert(@Param('id') id: string): Promise<{ lead: Lead; accountId: number; contactId: number }> {
    return this.leadsService.convert(+id);
  }
}