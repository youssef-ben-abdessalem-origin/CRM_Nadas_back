import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("departments")
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: "representativeId" })
  representative: User;

  @Column({ nullable: true })
  representativeId: number;

  @ManyToMany(() => User, { eager: true })
  @JoinTable({
    name: "department_members",
    joinColumn: { name: "departmentId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
  })
  members: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
