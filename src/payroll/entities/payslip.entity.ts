import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import type { Employee } from "../../hr/entities/employee.entity";
import { PayrollPeriod } from "./payroll-period.entity";
import type { PayslipDetail } from "./payslip-detail.entity";

@Entity("payslips")
export class Payslip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @ManyToOne(() => PayrollPeriod, { onDelete: "CASCADE" })
  @JoinColumn({ name: "payrollPeriodId" })
  payrollPeriod: PayrollPeriod;

  @Column()
  payrollPeriodId: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  grossSalary: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  totalEarnings: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  totalDeductions: number;

  @Column({ type: "decimal", precision: 10, scale: 3, default: 0 })
  totalEmployerContributions: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  netSalary: number;

  @Column({ type: "date", nullable: true })
  paymentDate: Date;

  @Column({ default: "Draft" })
  status: string; // Draft, Approved, Paid, Cancelled

  @OneToMany("PayslipDetail", (detail: any) => detail.payslip, { cascade: true })
  details: PayslipDetail[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
