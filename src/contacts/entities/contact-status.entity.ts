import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contact } from './contact.entity';

@Entity('contact_statuses')
export class ContactStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  color: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Contact, (contact) => contact.contactStatus)
  contacts: Contact[];
}
