import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CampaignType } from './entities/campaign-type.entity';
import { CampaignStatus } from './entities/campaign-status.entity';

@Injectable()
export class CampaignsService implements OnModuleInit {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(CampaignType)
    private readonly campaignTypeRepository: Repository<CampaignType>,
    @InjectRepository(CampaignStatus)
    private readonly campaignStatusRepository: Repository<CampaignStatus>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultData();
  }

  private async seedDefaultData() {
    const typeCount = await this.campaignTypeRepository.count();
    if (typeCount === 0) {
      const types = [
        { name: 'Conference', order: 1 },
        { name: 'Webinar', order: 2 },
        { name: 'Trade Show', order: 3 },
        { name: 'Public Relations', order: 4 },
        { name: 'Partners', order: 5 },
        { name: 'Referral Program', order: 6 },
        { name: 'Advertisement', order: 7 },
        { name: 'Banner Ads', order: 8 },
        { name: 'Direct mail', order: 9 },
        { name: 'Email', order: 10 },
        { name: 'Telemarketing', order: 11 },
        { name: 'Others', order: 12 },
      ];
      for (const t of types) {
        await this.campaignTypeRepository.save(t);
      }
    }

    const statusCount = await this.campaignStatusRepository.count();
    if (statusCount === 0) {
      const statuses = [
        { name: 'Planning', order: 1 },
        { name: 'Active', order: 2 },
        { name: 'Inactive', order: 3 },
        { name: 'Complete', order: 4 },
      ];
      for (const s of statuses) {
        await this.campaignStatusRepository.save(s);
      }
    }
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignRepository.find({ relations: ['owner', 'campaignType', 'status'] });
  }

  async findOne(id: number): Promise<Campaign> {
    const campaign = await this.campaignRepository.findOne({ 
      where: { id }, 
      relations: ['owner', 'campaignType', 'status'] 
    });
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  async create(data: Partial<Campaign>): Promise<Campaign> {
    const campaign = this.campaignRepository.create(data);
    return this.campaignRepository.save(campaign);
  }

  async update(id: number, data: Partial<Campaign>): Promise<Campaign> {
    const campaign = await this.findOne(id);
    Object.assign(campaign, data);
    return this.campaignRepository.save(campaign);
  }

  async delete(id: number): Promise<void> {
    const campaign = await this.findOne(id);
    await this.campaignRepository.remove(campaign);
  }

  async getTypes(): Promise<CampaignType[]> {
    return this.campaignTypeRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async getStatuses(): Promise<CampaignStatus[]> {
    return this.campaignStatusRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }
}
