import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum PriceBookBillingType {
  ONE_TIME = 'ONE_TIME',
  RECURRING = 'RECURRING',
}

export enum PriceBookBillingPeriod {
  NONE = 'NONE',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  WEEKLY = 'WEEKLY',
}

@Entity('price_book_items')
export class PriceBookItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'price_book_id' })
  priceBookId: string;

  @ManyToOne('PriceBook', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'price_book_id' })
  priceBook: any;

  @Column({ name: 'product_variant_id' })
  productVariantId: string;

  @ManyToOne('ProductVariant', (variant: any) => variant.prices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_variant_id' })
  productVariant: any;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: PriceBookBillingType, default: PriceBookBillingType.ONE_TIME })
  billingType: PriceBookBillingType;

  @Column({ type: 'enum', enum: PriceBookBillingPeriod, default: PriceBookBillingPeriod.NONE })
  billingPeriod: PriceBookBillingPeriod;

  @Column({ default: true })
  discountAllowed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  validFrom: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  validTo: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
