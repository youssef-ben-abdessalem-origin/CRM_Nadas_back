import { Controller, Get, Post, Put, Body, Query, Param, UseGuards, Request } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { ForecastCategory } from './entities/forecast-stage-mapping.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('forecast')
@UseGuards(JwtAuthGuard)
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @Get('dashboard')
  getDashboard(
    @Query('periodId') periodId: number,
    @Query('userId') userId?: number,
  ) {
    return this.forecastService.getDashboard(periodId, userId);
  }

  @Get('my')
  getMyForecast(
    @Request() req,
    @Query('periodId') periodId?: number,
  ) {
    return this.forecastService.getMyForecast(req.user.id, periodId);
  }

  @Post('adjust')
  setAdjustment(@Body() data: { userId: number, periodId: number, commitOverride?: number, bestCaseOverride?: number, note?: string }, @Request() req) {
    return this.forecastService.setAdjustment(data.userId, data.periodId, { ...data, createdById: req.user.id });
  }

  @Get('contributions')
  getContributions(
    @Query('userId') userId: number,
    @Query('periodId') periodId: number,
    @Query('category') category: ForecastCategory,
  ) {
    return this.forecastService.getContributions(userId, periodId, category);
  }

  // Management Endpoints
  @Get('periods')
  getPeriods() {
    return this.forecastService.getPeriods();
  }

  @Post('periods')
  createPeriod(@Body() data: any) {
    return this.forecastService.createPeriod(data);
  }

  @Put('periods/:id')
  updatePeriod(@Param('id') id: string, @Body() data: any) {
    return this.forecastService.updatePeriod(Number(id), data);
  }

  @Get('targets')
  getTargets(@Query('periodId') periodId: number) {
    return this.forecastService.getTargets(periodId);
  }

  @Post('targets')
  setTarget(@Body() data: any, @Request() req) {
    return this.forecastService.setTarget({ ...data, assignedById: req.user.id });
  }

  @Get('mappings')
  getMappings() {
    return this.forecastService.getMappings();
  }

  @Put('mappings/:id')
  updateMapping(@Param('id') id: string, @Body() data: { category: ForecastCategory }) {
    return this.forecastService.updateMapping(Number(id), data.category);
  }
}
