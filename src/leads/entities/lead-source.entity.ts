import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lead } from './lead.entity';

@Entity('lead_sources')
export class LeadSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Lead, (lead) => lead.source)
  leads: Lead[];
}
