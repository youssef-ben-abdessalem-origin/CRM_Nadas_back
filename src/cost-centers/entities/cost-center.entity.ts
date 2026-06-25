import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Department } from "../../departments/entities/department.entity";
import type { Employee } from "../../hr/entities/employee.entity";

@Entity("cost_centers")
export class CostCenter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne("Department", { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "departmentId" })
  department: Department;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne("Employee", { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "managerId" })
  manager: Employee;

  @Column({ nullable: true })
  managerId: number;

  @Column({ default: "Active" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
