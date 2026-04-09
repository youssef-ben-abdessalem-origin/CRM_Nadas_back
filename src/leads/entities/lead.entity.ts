import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { LeadSource } from './lead-source.entity';
import { PipelineStage } from './pipeline-stage.entity';
import { LeadScoreCategory } from './lead-score-category.entity';
import { LeadPriority } from './lead-priority.entity';
import { QualificationStage } from './qualification-stage.entity';
import { Account } from '../../accounts/entities/account.entity';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  emails: string[];

  @Column({ type: 'jsonb', nullable: true })
  phones: string[];

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => LeadSource, { nullable: true, eager: true })
  @JoinColumn({ name: 'sourceId' })
  source: LeadSource;

  @Column({ nullable: true })
  sourceId: number;

  @ManyToOne(() => LeadScoreCategory, { nullable: true, eager: true })
  @JoinColumn({ name: 'scoreCategoryId' })
  scoreCategory: LeadScoreCategory;

  @Column({ nullable: true })
  scoreCategoryId: number;

  @ManyToOne(() => PipelineStage, { nullable: true, eager: true })
  @JoinColumn({ name: 'stageId' })
  stage: PipelineStage;

  @Column({ nullable: true })
  stageId: number;

  @ManyToOne(() => LeadPriority, { nullable: true, eager: true })
  @JoinColumn({ name: 'priorityId' })
  priority: LeadPriority;

  @Column({ nullable: true })
  priorityId: number;

  @ManyToOne(() => QualificationStage, { nullable: true, eager: true })
  @JoinColumn({ name: 'qualificationStageId' })
  qualificationStage: QualificationStage;

  @Column({ nullable: true })
  qualificationStageId: number;

  @Column({ default: 'active' })
  status: string;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: true })
  ownerId: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  value: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @Column({ type: 'date', nullable: true })
  nextFollowUp: Date;

  @Column({ nullable: true })
  lastActivity: string;

  @Column({ default: false })
  isConverted: boolean;

  @Column({ nullable: true })
  convertedAt: Date;

  @Column({ nullable: true })
  convertedAccountId: number;

  @Column({ nullable: true })
  convertedContactId: number;

  // Lost lead fields
  @Column({ nullable: true })
  lossReason: string;

  @Column({ type: 'text', nullable: true })
  lossNotes: string;

  @Column({ type: 'timestamp', nullable: true })
  lostAt: Date;

  @Column({ type: 'date', nullable: true })
  reengagementDate: Date;

  @ManyToOne(() => Account, { nullable: true, eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column({ nullable: true })
  accountId: number;

  @Column({ type: 'jsonb', nullable: true })
  attachments: { url: string; name: string; type: string; uploadedAt: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Legacy fields for compatibility during migration if needed
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  // Extended lead information
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  skypeId: string;

  @Column({ nullable: true })
  secondaryEmail: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  emailOptOut: boolean;

  @Column({ nullable: true })
  employees: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  annualRevenue: number;

  // Address fields
  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;
}
