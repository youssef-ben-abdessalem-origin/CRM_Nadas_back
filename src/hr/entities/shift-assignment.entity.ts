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
import type { Shift } from "./shift.entity";

@Entity("shift_assignments")
@Index(["employeeId", "shiftId"])
export class ShiftAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (employee: any) => employee.shiftAssignments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @ManyToOne("Shift", { onDelete: "RESTRICT" })
  @JoinColumn({ name: "shiftId" })
  shift: Shift;

  @Column()
  shiftId: number;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column({ type: "text", nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
