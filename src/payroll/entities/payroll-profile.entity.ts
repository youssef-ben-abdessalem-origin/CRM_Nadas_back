import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import type { Employee } from "../../hr/entities/employee.entity";

@Entity("payroll_profiles")
export class PayrollProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne("Employee", { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column({ unique: true })
  employeeId: number;

  @Column({ default: "CNSS" })
  socialRegime: string; // CNSS, CNRPS

  @Column({ nullable: true })
  cnssNumber: string;

  @Column({ nullable: true })
  cnrpsNumber: string;

  @Column({ nullable: true })
  taxStatus: string; // Single, Married, Married + 1 Child, etc.

  @Column({ default: "Bank Transfer" })
  paymentMethod: string; // Bank Transfer, Cash, Check

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  bankAccount: string;

  @Column({ nullable: true })
  rib: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
