import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { ContactStatus as ContactStatusEntity } from './contact-status.entity';
import { ContactTier as ContactTierEntity } from './contact-tier.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => ContactStatusEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'contactStatusId' })
  contactStatus: ContactStatusEntity;

  @Column({ nullable: true })
  contactStatusId: number;

  @ManyToOne(() => ContactTierEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'contactTierId' })
  contactTier: ContactTierEntity;

  @Column({ nullable: true })
  contactTierId: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  dealValue: number;

  @Column({ nullable: true })
  lastContact: string;

  @Column({ nullable: true })
  created: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'int', default: 0 })
  dealsWon: number;

  @Column({ type: 'int', default: 0 })
  dealsTotal: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  revenueTotal: number;

  @Column({ nullable: true })
  avatar: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'accountId' })
  account: Account;
}
