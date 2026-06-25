import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import type { Employee } from "../../hr/entities/employee.entity";

@Entity("irpp_declarations")
@Index(["taxYear", "employeeId"], { unique: true })
export class IrppDeclaration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taxYear: number;

  @ManyToOne("Employee", { onDelete: "RESTRICT" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column()
  employeeId: number;

  @Column({ type: "decimal", precision: 12, scale: 3, default: 0 })
  annualTaxableIncome: number;

  @Column({ type: "decimal", precision: 12, scale: 3, default: 0 })
  annualTaxDeducted: number;

  @Column({ type: "decimal", precision: 12, scale: 3, default: 0 })
  annualCnssDeducted: number;

  @Column({ default: "Draft" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
