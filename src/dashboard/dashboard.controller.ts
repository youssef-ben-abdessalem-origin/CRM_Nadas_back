import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getDashboardStats() {
    const [stats, charts, activities] = await Promise.all([
      this.dashboardService.getStats(),
      this.dashboardService.getChartsData(),
      this.dashboardService.getRecentActivities(),
    ]);

    return {
      stats,
      charts,
      activities
    };
  }
}
