import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AccountType } from './account-type.entity';
import { AccountStatus } from './account-status.entity';
import { AccountTier } from './account-tier.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  industry: string;

  @ManyToOne(() => AccountType, { nullable: true, eager: true })
  @JoinColumn({ name: 'accountTypeId' })
  type: AccountType;

  @Column({ nullable: true })
  accountTypeId: number;

  @ManyToOne(() => AccountStatus, { nullable: true, eager: true })
  @JoinColumn({ name: 'accountStatusId' })
  status: AccountStatus;

  @Column({ nullable: true })
  accountStatusId: number;

  @ManyToOne(() => AccountTier, { nullable: true, eager: true })
  @JoinColumn({ name: 'accountTierId' })
  tier: AccountTier;

  @Column({ nullable: true })
  accountTierId: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  annualRevenue: number;

  @Column({ type: 'int', nullable: true })
  employeeCount: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  created: string;

  @Column({ nullable: true })
  lastActivity: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  owner: string;

  @Column({ type: 'int', default: 0 })
  dealsCount: number;

  @Column({ type: 'int', default: 0 })
  contactsCount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  dealValue: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  revenueTotal: number;
}
