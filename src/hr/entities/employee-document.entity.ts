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

@Entity("employee_documents")
export class EmployeeDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (emp: any) => emp.documents, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @Column()
  documentType: string; // CIN, Passport, Diploma, Work Permit, Medical Certificate, Contract, Other

  @Column({ nullable: true })
  fileName: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ type: "date", nullable: true })
  expiryDate: Date;

  @Column({ type: "text", nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
