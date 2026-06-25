import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("payroll_settings")
export class PayrollSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 9.68 })
  cnssEmployeeRate: number; // 9.68% employee contribution (2025)

  @Column({ type: "decimal", precision: 5, scale: 2, default: 17.07 })
  cnssEmployerRate: number; // 17.07% employer contribution (2025)

  @Column({ type: "decimal", precision: 5, scale: 2, default: 1.00 })
  tfpRate: number; // 1% TFP (Fonds de Promotion des Logements)

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.50 })
  foprolosRate: number; // 0.5% FOPROLOS

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.40 })
  accidentInsuranceRate: number; // ~0.4% accident insurance

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  retirementRate: number; // optional

  @Column({ default: "TND" })
  currency: string;

  @Column({ type: "decimal", precision: 8, scale: 2, default: 2730 })
  cnssMaxCap: number; // CNSS monthly salary cap (2730 TND in 2025)

  @Column({ type: "integer", default: 26 })
  workingDaysMonth: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 1.25 })
  overtimeMultiplier: number;

  // ============ 13th Month Salary ============
  @Column({ default: false })
  thirteenthMonthEnabled: boolean;

  @Column({ type: "int", default: 12 })
  thirteenthMonthMonth: number; // Month number (1-12) when 13th month is paid, default December

  @Column({ type: "decimal", precision: 5, scale: 2, default: 100 })
  thirteenthMonthRate: number; // Percentage of base salary (100% = full extra month)

  // ============ Seniority Bonus ============
  @Column({ default: false })
  seniorityBonusEnabled: boolean;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 5 })
  seniorityBonusRate5yr: number; // % after 5 years

  @Column({ type: "decimal", precision: 5, scale: 2, default: 10 })
  seniorityBonusRate10yr: number; // % after 10 years

  @Column({ type: "decimal", precision: 5, scale: 2, default: 15 })
  seniorityBonusRate15yr: number; // % after 15 years

  @Column({ type: "decimal", precision: 5, scale: 2, default: 20 })
  seniorityBonusRate20yr: number; // % after 20 years

  // ============ Absence Deduction ============
  @Column({ default: false })
  absenceDeductionEnabled: boolean;

  @Column({ type: "int", default: 26 })
  workingDaysPerMonth: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 100 })
  dailySalaryDeductionRate: number; // % of daily salary deducted per unexcused absence day

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
