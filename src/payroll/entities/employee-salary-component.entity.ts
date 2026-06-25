import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type { Employee } from "../../hr/entities/employee.entity";
import { SalaryComponent } from "./salary-component.entity";

@Entity("employee_salary_components")
export class EmployeeSalaryComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @ManyToOne(() => SalaryComponent, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "componentId" })
  component: SalaryComponent;

  @Column()
  componentId: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  amount: number;

  @Column({ type: "date" })
  effectiveDate: Date;

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
