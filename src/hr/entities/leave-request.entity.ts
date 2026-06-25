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

@Entity("leave_requests")
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (employee: any) => employee.leaveRequests, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @ManyToOne(() => LeaveType, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "leaveTypeId" })
  leaveType: LeaveType;

  @Column()
  leaveTypeId: number;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @Column({ type: "float" })
  days: number;

  @Column({ type: "text", nullable: true })
  reason: string;

  @Column({ default: "Pending" })
  status: string; // Pending, Approved, Rejected

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
