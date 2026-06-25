import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';
import { CampaignType } from './entities/campaign-type.entity';
import { CampaignStatus } from './entities/campaign-status.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Deal } from '../deals/entities/deal.entity';
import { Activity } from '../activities/entities/activity.entity';
import { GmailModule } from '../gmail/gmail.module';
import { LeadsModule } from '../leads/leads.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign, CampaignType, CampaignStatus, Lead, Deal, Activity]),
    GmailModule,
    LeadsModule,
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [CampaignsService],
})
export class CampaignsModule {}
