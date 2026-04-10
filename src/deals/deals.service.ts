                                                                                                                      import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from './entities/deal.entity';
import { DealStage } from './entities/deal-stage.entity';
import { DealReason } from './entities/deal-reason.entity';
import { AutomationsService } from '../automations/automations.service';

@Injectable()
export class DealsService implements OnModuleInit {
  constructor(
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
    @InjectRepository(DealStage)
    private dealStageRepository: Repository<DealStage>,
    @InjectRepository(DealReason)
    private dealReasonRepository: Repository<DealReason>,
    private readonly automationsService: AutomationsService,
  ) {}

  async onModuleInit() {
    await this.seedDefaultData();
  }

  private async seedDefaultData() {
    const stageCount = await this.dealStageRepository.count();
    if (stageCount === 0) {
      const defaultStages = [
        { name: 'Qualification', color: '#6366f1', order: 1, isDefault: true },
        { name: 'Discovery', color: '#8b5cf6', order: 2 },
        { name: 'Proposal', color: '#f59e0b', order: 3 },
        { name: 'Negotiation', color: '#3b82f6', order: 4 },
        { name: 'Closed Won', color: '#22c55e', order: 5 },
        { name: 'Closed Lost', color: '#ef4444', order: 6 },
      ];
      for (const stage of defaultStages) {
        await this.dealStageRepository.save(stage);
      }
    }

    const reasonCount = await this.dealReasonRepository.count();
    if (reasonCount === 0) {
      const defaultReasons = [
        { name: 'Price', color: '#f59e0b', order: 1, type: 'lost', isDefault: true },
        { name: 'Competition', color: '#ef4444', order: 2, type: 'lost' },
        { name: 'No Budget', color: '#dc2626', order: 3, type: 'lost' },
        { name: 'No Decision', color: '#6b7280', order: 4, type: 'lost' },
        { name: 'Bad Fit', color: '#a855f7', order: 5, type: 'lost' },
        { name: 'Timeline', color: '#3b82f6', order: 6, type: 'lost' },
        { name: 'Won - Best Value', color: '#22c55e', order: 1, type: 'win' },
        { name: 'Won - Best Product', color: '#22c55e', order: 2, type: 'win' },
        { name: 'Won - Relationship', color: '#22c55e', order: 3, type: 'win' },
        { name: 'Won - Timing', color: '#22c55e', order: 4, type: 'win' },
      ];
      for (const reason of defaultReasons) {
        await this.dealReasonRepository.save(reason);
      }
    }
  }

  async findAll(): Promise<Deal[]> {
    return this.dealRepository.find({ relations: ['stage', 'reason'] });
  }

  async findByContact(contactId: number): Promise<Deal[]> {
    return this.dealRepository.find({
      where: { contactId },
      relations: ['stage', 'reason'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByAccount(accountId: number): Promise<Deal[]> {
    return this.dealRepository.find({
      where: { accountId },
      relations: ['stage', 'reason'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByLead(leadId: number): Promise<Deal[]> {
    return this.dealRepository.find({
      where: { leadId },
      relations: ['stage', 'reason'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Deal> {
    const deal = await this.dealRepository.findOne({ where: { id }, relations: ['stage', 'reason'] });
    if (!deal) throw new NotFoundException('Deal not found');
    return deal;
  }

  async create(data: Partial<Deal>, actorUserId?: number): Promise<Deal> {
    const deal = this.dealRepository.create({
      ...data,
      daysInStage: 0,
    });
    const saved = await this.dealRepository.save(deal);
    const hydrated = await this.findOne(saved.id);
    await this.automationsService.processEvent('deal', 'created', hydrated, actorUserId);
    return hydrated;
  }

  async update(id: number, data: Partial<Deal>, actorUserId?: number): Promise<Deal> {
    const deal = await this.findOne(id);
    
    // Clear relations if their ID columns are being updated to avoid persistence conflicts
    if (data.dealStageId !== undefined && deal.stage && deal.stage.id !== data.dealStageId) {
      deal.stage = null;
    }
    if (data.dealReasonId !== undefined && deal.reason && deal.reason.id !== data.dealReasonId) {
      deal.reason = null;
    }
    if (data.ownerId !== undefined && deal.owner && deal.owner.id !== data.ownerId) {
      deal.owner = null;
    }
    if (data.leadId !== undefined && deal.lead && deal.lead.id !== data.leadId) {
      deal.lead = null;
    }
    if (data.accountId !== undefined && deal.account && deal.account.id !== data.accountId) {
      deal.account = null;
    }
    if (data.contactId !== undefined && deal.contactEntity && deal.contactEntity.id !== data.contactId) {
      deal.contactEntity = null;
    }

    Object.assign(deal, data);
    await this.dealRepository.save(deal);
    const updated = await this.findOne(id);
    await this.automationsService.processEvent('deal', 'updated', updated, actorUserId);
    return updated;
  }

  async delete(id: number): Promise<void> {
    const deal = await this.findOne(id);
    await this.dealRepository.remove(deal);
  }

  // DealStage CRUD
  async getStages(): Promise<DealStage[]> {
    return this.dealStageRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async createStage(name: string, color?: string): Promise<DealStage> {
    const maxOrder = await this.dealStageRepository
      .createQueryBuilder('stage')
      .select('MAX(stage.order)', 'max')
      .getRawOne();
    return this.dealStageRepository.save({ 
      name, 
      color, 
      order: (maxOrder?.max || 0) + 1, 
      isActive: true 
    });
  }

  async updateStage(id: number, data: Partial<DealStage>): Promise<DealStage> {
    const stage = await this.dealStageRepository.findOne({ where: { id } });
    if (!stage) throw new NotFoundException('Stage not found');
    Object.assign(stage, data);
    return this.dealStageRepository.save(stage);
  }

  async deleteStage(id: number): Promise<void> {
    const stage = await this.dealStageRepository.findOne({ where: { id } });
    if (!stage) throw new NotFoundException('Stage not found');
    await this.dealStageRepository.remove(stage);
  }

  // DealReason CRUD
  async getReasons(type?: string): Promise<DealReason[]> {
    const where = type ? { isActive: true, type } : { isActive: true };
    return this.dealReasonRepository.find({ where, order: { order: 'ASC' } });
  }

  async createReason(name: string, color?: string, type?: string): Promise<DealReason> {
    const maxOrder = await this.dealReasonRepository
      .createQueryBuilder('reason')
      .select('MAX(reason.order)', 'max')
      .getRawOne();
    return this.dealReasonRepository.save({ 
      name, 
      color, 
      type: type || 'lost',
      order: (maxOrder?.max || 0) + 1, 
      isActive: true 
    });
  }

  async updateReason(id: number, data: Partial<DealReason>): Promise<DealReason> {
    const reason = await this.dealReasonRepository.findOne({ where: { id } });
    if (!reason) throw new NotFoundException('Reason not found');
    Object.assign(reason, data);
    return this.dealReasonRepository.save(reason);
  }

  async deleteReason(id: number): Promise<void> {
    const reason = await this.dealReasonRepository.findOne({ where: { id } });
    if (!reason) throw new NotFoundException('Reason not found');
    await this.dealReasonRepository.remove(reason);
  }
}
