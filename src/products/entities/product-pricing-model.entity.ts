import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_pricing_models')
export class ProductPricingModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
