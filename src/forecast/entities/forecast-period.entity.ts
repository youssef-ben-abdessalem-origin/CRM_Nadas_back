import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum PeriodType {
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
}

export enum PeriodStatus {
  OPEN = 'OPEN',
  LOCKED = 'LOCKED',
  CLOSED = 'CLOSED',
}

@Entity('forecast_periods')
export class ForecastPeriod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: PeriodType,
    default: PeriodType.MONTH,
  })
  type: PeriodType;

  @Column({
    type: 'enum',
    enum: PeriodStatus,
    default: PeriodStatus.OPEN,
  })
  status: PeriodStatus;

  @CreateDateColumn()
  createdAt: Date;
}
