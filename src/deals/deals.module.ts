import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { Deal } from './entities/deal.entity';
import { DealStage } from './entities/deal-stage.entity';
import { DealReason } from './entities/deal-reason.entity';
import { AutomationsModule } from '../automations/automations.module';
import { Contact } from '../contacts/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deal, DealStage, DealReason, Contact]), AutomationsModule],
  providers: [DealsService],
  controllers: [DealsController],
  exports: [DealsService],
})
export class DealsModule {}
