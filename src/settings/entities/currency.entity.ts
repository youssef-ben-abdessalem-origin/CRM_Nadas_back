import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true })
  symbolArabic: string;

  @Column({ nullable: true })
  symbolEnglish: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
