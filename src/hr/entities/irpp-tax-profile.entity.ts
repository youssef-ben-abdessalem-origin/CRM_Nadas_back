import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import type { Employee } from "./employee.entity";

@Entity("irpp_tax_profiles")
export class IrppTaxProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne("Employee", { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column({ unique: true })
  employeeId: number;

  @Column({ default: "Single" })
  maritalStatus: string; // Single, Married, Divorced, Widowed

  @Column({ default: 0 })
  childrenCount: number;

  @Column({ default: 0 })
  disabledDependents: number;

  @Column({ type: "decimal", precision: 10, scale: 3, default: 0 })
  taxExemptions: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
