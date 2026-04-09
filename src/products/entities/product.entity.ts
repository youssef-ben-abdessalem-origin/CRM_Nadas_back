import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { Brand } from './brand.entity';

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

  @Column({ type: 'int', nullable: true })
  ownerId: number;

  @ManyToOne('User', { nullable: true })
  @JoinColumn({ name: 'ownerId' })
  owner: any;

  @Column({ nullable: true })
  productCode: string;

  @Column({ nullable: true })
  vendorName: string;

  @Column({ nullable: true })
  manufacturer: string;

  @Column({ type: 'timestamp', nullable: true })
  salesStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  salesEndDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  supportStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  supportEndDate: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  tax: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  commissionRate: number;

  @Column({ default: true })
  taxable: boolean;

  @Column({ nullable: true })
  usageUnit: string;

  @Column({ type: 'int', default: 0 })
  quantityInStock: number;

  @Column({ nullable: true })
  handler: string;

  @Column({ type: 'int', default: 0 })
  qtyOrdered: number;

  @Column({ type: 'int', default: 0 })
  reorderLevel: number;

  @Column({ type: 'int', default: 0 })
  quantityInDemand: number;

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
