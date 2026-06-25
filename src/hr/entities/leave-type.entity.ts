import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("leave_types")
export class LeaveType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  nameAr: string;

  @Column({ nullable: true })
  nameFr: string;

  @Column({ default: true })
  paid: boolean;

  @Column({ type: "integer", nullable: true })
  annualLimit: number;

  @Column({ default: true })
  requiresApproval: boolean;

  @Column({ default: false })
  requiresSupportingDocuments: boolean;

  @Column({ type: "integer", nullable: true })
  maxConsecutiveDays: number;

  @Column({ default: false })
  carryForwardAllowed: boolean;

  @Column({ nullable: true })
  genderRestriction: string; // "Male", "Female", or null for all

  @Column({ default: "Standard" })
  accrualPolicy: string; // "Standard", "Monthly", "Upfront"

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
