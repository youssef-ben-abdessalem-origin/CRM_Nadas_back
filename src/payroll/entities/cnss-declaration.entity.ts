import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type { PayrollPeriod } from "./payroll-period.entity";

@Entity("cnss_declarations")
export class CnssDeclaration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("PayrollPeriod", { onDelete: "RESTRICT" })
  @JoinColumn({ name: "payrollPeriodId" })
  payrollPeriod: PayrollPeriod;

  @Column()
  payrollPeriodId: number;

  @Column({ type: "date" })
  declarationDate: Date;

  @Column({ type: "integer", default: 0 })
  employeeCount: number;

  @Column({ type: "decimal", precision: 12, scale: 3, default: 0 })
  totalGrossSalary: number;

  @Column({ type: "decimal", precision: 12, scale: 3, default: 0 })
  totalCnssEmployee: number;

  @Column({ type: "decimal", precision: 12, scale: 3, default: 0 })
  totalCnssEmployer: number;

  @Column({ type: "decimal", precision: 12, scale: 3, default: 0 })
  totalTfp: number;

  @Column({ type: "decimal", precision: 12, scale: 3, default: 0 })
  totalFoprolos: number;

  @Column({ type: "decimal", precision: 12, scale: 3, default: 0 })
  totalAccidentInsurance: number;

  @Column({ default: "Draft" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
