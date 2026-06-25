import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterModule } from "@nestjs/platform-express";
import { CloudinaryModule } from "../cloudinary.module";
import { HrService } from "./hr.service";
import { HrController } from "./hr.controller";
import { Employee } from "./entities/employee.entity";
import { Position } from "./entities/position.entity";
import { Contract } from "./entities/contract.entity";
import { Attendance } from "./entities/attendance.entity";
import { LeaveType } from "./entities/leave-type.entity";
import { LeaveRequest } from "./entities/leave-request.entity";
import { EmployeeDocument } from "./entities/employee-document.entity";
import { CnssProfile } from "./entities/cnss-profile.entity";
import { IrppTaxProfile } from "./entities/irpp-tax-profile.entity";
import { Shift } from "./entities/shift.entity";
import { ShiftAssignment } from "./entities/shift-assignment.entity";
import { OvertimeRequest } from "./entities/overtime-request.entity";
import { LeaveBalance } from "./entities/leave-balance.entity";
import { Kpi } from "./entities/kpi.entity";
import { KpiAssignment } from "./entities/kpi-assignment.entity";
import { Goal } from "./entities/goal.entity";
import { PerformanceReview } from "./entities/performance-review.entity";
import { VacationAccrualRule } from "./entities/vacation-accrual-rule.entity";
import { HrSettings } from "./entities/hr-settings.entity";
import { Department } from "../departments/entities/department.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Position,
      Contract,
      Attendance,
      LeaveType,
      LeaveRequest,
      EmployeeDocument,
      CnssProfile,
      IrppTaxProfile,
      Shift,
      ShiftAssignment,
      OvertimeRequest,
      LeaveBalance,
      Kpi,
      KpiAssignment,
      Goal,
      PerformanceReview,
      VacationAccrualRule,
      HrSettings,
      Department,
    ]),
    CloudinaryModule,
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  ],
  controllers: [HrController],
  providers: [HrService],
  exports: [HrService, TypeOrmModule],
})
export class HrModule {}
