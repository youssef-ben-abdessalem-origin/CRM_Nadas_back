import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CampaignType } from './campaign-type.entity';
import { CampaignStatus } from './campaign-status.entity';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CampaignType, { nullable: true, eager: true })
  @JoinColumn({ name: 'campaignTypeId' })
  campaignType: CampaignType;

  @Column({ nullable: true })
  campaignTypeId: number;

  @ManyToOne(() => CampaignStatus, { nullable: true, eager: true })
  @JoinColumn({ name: 'statusId' })
  status: CampaignStatus;

  @Column({ nullable: true })
  statusId: number;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  expectedRevenue: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  budgetedCost: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  actualCost: number;

  @Column({ type: 'varchar', nullable: true })
  expectedResponse: string;

  @Column({ type: 'int', nullable: true })
  numbersSent: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: true })
  ownerId: number;

  @Column({ type: 'varchar', nullable: true, unique: true })
  campaignCode: string;

  @Column({ type: 'varchar', nullable: true })
  targetAudience: string;

  @Column({ type: 'varchar', nullable: true })
  communicationChannel: string;

  @Column({ type: 'varchar', nullable: true })
  objective: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  actualRevenue: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  actualResponse: number;

  @Column({ type: 'int', nullable: true })
  leadsGenerated: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  conversionRate: number;

  @Column({ type: 'jsonb', nullable: true })
  attachments: { url: string; name: string; type: string; uploadedAt: string }[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
