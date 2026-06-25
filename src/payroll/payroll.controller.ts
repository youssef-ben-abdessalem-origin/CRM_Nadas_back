import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PayrollService } from "./payroll.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("payroll")
@UseGuards(JwtAuthGuard)
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  // ==================== SALARY COMPONENTS ====================
  @Get("components")
  findComponents() {
    return this.payrollService.findComponents();
  }

  @Get("components/:id")
  findOneComponent(@Param("id") id: string) {
    return this.payrollService.findOneComponent(+id);
  }

  @Post("components")
  createComponent(@Body() data: any) {
    return this.payrollService.createComponent(data);
  }

  @Put("components/:id")
  updateComponent(@Param("id") id: string, @Body() data: any) {
    return this.payrollService.updateComponent(+id, data);
  }

  @Delete("components/:id")
  deleteComponent(@Param("id") id: string) {
    return this.payrollService.deleteComponent(+id);
  }

  // ==================== EMPLOYEE SALARY COMPONENTS ====================
  @Get("employee-components")
  findEmployeeComponents(@Query("employeeId") employeeId?: string) {
    return this.payrollService.findEmployeeComponents(
      employeeId ? +employeeId : undefined,
    );
  }

  @Post("employee-components")
  createEmployeeComponent(@Body() data: any) {
    return this.payrollService.createEmployeeComponent(data);
  }

  @Put("employee-components/:id")
  updateEmployeeComponent(@Param("id") id: string, @Body() data: any) {
    return this.payrollService.updateEmployeeComponent(+id, data);
  }

  @Delete("employee-components/:id")
  deleteEmployeeComponent(@Param("id") id: string) {
    return this.payrollService.deleteEmployeeComponent(+id);
  }

  // ==================== PAYROLL PROFILES ====================
  @Get("profiles")
  findProfiles() {
    return this.payrollService.findProfiles();
  }

  @Get("profiles/employee/:employeeId")
  findOneProfileByEmployee(@Param("employeeId") employeeId: string) {
    return this.payrollService.findOneProfileByEmployee(+employeeId);
  }

  @Post("profiles/employee/:employeeId")
  createOrUpdateProfile(
    @Param("employeeId") employeeId: string,
    @Body() data: any,
  ) {
    return this.payrollService.createOrUpdateProfile(+employeeId, data);
  }

  // ==================== PAYROLL PERIODS ====================
  @Get("periods")
  findPeriods() {
    return this.payrollService.findPeriods();
  }

  @Post("periods")
  createPeriod(@Body() data: any) {
    return this.payrollService.createPeriod(data);
  }

  @Put("periods/:id")
  updatePeriod(@Param("id") id: string, @Body() data: any) {
    return this.payrollService.updatePeriod(+id, data);
  }

  // ==================== LOANS ====================
  @Get("loans")
  findLoans(@Query("employeeId") employeeId?: string) {
    return this.payrollService.findLoans(employeeId ? +employeeId : undefined);
  }

  @Post("loans")
  createLoan(@Body() data: any) {
    return this.payrollService.createLoan(data);
  }

  @Put("loans/:id")
  updateLoan(@Param("id") id: string, @Body() data: any) {
    return this.payrollService.updateLoan(+id, data);
  }

  // ==================== ADVANCES ====================
  @Get("advances")
  findAdvances(@Query("employeeId") employeeId?: string) {
    return this.payrollService.findAdvances(
      employeeId ? +employeeId : undefined,
    );
  }

  @Post("advances")
  createAdvance(@Body() data: any) {
    return this.payrollService.createAdvance(data);
  }

  @Put("advances/:id")
  updateAdvance(@Param("id") id: string, @Body() data: any) {
    return this.payrollService.updateAdvance(+id, data);
  }

  // ==================== PAYROLL SETTINGS ====================
  @Get("settings")
  getSettings() {
    return this.payrollService.getSettings();
  }

  @Put("settings")
  updateSettings(@Body() data: any) {
    return this.payrollService.updateSettings(data);
  }

  // ==================== PAYSLIPS ====================
  @Get("payslips")
  findPayslips(
    @Query("periodId") periodId?: string,
    @Query("employeeId") employeeId?: string,
  ) {
    return this.payrollService.findPayslips(
      periodId ? +periodId : undefined,
      employeeId ? +employeeId : undefined,
    );
  }

  @Get("payslips/:id")
  findOnePayslip(@Param("id") id: string) {
    return this.payrollService.findOnePayslip(+id);
  }

  @Post("payslips/generate")
  generatePayslipsForPeriod(@Body("periodId") periodId: number) {
    return this.payrollService.generatePayslipsForPeriod(periodId);
  }

  @Post("payslips/:id/approve")
  approvePayslip(@Param("id") id: string) {
    return this.payrollService.approvePayslip(+id);
  }

  @Post("payslips/:id/pay")
  payPayslip(@Param("id") id: string) {
    return this.payrollService.payPayslip(+id);
  }

  // ==================== CNSS DECLARATIONS ====================
  @Get("cnss-declarations")
  findCnssDeclarations() {
    return this.payrollService.findCnssDeclarations();
  }

  @Get("cnss-declarations/:id")
  findOneCnssDeclaration(@Param("id") id: string) {
    return this.payrollService.findOneCnssDeclaration(+id);
  }

  @Post("cnss-declarations/generate")
  generateCnssDeclaration(@Body("periodId") periodId: number) {
    return this.payrollService.generateCnssDeclaration(periodId);
  }

  // ==================== BANK TRANSFER FILES ====================
  @Get("bank-transfers")
  findBankTransferFiles() {
    return this.payrollService.findBankTransferFiles();
  }

  @Get("bank-transfers/:id")
  findOneBankTransferFile(@Param("id") id: string) {
    return this.payrollService.findOneBankTransferFile(+id);
  }

  @Post("bank-transfers/generate")
  generateBankTransferFile(@Body("periodId") periodId: number, @Body("format") format: string) {
    return this.payrollService.generateBankTransferFile(periodId, format || "sepa");
  }

  // ==================== STC SETTLEMENTS ====================
  @Get("stc-settlements")
  findStcSettlements() {
    return this.payrollService.findStcSettlements();
  }

  @Post("stc-settlements/generate")
  generateStcSettlement(@Body("periodId") periodId: number) {
    return this.payrollService.generateStcSettlement(periodId);
  }

  // ==================== IRPP DECLARATIONS ====================
  @Get("irpp-declarations")
  findIrppDeclarations() {
    return this.payrollService.findIrppDeclarations();
  }

  @Get("irpp-declarations/:id")
  findOneIrppDeclaration(@Param("id") id: string) {
    return this.payrollService.findOneIrppDeclaration(+id);
  }

  @Post("irpp-declarations/generate")
  generateIrppDeclaration(@Body("taxYear") taxYear: number) {
    return this.payrollService.generateIrppDeclaration(taxYear);
  }

  // ==================== 13TH MONTH SALARY ====================
  @Post("thirteenth-month/generate")
  generateThirteenthMonth(@Body("periodId") periodId: number) {
    return this.payrollService.generateThirteenthMonth(periodId);
  }

  // ==================== PAYROLL REPORTS ====================
  @Get("reports/cost")
  getPayrollCostReport(@Query("periodId") periodId?: string) {
    return this.payrollService.getPayrollCostReport(periodId ? +periodId : undefined);
  }

  @Get("reports/department-cost")
  getDepartmentPayrollCostReport(@Query("periodId") periodId?: string) {
    return this.payrollService.getDepartmentPayrollCostReport(periodId ? +periodId : undefined);
  }

  @Get("reports/period-comparison")
  getPeriodComparisonReport() {
    return this.payrollService.getPeriodComparisonReport();
  }
}
