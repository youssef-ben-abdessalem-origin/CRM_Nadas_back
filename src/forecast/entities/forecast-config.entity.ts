import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum ForecastModelType {
  TOP_DOWN = 'TOP_DOWN',
  BOTTOM_UP = 'BOTTOM_UP',
}

export enum HierarchyType {
  ROLE = 'ROLE',
  TERRITORY = 'TERRITORY',
}

export enum MetricType {
  REVENUE = 'REVENUE',
  QUANTITY = 'QUANTITY',
}

@Entity('forecast_config')
export class ForecastConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ForecastModelType,
    default: ForecastModelType.BOTTOM_UP,
  })
  modelType: ForecastModelType;

  @Column({
    type: 'enum',
    enum: HierarchyType,
    default: HierarchyType.ROLE,
  })
  hierarchyType: HierarchyType;

  @Column({
    type: 'enum',
    enum: MetricType,
    default: MetricType.REVENUE,
  })
  metricType: MetricType;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'simple-array', nullable: true })
  includedStages: string[];

  @CreateDateColumn()
  createdAt: Date;
}
