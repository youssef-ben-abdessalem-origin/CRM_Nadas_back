import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('deal_reasons')
export class DealReason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ default: 'win' })
  type: string;
}
