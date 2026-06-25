import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { PayrollPeriod } from "./payroll-period.entity";

@Entity("bank_transfer_files")
export class BankTransferFile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PayrollPeriod, { onDelete: "CASCADE" })
  @JoinColumn({ name: "payrollPeriodId" })
  payrollPeriod: PayrollPeriod;

  @Column()
  payrollPeriodId: number;

  @Column()
  fileName: string;

  @Column({ type: "text" })
  fileContent: string;

  @Column()
  format: string;

  @Column({ default: 0 })
  totalEmployees: number;

  @Column({ type: "decimal", precision: 14, scale: 3, default: 0 })
  totalAmount: number;

  @Column({ default: "Generated" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
