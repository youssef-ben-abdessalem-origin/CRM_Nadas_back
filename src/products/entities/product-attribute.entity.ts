import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_attributes')
export class ProductAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.attributes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: any;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  value: string;
}
