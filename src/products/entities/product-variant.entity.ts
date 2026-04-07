import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { PriceBookItem } from './price-book-item.entity';
import { Inventory } from './inventory.entity';

export enum VariantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.variants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany('PriceBookItem', 'productVariant')
  prices: any[];

  @OneToMany('Inventory', 'variant')
  inventory: any[];

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  cost: number;

  @Column({ type: 'jsonb', nullable: true })
  attributes: any;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ type: 'varchar', length: 50, default: VariantStatus.ACTIVE })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
