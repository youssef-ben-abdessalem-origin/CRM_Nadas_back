import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contact } from './contact.entity';

@Entity('contact_tiers')
export class ContactTier {
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Contact, (contact) => contact.contactTier)
  contacts: Contact[];
}
