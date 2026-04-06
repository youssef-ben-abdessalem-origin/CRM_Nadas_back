import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lead } from './lead.entity';

@Entity('pipeline_stages')
export class PipelineStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Lead, (lead) => lead.stage)
  leads: Lead[];
}
