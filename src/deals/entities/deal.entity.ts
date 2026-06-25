import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lead } from '../../leads/entities/lead.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { DealStage } from './deal-stage.entity';
import { DealReason } from './deal-reason.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';

@Entity('deals')
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  company: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  value: number;

  @Column({ nullable: true })
  contact: string;

  @Column({ type: 'int', nullable: true })
  probability: number;

  @Column({ type: 'int', nullable: true })
  daysInStage: number;

  @Column({ type: 'date', nullable: true })
  expectedCloseDate: Date;

  @ManyToOne(() => DealStage, { nullable: true, eager: true })
  @JoinColumn({ name: 'dealStageId' })
  stage: DealStage;

  @Column({ nullable: true })
  dealStageId: number;

  @ManyToOne(() => DealReason, { nullable: true, eager: true })
  @JoinColumn({ name: 'dealReasonId' })
  reason: DealReason;

  @Column({ nullable: true })
  dealReasonId: number;

  @ManyToOne(() => Lead, { nullable: true })
  @JoinColumn({ name: 'leadId' })
  lead: Lead;

  @Column({ nullable: true })
  leadId: number;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column({ nullable: true })
  accountId: number;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'contactId' })
  contactEntity: Contact;

  @Column({ nullable: true })
  contactId: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: true })
  ownerId: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Campaign, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaign;

  @Column({ nullable: true })
  campaignId: number;
}
