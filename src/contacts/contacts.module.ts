import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact } from './entities/contact.entity';
import { ContactStatus } from './entities/contact-status.entity';
import { ContactTier } from './entities/contact-tier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, ContactStatus, ContactTier])],
  providers: [ContactsService],
  controllers: [ContactsController],
  exports: [ContactsService],
})
export class ContactsModule {}
