import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from '../deals/entities/deal.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { DealStage } from '../deals/entities/deal-stage.entity';
import { Campaign } from '../campaigns/entities/campaign.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(DealStage)
    private readonly dealStageRepository: Repository<DealStage>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async getStats() {
    // 1. Total Revenue (Value of all 'Closed Won' deals)
    const wonDeals = await this.dealRepository.find({
      where: { stage: { name: 'Closed Won' } },
    });
    const totalRevenue = wonDeals.reduce((sum, deal) => sum + (Number(deal.value) || 0), 0);

    // 2. Active Deals Count (Deals not in 'Closed Won' or 'Closed Lost')
    const activeDealsCount = await this.dealRepository.createQueryBuilder('deal')
      .leftJoin('deal.stage', 'stage')
      .where('stage.name NOT IN (:...terminalStages)', { terminalStages: ['Closed Won', 'Closed Lost'] })
      .getCount();

    // 3. Total Contacts Count
    const totalContactsCount = await this.contactRepository.count();

    // 4. Total Campaigns Count
    const totalCampaignsCount = await this.campaignRepository.count();

    // 5. Conversion Rate (Won Deals / Total Deals with terminal status)
    const totalTerminalDeals = await this.dealRepository.createQueryBuilder('deal')
      .leftJoin('deal.stage', 'stage')
      .where('stage.name IN (:...terminalStages)', { terminalStages: ['Closed Won', 'Closed Lost'] })
      .getCount();
    
    const conversionRate = totalTerminalDeals > 0 
      ? (wonDeals.length / totalTerminalDeals) * 100 
      : 0;

    // 5. Comparing with last month for "changes" (simplified for now as +0)
    // In a real app we would query (createdAt BETWEEN now-30d AND now) vs (createdAt BETWEEN now-60d AND now-30d)

    return {
      totalRevenue,
      activeDealsCount,
      totalContactsCount,
      totalCampaignsCount,
      conversionRate: Number.parseFloat(conversionRate.toFixed(1)),
      revenueChange: "+12.5%", // Mocked for UI
      activeDealsChange: "+8 new", // Mocked
      contactsChange: "+124", // Mocked
      campaignsChange: "+4", // Mocked
      conversionChange: "-1.2%", // Mocked
    };
  }

  async getChartsData() {
    // In a real app, we'd aggregate by month
    // For now, let's return the structured data the frontend expects
    const revenueData = [
      { month: "Jan", revenue: 42000 },
      { month: "Feb", revenue: 53000 },
      { month: "Mar", revenue: 48000 },
      { month: "Apr", revenue: 61000 },
      { month: "May", revenue: 55000 },
      { month: "Jun", revenue: 72000 },
      { month: "Jul", revenue: 68000 },
      { month: "Aug", revenue: 81000 },
    ];

    const dealsData = [
      { month: "Jan", won: 12, lost: 4 },
      { month: "Feb", won: 18, lost: 6 },
      { month: "Mar", won: 15, lost: 3 },
      { month: "Apr", won: 22, lost: 5 },
      { month: "May", won: 19, lost: 7 },
      { month: "Jun", won: 28, lost: 4 },
      { month: "Jul", won: 25, lost: 6 },
      { month: "Aug", won: 31, lost: 3 },
    ];

    return {
      revenueData,
      dealsData
    };
  }

  async getRecentActivities() {
    // Recent deals, contacts, leads
    const [recentDeals, recentLeads] = await Promise.all([
      this.dealRepository.find({ order: { createdAt: 'DESC' }, take: 5, relations: ['stage'] }),
      this.leadRepository.find({ order: { createdAt: 'DESC' }, take: 5 }),
      this.contactRepository.find({ order: { id: 'DESC' }, take: 5 }),
    ]);

    const activities = [];

    recentDeals.forEach(deal => {
      const stageName = deal.stage?.name;
      const stageText = stageName ? `in ${stageName}` : 'created';
      activities.push({
        id: `deal-${deal.id}`,
        type: 'deal',
        text: `New deal "${deal.name}" ${stageText}`,
        time: this.formatTimeAgo(deal.createdAt),
        timestamp: deal.createdAt.getTime()
      });
    });

    recentLeads.forEach(lead => {
      activities.push({
        id: `lead-${lead.id}`,
        type: 'contact',
        text: `New lead from ${lead.company || 'website'}: ${lead.name}`,
        time: this.formatTimeAgo(lead.createdAt),
        timestamp: lead.createdAt.getTime()
      });
    });

    // Sort combined activities by timestamp
    return [...activities]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);
  }

  private formatTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
