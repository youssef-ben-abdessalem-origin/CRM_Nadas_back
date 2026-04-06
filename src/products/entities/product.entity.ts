import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { ProductCategory } from './product-category.entity';
import { Brand } from './brand.entity';

export enum ProductType {
  SERVICE = 'SERVICE',
  PHYSICAL = 'PHYSICAL',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ProductType, default: ProductType.PHYSICAL })
  type: ProductType;

  @Column({ type: 'uuid', nullable: true })
  categoryId: string | null;

  @ManyToOne(() => ProductCategory, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory | null;

  @Column({ type: 'uuid', nullable: true })
  brandId: string | null;

  @ManyToOne(() => Brand, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'brandId' })
  brand: Brand | null;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isSellable: boolean;

  @Column({ default: true })
  isPurchasable: boolean;

  @OneToMany(() => ProductVariant, (variant) => variant.product, { cascade: true })
  variants: ProductVariant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
