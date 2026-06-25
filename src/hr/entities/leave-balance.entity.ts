import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import type { Employee } from "./employee.entity";
import { LeaveType } from "./leave-type.entity";

@Entity("leave_balances")
@Index(["employeeId", "year", "leaveTypeId"], { unique: true })
export class LeaveBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (employee: any) => employee.leaveBalances, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @Column()
  year: number;

  @ManyToOne(() => LeaveType, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "leaveTypeId" })
  leaveType: LeaveType;

  @Column()
  leaveTypeId: number;

  @Column({ type: "float", default: 0 })
  totalDays: number;

  @Column({ type: "float", default: 0 })
  usedDays: number;

  @Column({ type: "float", default: 0 })
  remainingDays: number;

  @Column({ type: "float", default: 0 })
  carriedForwardDays: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
