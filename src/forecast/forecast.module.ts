import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForecastService } from './forecast.service';
import { ForecastController } from './forecast.controller';
import { ForecastPeriod } from './entities/forecast-period.entity';
import { ForecastTarget } from './entities/forecast-target.entity';
import { ForecastAdjustment } from './entities/forecast-adjustment.entity';
import { ForecastConfig } from './entities/forecast-config.entity';
import { ForecastStageMapping } from './entities/forecast-stage-mapping.entity';
import { ForecastSnapshot } from './entities/forecast-snapshot.entity';
import { Deal } from '../deals/entities/deal.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ForecastPeriod,
      ForecastTarget,
      ForecastAdjustment,
      ForecastConfig,
      ForecastStageMapping,
      ForecastSnapshot,
      Deal,
      User,
    ]),
  ],
  controllers: [ForecastController],
  providers: [ForecastService],
  exports: [ForecastService],
})
export class ForecastModule {}
