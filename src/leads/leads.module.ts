import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { Lead } from './entities/lead.entity';
import { LeadSource } from './entities/lead-source.entity';
import { PipelineStage } from './entities/pipeline-stage.entity';
import { LeadScoreCategory } from './entities/lead-score-category.entity';
import { LeadPriority } from './entities/lead-priority.entity';
import { QualificationStage } from './entities/qualification-stage.entity';
import { ContactStatus } from '../contacts/entities/contact-status.entity';
import { ContactTier } from '../contacts/entities/contact-tier.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lead,
      LeadSource,
      PipelineStage,
      LeadScoreCategory,
      LeadPriority,
      QualificationStage,
      ContactStatus,
      ContactTier,
    ]),
    forwardRef(() => AccountsModule),
    forwardRef(() => ContactsModule),
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
