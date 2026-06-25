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

@Entity("cnss_profiles")
export class CnssProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne("Employee", { onDelete: "CASCADE" })
  @JoinColumn({ name: "employeeId" })
  employee: Employee;

  @Column({ unique: true })
  employeeId: number;

  @Column()
  cnssNumber: string;

  @Column({ type: "date", nullable: true })
  registrationDate: Date;

  @Column({ default: "CNSS" })
  regime: string; // CNSS, CNRPS

  @Column({ default: "Active" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
