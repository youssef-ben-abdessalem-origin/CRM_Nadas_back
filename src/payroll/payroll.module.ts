import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PayrollService } from "./payroll.service";
import { PayrollController } from "./payroll.controller";
import { SalaryComponent } from "./entities/salary-component.entity";
import { EmployeeSalaryComponent } from "./entities/employee-salary-component.entity";
import { PayrollProfile } from "./entities/payroll-profile.entity";
import { PayrollPeriod } from "./entities/payroll-period.entity";
import { Payslip } from "./entities/payslip.entity";
import { PayslipDetail } from "./entities/payslip-detail.entity";
import { Loan } from "./entities/loan.entity";
import { Advance } from "./entities/advance.entity";
import { PayrollSettings } from "./entities/payroll-settings.entity";
import { CnssDeclaration } from "./entities/cnss-declaration.entity";
import { IrppDeclaration } from "./entities/irpp-declaration.entity";
import { BankTransferFile } from "./entities/bank-transfer-file.entity";
import { Employee } from "../hr/entities/employee.entity";
import { Contract } from "../hr/entities/contract.entity";
import { Attendance } from "../hr/entities/attendance.entity";
import { OvertimeRequest } from "../hr/entities/overtime-request.entity";
import { HrSettings } from "../hr/entities/hr-settings.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SalaryComponent,
      EmployeeSalaryComponent,
      PayrollProfile,
      PayrollPeriod,
      Payslip,
      PayslipDetail,
      Loan,
      Advance,
      PayrollSettings,
      CnssDeclaration,
      IrppDeclaration,
      BankTransferFile,
      Employee,
      Contract,
      Attendance,
      OvertimeRequest,
      HrSettings,
    ]),
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports: [PayrollService, TypeOrmModule],
})
export class PayrollModule {}
