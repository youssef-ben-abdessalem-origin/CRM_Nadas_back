import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { AccountType } from './entities/account-type.entity';
import { AccountStatus } from './entities/account-status.entity';
import { AccountTier } from './entities/account-tier.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { ContactStatus } from '../contacts/entities/contact-status.entity';
import { ContactTier } from '../contacts/entities/contact-tier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountType, AccountStatus, AccountTier, Contact, ContactStatus, ContactTier])],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService],
})
export class AccountsModule {}
