import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'variant_id' })
  variantId: string;

  @ManyToOne(() => ProductVariant, (variant) => variant.inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variant_id' })
  variant: any;

  @Column({ default: 0 })
  quantityAvailable: number;

  @Column({ default: 0 })
  quantityReserved: number;

  @Column({ default: 0 })
  reorderLevel: number;

  @Column({ type: 'uuid', nullable: true })
  warehouseId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  stockStatus: string; // in_stock, low, out_of_stock

  @UpdateDateColumn()
  updatedAt: Date;
}
