import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { Quote, Invoice, Payment, QuoteItem, InvoiceItem } from './entities/billing.entity';
import { ContactsModule } from '../contacts/contacts.module';
import { AccountsModule } from '../accounts/accounts.module';
import { DealsModule } from '../deals/deals.module';
import { GmailModule } from '../gmail/gmail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote, Invoice, Payment, QuoteItem, InvoiceItem]),
    ContactsModule,
    AccountsModule,
    DealsModule,
    GmailModule,
  ],
  providers: [BillingService],
  controllers: [BillingController],
  exports: [BillingService],
})
export class BillingModule {}
