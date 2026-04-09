import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Deal } from '../deals/entities/deal.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { DealStage } from '../deals/entities/deal-stage.entity';
import { Campaign } from '../campaigns/entities/campaign.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deal, Lead, Contact, DealStage, Campaign])
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
