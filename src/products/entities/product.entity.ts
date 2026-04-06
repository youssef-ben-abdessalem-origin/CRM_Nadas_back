import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'Software' })
  category: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: 'one-time' })
  pricingModel: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  cost: number;

  @Column({ type: 'int', default: 0 })
  margin: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'int', default: 0 })
  reorderLevel: number;

  @Column({ default: 'unit' })
  unit: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taxRate: number;

  @Column({ type: 'simple-array', nullable: true })
  tags: string;

  @Column({ type: 'int', default: 0 })
  totalSold: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  totalRevenue: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  lastUpdated: Date;
}
