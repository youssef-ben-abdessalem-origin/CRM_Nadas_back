import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type { Employee } from "./employee.entity";
import { LeaveType } from "./leave-type.entity";

@Entity("vacation_accrual_rules")
export class VacationAccrualRule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @ManyToOne(() => LeaveType, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "leaveTypeId" })
  leaveType: LeaveType;

  @Column()
  leaveTypeId: number;

  @Column({ type: "float", default: 2.5 })
  accrualRate: number;

  @Column({ type: "float", default: 30 })
  maxAccrual: number;

  @Column({ type: "date", nullable: true })
  effectiveDate: Date;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
