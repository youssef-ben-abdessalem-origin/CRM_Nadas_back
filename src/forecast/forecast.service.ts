import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { ForecastPeriod, PeriodStatus } from './entities/forecast-period.entity';
import { ForecastTarget } from './entities/forecast-target.entity';
import { ForecastAdjustment } from './entities/forecast-adjustment.entity';
import { ForecastStageMapping, ForecastCategory } from './entities/forecast-stage-mapping.entity';
import { Deal } from '../deals/entities/deal.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ForecastService {
  constructor(
    @InjectRepository(ForecastPeriod)
    private periodRepo: Repository<ForecastPeriod>,
    @InjectRepository(ForecastTarget)
    private targetRepo: Repository<ForecastTarget>,
    @InjectRepository(ForecastAdjustment)
    private adjustmentRepo: Repository<ForecastAdjustment>,
    @InjectRepository(ForecastStageMapping)
    private mappingRepo: Repository<ForecastStageMapping>,
    @InjectRepository(Deal)
    private dealRepo: Repository<Deal>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // Period Management
  async getPeriods() {
    return this.periodRepo.find({ order: { startDate: 'DESC' } });
  }

  async createPeriod(data: Partial<ForecastPeriod>) {
    const period = this.periodRepo.create(data);
    return this.periodRepo.save(period);
  }

  async updatePeriod(id: number, data: Partial<ForecastPeriod>) {
    await this.periodRepo.update(id, data);
    return this.periodRepo.findOne({ where: { id } });
  }

  // Target Management
  async getTargets(periodId: number) {
    return this.targetRepo.find({
      where: { periodId },
      relations: ['user', 'assignedBy'],
    });
  }

  async setTarget(data: { userId: number; periodId: number; targetValue: number; assignedById: number }) {
    let target = await this.targetRepo.findOne({
      where: { userId: data.userId, periodId: data.periodId },
    });
    if (!target) {
      target = this.targetRepo.create(data);
    } else {
      target.targetValue = data.targetValue;
      target.assignedById = data.assignedById;
    }
    return this.targetRepo.save(target);
  }

  // Mapping Management
  async getMappings() {
    return this.mappingRepo.find({ relations: ['dealStage'] });
  }

  async updateMapping(id: number, category: ForecastCategory) {
    await this.mappingRepo.update(id, { category });
    return this.mappingRepo.findOne({ where: { id }, relations: ['dealStage'] });
  }

  // Dashboard & Analytics
  async getDashboard(periodId: number, userId?: number) {
    const period = await this.periodRepo.findOne({ where: { id: periodId } });
    if (!period) throw new NotFoundException('Period not found');

    const mappings = await this.mappingRepo.find();
    
    // Get all users if no userId provided
    const users = userId ? await this.userRepo.find({ where: { id: userId } }) : await this.userRepo.find();
    
    const dashboardData = await Promise.all(
      users.map(async (user) => {
        const stats = await this.calculateUserForecast(user.id, period, mappings);
        return {
          userId: user.id,
          userName: user.name,
          ...stats,
        };
      }),
    );

    return dashboardData;
  }

  private async calculateUserForecast(userId: number, period: ForecastPeriod, mappings: ForecastStageMapping[]) {
    const deals = await this.dealRepo.find({
      where: {
        ownerId: userId,
        expectedCloseDate: Between(period.startDate, period.endDate),
      },
    });

    const target = await this.targetRepo.findOne({
      where: { userId, periodId: period.id },
    });

    const adjustment = await this.adjustmentRepo.findOne({
      where: { userId, periodId: period.id },
    });

    const stats = {
      target: target ? Number(target.targetValue) : 0,
      pipeline: 0,
      bestCase: 0,
      commit: 0,
      closed: 0,
    };

    deals.forEach((deal) => {
      const mapping = mappings.find((m) => m.dealStageId === deal.dealStageId);
      if (!mapping) return;

      const value = Number(deal.value) || 0;
      switch (mapping.category) {
        case ForecastCategory.PIPELINE:
          stats.pipeline += value;
          break;
        case ForecastCategory.BEST_CASE:
          stats.bestCase += value;
          break;
        case ForecastCategory.COMMIT:
          stats.commit += value;
          break;
        case ForecastCategory.CLOSED:
          stats.closed += value;
          break;
      }
    });

    // Apply adjustments
    const finalCommit = (adjustment && adjustment.commitOverride != null) ? Number(adjustment.commitOverride) : stats.commit;
    const finalBestCase = (adjustment && adjustment.bestCaseOverride != null) ? Number(adjustment.bestCaseOverride) : stats.bestCase;

    return {
      ...stats,
      commit: finalCommit,
      bestCase: finalBestCase,
      gap: Math.max(0, (target ? Number(target.targetValue) : 0) - finalCommit),
      hasAdjustment: !!adjustment,
      adjustmentNote: adjustment?.note,
    };
  }

  async getMyForecast(userId: number, periodId?: number) {
    let period: ForecastPeriod;
    if (periodId) {
      period = await this.periodRepo.findOne({ where: { id: periodId } });
    } else {
      period = await this.periodRepo.findOne({
        where: { status: PeriodStatus.OPEN },
        order: { startDate: 'ASC' },
      });
    }

    if (!period) {
      // Return empty stats if no period
      return null;
    }

    const mappings = await this.mappingRepo.find();
    const stats = await this.calculateUserForecast(userId, period, mappings);

    const deals = await this.dealRepo.find({
      where: {
        ownerId: userId,
        expectedCloseDate: Between(period.startDate, period.endDate),
      },
      relations: ['stage'],
    });

    return {
      period,
      stats,
      deals: deals.map(d => ({
        id: d.id,
        name: d.name,
        value: Number(d.value) || 0,
        stage: d.stage?.name,
        category: mappings.find(m => m.dealStageId === d.dealStageId)?.category || 'UNMAPPED',
        probability: d.probability,
        expectedCloseDate: d.expectedCloseDate,
      })),
    };
  }

  async setAdjustment(userId: number, periodId: number, data: { commitOverride?: number, bestCaseOverride?: number, note?: string, createdById: number }) {
    let adj = await this.adjustmentRepo.findOne({ where: { userId, periodId } });
    if (!adj) {
      adj = this.adjustmentRepo.create({ userId, periodId });
    }

    if (data.commitOverride !== undefined) adj.commitOverride = data.commitOverride;
    if (data.bestCaseOverride !== undefined) adj.bestCaseOverride = data.bestCaseOverride;
    if (data.note !== undefined) adj.note = data.note;
    adj.createdById = data.createdById;

    return this.adjustmentRepo.save(adj);
  }

  async getContributions(userId: number, periodId: number, category: ForecastCategory) {
    const period = await this.periodRepo.findOne({ where: { id: periodId } });
    if (!period) throw new NotFoundException('Period not found');

    const mappings = await this.mappingRepo.find({ where: { category } });
    const stageIds = mappings.map(m => m.dealStageId);

    if (stageIds.length === 0) return [];

    return this.dealRepo.find({
      where: {
        ownerId: userId,
        dealStageId: In(stageIds),
        expectedCloseDate: Between(period.startDate, period.endDate),
      },
      relations: ['owner', 'stage'],
    });
  }
}
