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

@Entity("goals")
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (emp: any) => emp.goals, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column({ type: "date", nullable: true })
  targetDate: Date;

  @Column({ type: "float", default: 0 })
  progress: number;

  @Column({ default: "Not Started" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
