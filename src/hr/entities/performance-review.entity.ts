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

@Entity("performance_reviews")
export class PerformanceReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Employee", (emp: any) => emp.performanceReviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @ManyToOne("Employee", { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "reviewerId" })
  reviewer: Employee;

  @Column({ nullable: true })
  reviewerId: number;

  @Column({ type: "date" })
  reviewDate: Date;

  @Column({ type: "float", nullable: true })
  overallRating: number;

  @Column({ type: "text", nullable: true })
  strengths: string;

  @Column({ type: "text", nullable: true })
  weaknesses: string;

  @Column({ type: "text", nullable: true })
  summary: string;

  @Column({ default: "Draft" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
