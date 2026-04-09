import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('campaign_types')
export class CampaignType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  order: number;
}
