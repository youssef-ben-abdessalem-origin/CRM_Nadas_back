import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lead } from '../../leads/entities/lead.entity';
import { DealStage } from './deal-stage.entity';
import { DealReason } from './deal-reason.entity';

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

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
