import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Employee } from "../../hr/entities/employee.entity";

@Entity("loans")
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: any;

  @Column()
  employeeId: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  loanAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  installmentAmount: number;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  balance: number;

  @Column({ default: "Active" })
  status: string; // Active, Fully Repaid, Cancelled

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
