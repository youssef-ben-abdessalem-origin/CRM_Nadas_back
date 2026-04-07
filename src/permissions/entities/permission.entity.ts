import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Friendly name like "View Leads"

  @Column({ unique: true })
  code: string; // Machine name like "leads.view"

  @Column()
  module: string; // "leads", "deals", etc.

  @CreateDateColumn()
  createdAt: Date;
}
