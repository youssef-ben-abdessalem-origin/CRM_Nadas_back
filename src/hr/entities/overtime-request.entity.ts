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

@Entity("overtime_requests")
export class OvertimeRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (employee: any) => employee.overtimeRequests, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @Column({ type: "varchar", default: "weekday" })
  category: string;

  @Column({ type: "varchar", default: "manager" })
  approvalAuthority: string;

  @Column({ type: "int", nullable: true })
  assignedManagerId: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "varchar" })
  startTime: string;

  @Column({ type: "varchar" })
  endTime: string;

  @Column({ type: "float" })
  totalHours: number;

  @Column({ type: "float", default: 1.25 })
  multiplier: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: "Pending" })
  status: string;

  @ManyToOne("Employee", { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "approvedById" })
  approvedBy: Employee;

  @Column({ nullable: true })
  approvedById: number;

  @ManyToOne("Employee", { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "assignedById" })
  assignedBy: Employee;

  @Column({ nullable: true })
  assignedById: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
