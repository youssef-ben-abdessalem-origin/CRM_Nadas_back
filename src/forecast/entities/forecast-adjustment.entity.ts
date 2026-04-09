import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ForecastPeriod } from './forecast-period.entity';

@Entity('forecast_adjustments')
export class ForecastAdjustment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => ForecastPeriod)
  @JoinColumn({ name: 'periodId' })
  period: ForecastPeriod;

  @Column()
  periodId: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  commitOverride: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  bestCaseOverride: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: number;

  @CreateDateColumn()
  createdAt: Date;
}
