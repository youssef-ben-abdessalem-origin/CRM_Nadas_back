import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ForecastPeriod } from './forecast-period.entity';

@Entity('forecast_snapshots')
export class ForecastSnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ForecastPeriod)
  @JoinColumn({ name: 'periodId' })
  period: ForecastPeriod;

  @Column()
  periodId: number;

  @Column({ type: 'json' })
  dataJson: any;

  @CreateDateColumn()
  createdAt: Date;
}
