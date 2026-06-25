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
import type { Kpi } from "./kpi.entity";

@Entity("kpi_assignments")
@Index(["employeeId", "kpiId", "period"])
export class KpiAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (emp: any) => emp.kpiAssignments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @ManyToOne("Kpi", { onDelete: "RESTRICT" })
  @JoinColumn({ name: "kpiId" })
  kpi: Kpi;

  @Column()
  kpiId: number;

  @Column({ type: "float", nullable: true })
  targetValue: number;

  @Column({ type: "float", nullable: true })
  actualValue: number;

  @Column({ nullable: true })
  period: string;

  @Column({ type: "text", nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
