import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PriceBook } from './price-book.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('price_book_items')
export class PriceBookItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'price_book_id' })
  priceBookId: string;

  @ManyToOne(() => PriceBook, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'price_book_id' })
  priceBook: PriceBook;

  @Column({ name: 'variant_id' })
  variantId: string;

  @ManyToOne(() => ProductVariant, (variant: any) => variant.prices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variant_id' })
  productVariant: any;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'int', default: 1 })
  minQty: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
