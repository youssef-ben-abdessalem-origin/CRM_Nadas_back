import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("payroll_periods")
export class PayrollPeriod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  periodName: string; // e.g. "June 2026"

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @Column({ default: "Draft" })
  status: string; // Draft, Approved, Closed, Cancelled

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
