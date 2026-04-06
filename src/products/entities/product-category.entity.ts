import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  parentId: string | null;

  @ManyToOne(() => ProductCategory, (category) => category.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parentId' })
  parent: ProductCategory | null;

  @OneToMany(() => ProductCategory, (category) => category.parent)
  children: ProductCategory[];

  @Column({ default: true })
  isActive: boolean;
}
