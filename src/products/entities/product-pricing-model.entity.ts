import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_pricing_models')
export class ProductPricingModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
