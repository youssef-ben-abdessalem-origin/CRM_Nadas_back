import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lead } from './lead.entity';

@Entity('qualification_stages')
export class QualificationStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Lead, (lead) => lead.qualificationStage)
  leads: Lead[];
}
