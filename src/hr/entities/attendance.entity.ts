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

@Entity("attendance")
@Index(["employeeId", "workDate"], { unique: true })
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (employee: any) => employee.attendances, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @Column({ type: "date" })
  workDate: Date;

  @Column({ type: "varchar", nullable: true })
  checkIn: string; // e.g. "08:30" or "08:30:00"

  @Column({ type: "varchar", nullable: true })
  checkOut: string; // e.g. "17:30" or "17:30:00"

  @Column({ type: "float", nullable: true })
  workedHours: number;

  @Column({ type: "float", nullable: true })
  overtimeHours: number;

  @Column({ type: "float", default: 0 })
  lateMinutes: number;

  @Column({ type: "float", default: 0 })
  earlyDepartureMinutes: number;

  @Column({ nullable: true })
  shiftName: string;

  @Column({ default: "Manual Entry" })
  source: string;

  @Column({ type: "text", nullable: true })
  notes: string;

  @Column({ default: "Present" })
  status: string; // Present, Absent, Leave, Holiday, Remote, Mission, Training, Weekend, Half Day, Sick Leave, Excused

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
