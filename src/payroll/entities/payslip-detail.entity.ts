import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type { Payslip } from "./payslip.entity";
import { SalaryComponent } from "./salary-component.entity";

@Entity("payslip_details")
export class PayslipDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Payslip", (payslip: any) => payslip.details, { onDelete: "CASCADE" })
  @JoinColumn({ name: "payslipId" })
  payslip: Payslip;

  @Column()
  payslipId: number;

  @ManyToOne(() => SalaryComponent, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "componentId" })
  component: SalaryComponent;

  @Column()
  componentId: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
