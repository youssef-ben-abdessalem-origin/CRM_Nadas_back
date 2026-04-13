import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('company_settings')
export class CompanySettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Nadas Group' })
  name: string;

  @Column({ nullable: true })
  legalName: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  commercialRegistration: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ default: '#3b82f6' })
  primaryColor: string;

  @Column({ nullable: true })
  officeAddress: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ default: 'TND' })
  defaultCurrency: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 19.00 })
  defaultTaxRate: number;

  @Column({ default: 'QT-{{YYYY}}-{{0000}}' })
  quoteNumberPrefix: string;

  @Column({ type: 'text', nullable: true })
  termsAndConditions: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  bankIban: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
