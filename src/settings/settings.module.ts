import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { Currency } from './entities/currency.entity';
import { Country } from './entities/country.entity';
import { Industry } from './entities/industry.entity';
import { Tag } from './entities/tag.entity';
import { ActivityType } from './entities/activity-type.entity';
import { EmailTemplate } from './entities/email-template.entity';
import { Notification } from './entities/notification.entity';
import { AuditLog } from './entities/audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Currency, Country, Industry, Tag, ActivityType, EmailTemplate, Notification, AuditLog])],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
