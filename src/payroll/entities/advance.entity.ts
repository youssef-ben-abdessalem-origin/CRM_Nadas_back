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

@Entity("advances")
export class Advance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: any;

  @Column()
  employeeId: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  amount: number;

  @Column({ type: "date" })
  requestDate: Date;

  @Column({ type: "date" })
  deductionDate: Date;

  @Column({ default: "Approved" })
  status: string; // Approved, Deducted, Cancelled

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
