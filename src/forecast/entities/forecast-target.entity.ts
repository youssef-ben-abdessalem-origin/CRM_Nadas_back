import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ForecastPeriod } from './forecast-period.entity';

@Entity('forecast_targets')
export class ForecastTarget {
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

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  targetValue: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedById' })
  assignedBy: User;

  @Column({ nullable: true })
  assignedById: number;

  @CreateDateColumn()
  createdAt: Date;
}
