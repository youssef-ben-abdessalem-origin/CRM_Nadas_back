import { Injectable, NotFoundException, OnModuleInit, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { LeadSource } from './entities/lead-source.entity';
import { PipelineStage } from './entities/pipeline-stage.entity';
import { LeadScoreCategory } from './entities/lead-score-category.entity';
import { LeadPriority } from './entities/lead-priority.entity';
import { QualificationStage } from './entities/qualification-stage.entity';
import { AccountsService } from '../accounts/accounts.service';
import { ContactsService } from '../contacts/contacts.service';
import { DealsService } from '../deals/deals.service';
import { DealStage } from '../deals/entities/deal-stage.entity';
import { ContactStatus } from '../contacts/entities/contact-status.entity';
import { ContactTier } from '../contacts/entities/contact-tier.entity';
import { AutomationsService } from '../automations/automations.service';

@Injectable()
export class LeadsService implements OnModuleInit {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(LeadSource)
    private readonly leadSourceRepository: Repository<LeadSource>,
    @InjectRepository(PipelineStage)
    private readonly pipelineStageRepository: Repository<PipelineStage>,
    @InjectRepository(LeadScoreCategory)
    private readonly scoreCategoryRepository: Repository<LeadScoreCategory>,
    @InjectRepository(LeadPriority)
    private readonly priorityRepository: Repository<LeadPriority>,
    @InjectRepository(QualificationStage)
    private readonly qualificationStageRepository: Repository<QualificationStage>,
    @InjectRepository(ContactStatus)
    private readonly contactStatusRepository: Repository<ContactStatus>,
    @InjectRepository(ContactTier)
    private readonly contactTierRepository: Repository<ContactTier>,
    @InjectRepository(DealStage)
    private readonly dealStageRepository: Repository<DealStage>,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
    @Inject(forwardRef(() => ContactsService))
    private readonly contactsService: ContactsService,
    @Inject(forwardRef(() => DealsService))
    private readonly dealsService: DealsService,
    private readonly automationsService: AutomationsService,
  ) {}

  async onModuleInit() {
    await this.seedDefaultData();
  }

  private async seedDefaultData() {
    const sourcesCount = await this.leadSourceRepository.count();
    if (sourcesCount === 0) {
      const defaultSources = ['Website', 'LinkedIn', 'Referral', 'Cold Call', 'Trade Show', 'Google Ads', 'Email Campaign'];
      for (const name of defaultSources) {
        await this.leadSourceRepository.save({ name, isActive: true });
      }
    }

    const stagesCount = await this.pipelineStageRepository.count();
    if (stagesCount === 0) {
      const defaultStages = [
        { name: 'New', order: 1, isDefault: true },
        { name: 'Contacted', order: 2 },
        { name: 'Qualified', order: 3 },
        { name: 'Unqualified', order: 4 },
      ];
      for (const stage of defaultStages) {
        await this.pipelineStageRepository.save(stage);
      }
    }

    const scoresCount = await this.scoreCategoryRepository.count();
    if (scoresCount === 0) {
      const defaultScores = [
        { name: 'Hot', color: '#ef4444', order: 1 },
        { name: 'Warm', color: '#f59e0b', order: 2 },
        { name: 'Cold', color: '#3b82f6', order: 3 },
      ];
      for (const score of defaultScores) {
        await this.scoreCategoryRepository.save(score);
      }
    }

    const prioritiesCount = await this.priorityRepository.count();
    if (prioritiesCount === 0) {
      const defaultPriorities = [
        { name: 'Low', color: '#6b7280', order: 1 },
        { name: 'Medium', color: '#3b82f6', order: 2 },
        { name: 'High', color: '#f59e0b', order: 3 },
        { name: 'Urgent', color: '#ef4444', order: 4 },
      ];
      for (const priority of defaultPriorities) {
        await this.priorityRepository.save(priority);
      }
    }

    const qualificationsCount = await this.qualificationStageRepository.count();
    if (qualificationsCount === 0) {
      const defaultQualifications = [
        { name: 'Not Qualified', order: 1 },
        { name: 'In Progress', order: 2 },
        { name: 'Qualified', order: 3 },
      ];
      for (const qual of defaultQualifications) {
        await this.qualificationStageRepository.save(qual);
      }
    }
  }

  async findAll(): Promise<Lead[]> {
    return this.leadRepository.find({ 
      relations: ['source', 'stage', 'scoreCategory', 'priority', 'qualificationStage', 'owner', 'account'] 
    });
  }

  async findAllPaginated(page = 1, limit = 10, search?: string, stageId?: number): Promise<{ data: Lead[]; total: number; page: number; limit: number; totalPages: number }> {
    const queryBuilder = this.leadRepository.createQueryBuilder('lead')
      .leftJoinAndSelect('lead.owner', 'owner')
      .leftJoinAndSelect('lead.source', 'source')
      .leftJoinAndSelect('lead.stage', 'stage')
      .leftJoinAndSelect('lead.scoreCategory', 'scoreCategory')
      .leftJoinAndSelect('lead.priority', 'priority')
      .leftJoinAndSelect('lead.qualificationStage', 'qualificationStage');

    if (search) {
      queryBuilder.andWhere(
        '(lead.name ILIKE :search OR lead.emails::text ILIKE :search OR lead.company ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (stageId) {
      queryBuilder.andWhere('lead.stageId = :stageId', { stageId });
    }

    // Hide converted leads from the main list by default
    queryBuilder.andWhere('lead.isConverted = :isConverted', { isConverted: false });

    const total = await queryBuilder.getCount();
    const data = await queryBuilder
      .orderBy('lead.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Lead> {
    const lead = await this.leadRepository.findOne({ 
      where: { id }, 
      relations: ['source', 'stage', 'scoreCategory', 'priority', 'qualificationStage', 'owner', 'account'] 
    });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async create(data: Partial<Lead>, actorUserId?: number): Promise<Lead> {
    const leadData: Partial<Lead> = { ...data };
    leadData.lastActivity = 'Just now';

    if (leadData.priorityId) {
      const priority = await this.priorityRepository.findOne({ where: { id: leadData.priorityId } });
      if (!priority) throw new NotFoundException('Priority not found');
    }
    
    if (leadData.stageId && !(await this.pipelineStageRepository.findOne({ where: { id: leadData.stageId } }))) {
      throw new NotFoundException('Stage not found');
    }

    // Handle account: only link to existing if possible, do NOT create new automatically
    if (leadData.accountId) {
      // Link to existing account by ID
      const account = await this.accountsService.findOne(leadData.accountId);
      leadData.accountId = account.id;
    } else if (leadData.company) {
      // Check if account with same name exists to link automatically
      const existingAccounts = await this.accountsService.findAll();
      const existingAccount = existingAccounts.find(a => a.name.toLowerCase() === leadData.company.toLowerCase());
      
      if (existingAccount) {
        // Link to existing account
        leadData.accountId = existingAccount.id;
      }
    }

    const lead = this.leadRepository.create(leadData);
    const savedLead = await this.leadRepository.save(lead);
    const hydrated = await this.findOne(savedLead.id);
    await this.automationsService.processEvent('lead', 'created', hydrated, actorUserId);
    return hydrated;
  }

  async update(id: number, data: Partial<Lead>, actorUserId?: number): Promise<Lead> {
    const lead = await this.findOne(id);
    const wasWon = lead.stage?.name?.toLowerCase().includes('won');
    const wasLost = lead.stage?.name?.toLowerCase().includes('unqualified') || lead.stage?.name?.toLowerCase().includes('lost');
    const isNowWon = data.stageId && (await this.pipelineStageRepository.findOne({ where: { id: data.stageId } }))?.name?.toLowerCase().includes('won');
    const isNowLost = data.stageId && (await this.pipelineStageRepository.findOne({ where: { id: data.stageId } }))?.name?.toLowerCase().includes('unqualified') || (data.stageId && (await this.pipelineStageRepository.findOne({ where: { id: data.stageId } }))?.name?.toLowerCase().includes('lost'));
    
    const updateData: any = {
      ...data,
      lastActivity: 'Just now',
    };

    // Set lostAt timestamp when lead becomes lost
    if (!wasLost && isNowLost) {
      updateData.lostAt = new Date();
    }

    await this.leadRepository.update(id, updateData);

    if (!wasWon && isNowWon) {
      const wonStage = await this.pipelineStageRepository.findOne({ where: { name: 'Closed Won' } });
      await this.dealsService.create({
        name: `${lead.name} - Deal`,
        company: lead.company,
        value: lead.value,
        contact: lead.emails?.[0] || lead.email,
        leadId: lead.id,
        dealStageId: wonStage?.id,
        notes: `Created from lead: ${lead.name}. ${lead.notes || ''}`,
      });
    }
    
    const updated = await this.findOne(id);
    await this.automationsService.processEvent('lead', 'updated', updated, actorUserId);
    return updated;
  }

  async delete(id: number): Promise<void> {
    const lead = await this.findOne(id);
    await this.leadRepository.remove(lead);
  }

  async bulkDelete(ids: number[]): Promise<void> {
    await this.leadRepository.delete(ids);
  }

  async bulkUpdate(ids: number[], updates: Partial<Lead>): Promise<Lead[]> {
    await this.leadRepository.update(ids, updates);
    return this.findByIds(ids);
  }

  async findByIds(ids: number[]): Promise<Lead[]> {
    if (ids.length === 0) return [];
    return this.leadRepository.find({ where: { id: In(ids) } });
  }

  async getSources(): Promise<LeadSource[]> {
    return this.leadSourceRepository.find({ where: { isActive: true } });
  }

  async getStages(): Promise<PipelineStage[]> {
    return this.pipelineStageRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async getScores(): Promise<LeadScoreCategory[]> {
    return this.scoreCategoryRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async getPriorities(): Promise<LeadPriority[]> {
    return this.priorityRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async getQualifications(): Promise<QualificationStage[]> {
    return this.qualificationStageRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async createSource(name: string): Promise<LeadSource> {
    return this.leadSourceRepository.save({ name, isActive: true });
  }

  async createStage(name: string, order?: number): Promise<PipelineStage> {
    const maxOrder = await this.pipelineStageRepository
      .createQueryBuilder('stage')
      .select('MAX(stage.order)', 'max')
      .getRawOne();
    return this.pipelineStageRepository.save({ name, order: order ?? (maxOrder?.max || 0) + 1, isActive: true });
  }

  async createScore(name: string, color?: string): Promise<LeadScoreCategory> {
    const maxOrder = await this.scoreCategoryRepository
      .createQueryBuilder('score')
      .select('MAX(score.order)', 'max')
      .getRawOne();
    return this.scoreCategoryRepository.save({ name, color, order: (maxOrder?.max || 0) + 1, isActive: true });
  }

  async createPriority(name: string, color?: string): Promise<LeadPriority> {
    const maxOrder = await this.priorityRepository
      .createQueryBuilder('priority')
      .select('MAX(priority.order)', 'max')
      .getRawOne();
    return this.priorityRepository.save({ name, color, order: (maxOrder?.max || 0) + 1, isActive: true });
  }

  async createQualification(name: string): Promise<QualificationStage> {
    const maxOrder = await this.qualificationStageRepository
      .createQueryBuilder('qual')
      .select('MAX(qual.order)', 'max')
      .getRawOne();
    return this.qualificationStageRepository.save({ name, order: (maxOrder?.max || 0) + 1, isActive: true });
  }

  async updateSource(id: number, data: Partial<LeadSource>): Promise<LeadSource> {
    const source = await this.leadSourceRepository.findOne({ where: { id } });
    if (!source) throw new NotFoundException('Source not found');
    Object.assign(source, data);
    return this.leadSourceRepository.save(source);
  }

  async deleteSource(id: number): Promise<void> {
    const source = await this.leadSourceRepository.findOne({ where: { id } });
    if (!source) throw new NotFoundException('Source not found');
    await this.leadSourceRepository.remove(source);
  }

  async updateStage(id: number, data: Partial<PipelineStage>): Promise<PipelineStage> {
    const stage = await this.pipelineStageRepository.findOne({ where: { id } });
    if (!stage) throw new NotFoundException('Stage not found');
    Object.assign(stage, data);
    return this.pipelineStageRepository.save(stage);
  }

  async deleteStage(id: number): Promise<void> {
    const stage = await this.pipelineStageRepository.findOne({ where: { id } });
    if (!stage) throw new NotFoundException('Stage not found');
    await this.pipelineStageRepository.remove(stage);
  }

  async updateScore(id: number, data: Partial<LeadScoreCategory>): Promise<LeadScoreCategory> {
    const score = await this.scoreCategoryRepository.findOne({ where: { id } });
    if (!score) throw new NotFoundException('Score not found');
    Object.assign(score, data);
    return this.scoreCategoryRepository.save(score);
  }

  async deleteScore(id: number): Promise<void> {
    const score = await this.scoreCategoryRepository.findOne({ where: { id } });
    if (!score) throw new NotFoundException('Score not found');
    await this.scoreCategoryRepository.remove(score);
  }

  async updatePriority(id: number, data: Partial<LeadPriority>): Promise<LeadPriority> {
    const priority = await this.priorityRepository.findOne({ where: { id } });
    if (!priority) throw new NotFoundException('Priority not found');
    Object.assign(priority, data);
    return this.priorityRepository.save(priority);
  }

  async deletePriority(id: number): Promise<void> {
    const priority = await this.priorityRepository.findOne({ where: { id } });
    if (!priority) throw new NotFoundException('Priority not found');
    await this.priorityRepository.remove(priority);
  }

  async updateQualification(id: number, data: Partial<QualificationStage>): Promise<QualificationStage> {
    const qualification = await this.qualificationStageRepository.findOne({ where: { id } });
    if (!qualification) throw new NotFoundException('Qualification not found');
    Object.assign(qualification, data);
    return this.qualificationStageRepository.save(qualification);
  }

  async deleteQualification(id: number): Promise<void> {
    const qualification = await this.qualificationStageRepository.findOne({ where: { id } });
    if (!qualification) throw new NotFoundException('Qualification not found');
    await this.qualificationStageRepository.remove(qualification);
  }

  async getAllSources(includeInactive = false): Promise<LeadSource[]> {
    return this.leadSourceRepository.find({ where: includeInactive ? {} : { isActive: true } });
  }

  async getAllStages(includeInactive = false): Promise<PipelineStage[]> {
    return this.pipelineStageRepository.find({ where: includeInactive ? {} : { isActive: true }, order: { order: 'ASC' } });
  }

  async getAllScores(includeInactive = false): Promise<LeadScoreCategory[]> {
    return this.scoreCategoryRepository.find({ where: includeInactive ? {} : { isActive: true }, order: { order: 'ASC' } });
  }

  async getAllPriorities(includeInactive = false): Promise<LeadPriority[]> {
    return this.priorityRepository.find({ where: includeInactive ? {} : { isActive: true }, order: { order: 'ASC' } });
  }

  async getAllQualifications(includeInactive = false): Promise<QualificationStage[]> {
    return this.qualificationStageRepository.find({ where: includeInactive ? {} : { isActive: true }, order: { order: 'ASC' } });
  }

  async convert(id: number, options?: { ownerId?: number; createDeal?: boolean }): Promise<{ lead: Lead; accountId: number; contactId: number; dealId?: number }> {
    const lead = await this.findOne(id);
    
    if (lead.isConverted) {
      throw new Error('Lead is already converted');
    }

    const ownerId = options?.ownerId || lead.ownerId;

    // Find or create Account from company name
    let accountId: number;
    if (lead.company) {
      const existingAccount = await this.accountsService.findAll().then(accounts => 
        accounts.find(a => a.name.toLowerCase() === lead.company.toLowerCase())
      );
      
      if (existingAccount) {
        accountId = existingAccount.id;
      } else {
        const account = await this.accountsService.create({
          name: lead.company,
          website: lead.website,
          industry: lead.industry,
          location: lead.location,
          ownerId: ownerId,
        });
        accountId = Array.isArray(account) ? account[0].id : account.id;
      }
    } else {
      // Create a generic account if no company
      const account = await this.accountsService.create({
        name: lead.name + "'s Company",
        industry: lead.industry,
        location: lead.location,
        ownerId: ownerId,
      });
      accountId = Array.isArray(account) ? account[0].id : account.id;
    }

    // Get default contact status and tier
    const defaultStatus = await this.contactStatusRepository.findOne({ where: { isDefault: true } });
    const defaultTier = await this.contactTierRepository.find({ order: { order: 'ASC' }, take: 1 }).then(tiers => tiers[0]);

    // Create Contact linked to Account
    const contact = await this.contactsService.create({
      name: lead.name,
      email: lead.emails?.[0] || lead.email,
      phone: lead.phones?.[0] || lead.phone,
      title: lead.title,
      company: lead.company,
      account: { id: accountId } as any,
      contactStatusId: defaultStatus?.id,
      contactTierId: defaultTier?.id,
      dealValue: lead.value || 0,
      industry: lead.industry,
      location: lead.location,
      website: lead.website,
      notes: lead.notes,
      ownerId: ownerId,
    } as any);
    const contactId = Array.isArray(contact) ? contact[0].id : contact.id;

    // Create Deal if requested
    let dealId: number | undefined;
    if (options?.createDeal) {
      // Get default deal stage or the first one available
      let defaultStage = await this.dealStageRepository.findOne({ where: { isDefault: true } });
      if (!defaultStage) {
        defaultStage = await this.dealStageRepository.findOne({ where: { isActive: true }, order: { order: 'ASC' } });
      }

      const deal = await this.dealsService.create({
        name: `${lead.name} - Deal`,
        company: lead.company,
        value: lead.value || 0,
        contact: lead.email || (lead.emails && lead.emails[0]) || '',
        leadId: lead.id,
        dealStageId: defaultStage?.id || 1,
        notes: `Created from lead conversion: ${lead.name}.`,
        ownerId: ownerId,
        accountId: accountId,
        contactId: contactId,
      });
      dealId = deal.id;
    }

    // Mark lead as converted using direct update to ensure persistence
    await this.leadRepository.update(id, {
      isConverted: true,
      status: 'converted',
      convertedAt: new Date(),
      convertedAccountId: accountId,
      convertedContactId: contactId,
      ownerId: ownerId, // Update owner as well if changed
    });

    const updatedLead = await this.findOne(id);

    return {
      lead: updatedLead,
      accountId: accountId,
      contactId: contactId,
      dealId: dealId,
    };
  }

  async convertToDeal(id: number, options?: { ownerId?: number }): Promise<{ dealId: number }> {
    const lead = await this.findOne(id);
    
    if (lead.isConverted) {
      throw new Error('Lead is already converted');
    }

    const ownerId = options?.ownerId || lead.ownerId;

    // Get default deal stage or the first one available
    let defaultStage = await this.dealStageRepository.findOne({ where: { isDefault: true } });
    if (!defaultStage) {
      defaultStage = await this.dealStageRepository.findOne({ where: { isActive: true }, order: { order: 'ASC' } });
    }

    // Create a deal from the lead
    const deal = await this.dealsService.create({
      name: `${lead.name} - Deal`,
      company: lead.company,
      value: lead.value || 0,
      contact: lead.email || (lead.emails && lead.emails[0]) || '',
      leadId: lead.id,
      dealStageId: defaultStage?.id || 1, // Fallback to 1 if totally missing
      notes: `Created from lead: ${lead.name}. ${lead.notes || ''}`,
      ownerId: ownerId,
    });

    // Mark lead as converted using direct update to ensure persistence
    await this.leadRepository.update(id, {
      isConverted: true,
      status: 'converted',
      convertedAt: new Date(),
      ownerId: ownerId,
    });

    return {
      dealId: deal.id,
    };
  }
}
