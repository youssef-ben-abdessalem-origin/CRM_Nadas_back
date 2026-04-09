import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { DealStage } from '../../deals/entities/deal-stage.entity';

export enum ForecastCategory {
  PIPELINE = 'PIPELINE',
  BEST_CASE = 'BEST_CASE',
  COMMIT = 'COMMIT',
  CLOSED = 'CLOSED',
}

@Entity('forecast_stage_mapping')
export class ForecastStageMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stageName: string;

  @OneToOne(() => DealStage)
  @JoinColumn({ name: 'dealStageId' })
  dealStage: DealStage;

  @Column()
  dealStageId: number;

  @Column({
    type: 'enum',
    enum: ForecastCategory,
    default: ForecastCategory.PIPELINE,
  })
  category: ForecastCategory;
}
