import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import type { Department } from "../../departments/entities/department.entity";
import type { Position } from "./position.entity";
import type { Contract } from "./contract.entity";
import type { Attendance } from "./attendance.entity";
import type { LeaveRequest } from "./leave-request.entity";
import type { EmployeeDocument } from "./employee-document.entity";
import type { ShiftAssignment } from "./shift-assignment.entity";
import type { OvertimeRequest } from "./overtime-request.entity";
import type { LeaveBalance } from "./leave-balance.entity";
import type { KpiAssignment } from "./kpi-assignment.entity";
import type { Goal } from "./goal.entity";
import type { PerformanceReview } from "./performance-review.entity";

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  employeeNumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  cin: string;

  @Column({ type: "date" })
  dateOfBirth: Date;

  @Column({ nullable: true })
  placeOfBirth: string;

  @Column()
  gender: string;

  @Column()
  nationality: string;

  @Column()
  maritalStatus: string;

  @Column({ default: 0 })
  childrenCount: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  workEmail: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  cnssNumber: string;

  @Column({ nullable: true })
  passportNumber: string;

  @Column({ nullable: true })
  emergencyContactName: string;

  @Column({ nullable: true })
  emergencyContactPhone: string;

  @Column({ type: "text", nullable: true })
  education: string;

  @Column({ type: "simple-json", nullable: true })
  skills: string[];

  @Column({ type: "simple-json", nullable: true })
  certifications: string[];

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ type: "date" })
  hireDate: Date;

  @Column({ nullable: true })
  workLocation: string;

  @Column({ nullable: true })
  costCenter: string;

  @Column({ nullable: true })
  employmentCategory: string;

  @Column({ nullable: true })
  attendanceMode: string;

  @ManyToOne("Department", { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "departmentId" })
  department: Department;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne("Position", { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "positionId" })
  position: Position;

  @Column({ nullable: true })
  positionId: number;

  @ManyToOne("Employee", { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "managerId" })
  manager: Employee;

  @Column({ nullable: true })
  managerId: number;

  @Column({ default: "Active" })
  status: string;

  @Column({ default: "Draft" })
  readinessStatus: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  residenceCardNumber: string;

  @Column({ type: "date", nullable: true })
  residenceCardExpiry: Date;

  @Column({ nullable: true })
  workPermitType: string;

  @Column({ nullable: true })
  workPermitNumber: string;

  @Column({ nullable: true })
  workPermitStatus: string;

  @Column({ type: "date", nullable: true })
  workPermitExpiry: Date;

  @OneToMany("Contract", (contract: any) => contract.employee)
  contracts: Contract[];

  @OneToMany("Attendance", (attendance: any) => attendance.employee)
  attendances: Attendance[];

  @OneToMany("LeaveRequest", (leaveRequest: any) => leaveRequest.employee)
  leaveRequests: LeaveRequest[];

  @OneToMany("EmployeeDocument", (doc: any) => doc.employee)
  documents: EmployeeDocument[];

  @OneToMany("ShiftAssignment", (sa: any) => sa.employee)
  shiftAssignments: ShiftAssignment[];

  @OneToMany("OvertimeRequest", (ot: any) => ot.employee)
  overtimeRequests: OvertimeRequest[];

  @OneToMany("LeaveBalance", (lb: any) => lb.employee)
  leaveBalances: LeaveBalance[];

  @OneToMany("KpiAssignment", (ka: any) => ka.employee)
  kpiAssignments: KpiAssignment[];

  @OneToMany("Goal", (g: any) => g.employee)
  goals: Goal[];

  @OneToMany("PerformanceReview", (pr: any) => pr.employee)
  performanceReviews: PerformanceReview[];

  @OneToMany("OvertimeRequest", (ot: any) => ot.assignedBy)
  assignedOvertimes: OvertimeRequest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
