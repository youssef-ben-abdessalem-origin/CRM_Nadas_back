import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendor_categories')
export class VendorCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  color: string;
}
