import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_tiers')
export class AccountTier {
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
}
