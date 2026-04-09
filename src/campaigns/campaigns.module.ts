import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';
import { CampaignType } from './entities/campaign-type.entity';
import { CampaignStatus } from './entities/campaign-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, CampaignType, CampaignStatus])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [CampaignsService],
})
export class CampaignsModule {}
