import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { ProductCategory } from './product-category.entity';
import { Brand } from './brand.entity';
import { ProductMedia } from './product-media.entity';
import { ProductAttribute } from './product-attribute.entity';

export enum ProductType {
  SERVICE = 'service',
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
}

export enum ProductStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ unique: true, nullable: true })
  slug: string;

  @Column({ type: 'varchar', length: 50, default: 'physical' })
  type: string;

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

  @Column({ type: 'varchar', length: 50, default: ProductStatus.DRAFT })
  status: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isSellable: boolean;

  @Column({ default: false })
  isPurchasable: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  billingType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  billingCycle: string;

  @Column({ type: 'int', default: 0 })
  trialPeriodDays: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  setupFee: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unitOfMeasure: string;

  @OneToMany('ProductVariant', 'product', { cascade: true })
  variants: any[];

  @OneToMany('ProductMedia', 'product', { cascade: true })
  media: any[];

  @OneToMany('ProductAttribute', 'product', { cascade: true })
  attributes: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
