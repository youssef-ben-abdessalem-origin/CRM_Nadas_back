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

@Entity("contracts")
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (employee: any) => employee.contracts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @Column({ unique: true })
  contractNumber: string;

  @Column()
  contractType: string; // CDI, CDD, SIVP, Stage, Freelance, Part Time

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column({ type: "date", nullable: true })
  probationEndDate: Date;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  baseSalary: number;

  @Column({ type: "float", default: 40 })
  workingHoursPerWeek: number;

  @Column({ default: "Active" })
  status: string; // Active, Inactive, Suspended

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
