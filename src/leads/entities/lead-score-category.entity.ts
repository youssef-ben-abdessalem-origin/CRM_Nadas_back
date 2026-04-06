import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lead } from './lead.entity';

@Entity('lead_score_categories')
export class LeadScoreCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  color: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Lead, (lead) => lead.scoreCategory)
  leads: Lead[];
}
