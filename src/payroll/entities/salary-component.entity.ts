import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("salary_components")
export class SalaryComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; // e.g. "BASE_SALARY", "TRANSPORT_ALLOWANCE", "MEAL_ALLOWANCE", "CNSS", "IRPP"

  @Column()
  name: string;

  @Column()
  type: string; // EARNING, DEDUCTION, EMPLOYER_CONTRIBUTION

  @Column({ default: true })
  taxable: boolean;

  @Column({ default: true })
  subjectToCnss: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
