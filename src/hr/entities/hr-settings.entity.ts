import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("hr_settings")
export class HrSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 4, scale: 2, default: 1.25 })
  overtimeWeekdayRate: number;

  @Column({ type: "decimal", precision: 4, scale: 2, default: 1.50 })
  overtimeNightRate: number;

  @Column({ type: "decimal", precision: 4, scale: 2, default: 2.00 })
  overtimeRestDayRate: number;

  @Column({ type: "int", default: 21 })
  nightStartHour: number;

  @Column({ type: "int", default: 5 })
  nightEndHour: number;

  @Column({ type: "varchar", length: 20, default: "carry_forward", nullable: true })
  leaveYearEndPolicy: string;

  @Column({ type: "decimal", precision: 10, scale: 3, default: 0, nullable: true })
  leaveCashOutRate: number;

  @Column({ type: "int", default: 30, nullable: true })
  maxCarryForwardDays: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
