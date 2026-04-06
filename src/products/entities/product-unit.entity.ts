import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_units')
export class ProductUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
