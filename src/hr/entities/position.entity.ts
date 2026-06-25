import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type { Department } from "../../departments/entities/department.entity";

@Entity("positions")
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  title: string;

  @ManyToOne("Department", { onDelete: "CASCADE" })
  @JoinColumn({ name: "departmentId" })
  department: Department;

  @Column()
  departmentId: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: "Active" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
