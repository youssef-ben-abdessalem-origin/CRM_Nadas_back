import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { Deal } from './entities/deal.entity';
import { DealStage } from './entities/deal-stage.entity';
import { DealReason } from './entities/deal-reason.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deal, DealStage, DealReason])],
  providers: [DealsService],
  controllers: [DealsController],
  exports: [DealsService],
})
export class DealsModule {}
