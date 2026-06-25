import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Res,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { HrService } from "./hr.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { CreatePositionDto } from "./dto/create-position.dto";
import { UpdatePositionDto } from "./dto/update-position.dto";
import { CreateEmployeeDocumentDto } from "./dto/create-employee-document.dto";
import { CreateCnssProfileDto } from "./dto/create-cnss-profile.dto";
import { CreateIrppTaxProfileDto } from "./dto/create-irpp-tax-profile.dto";
import { CreateShiftDto } from "./dto/create-shift.dto";
import { CreateShiftAssignmentDto } from "./dto/create-shift-assignment.dto";
import { CreateOvertimeRequestDto } from "./dto/create-overtime-request.dto";
import { CreateLeaveBalanceDto } from "./dto/create-leave-balance.dto";
import { CreateKpiDto } from "./dto/create-kpi.dto";
import { CreateKpiAssignmentDto } from "./dto/create-kpi-assignment.dto";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { CreatePerformanceReviewDto } from "./dto/create-performance-review.dto";

@ApiTags("HR")
@Controller("hr")
@UseGuards(JwtAuthGuard)
export class HrController {
  constructor(private readonly hrService: HrService) {}

  // ==================== EMPLOYEES ====================
  @Get("employees")
  @ApiOperation({ summary: "List all employees" })
  findEmployees(
    @Query("search") search?: string,
    @Query("departmentId") departmentId?: string,
    @Query("status") status?: string,
    @Query("includeDrafts") includeDrafts?: string,
  ) {
    return this.hrService.findEmployees(
      search,
      departmentId ? +departmentId : undefined,
      status,
      includeDrafts === "true",
    );
  }

  @Get("employees/:id")
  @ApiOperation({ summary: "Get employee by ID" })
  findOneEmployee(@Param("id") id: string) {
    return this.hrService.findOneEmployee(+id);
  }

  @Post("employees")
  @ApiOperation({ summary: "Create a new employee" })
  createEmployee(@Body() data: CreateEmployeeDto) {
    return this.hrService.createEmployee(data);
  }

  @Post("employees/draft")
  @ApiOperation({ summary: "Create employee draft with partial data" })
  createEmployeeDraft(@Body() data: any) {
    return this.hrService.createEmployeeDraft(data || {});
  }

  @Put("employees/:id")
  @ApiOperation({ summary: "Update an employee" })
  updateEmployee(@Param("id") id: string, @Body() data: UpdateEmployeeDto) {
    return this.hrService.updateEmployee(+id, data);
  }

  @Put("employees/:id/draft")
  @ApiOperation({ summary: "Update employee draft with partial data" })
  updateEmployeeDraft(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateEmployeeDraft(+id, data || {});
  }

  @Delete("employees/:id")
  @ApiOperation({ summary: "Delete an employee" })
  deleteEmployee(@Param("id") id: string) {
    return this.hrService.deleteEmployee(+id);
  }

  // ==================== POSITIONS ====================
  @Get("positions")
  @ApiOperation({ summary: "List all positions" })
  findPositions() {
    return this.hrService.findPositions();
  }

  @Get("positions/:id")
  @ApiOperation({ summary: "Get position by ID" })
  findOnePosition(@Param("id") id: string) {
    return this.hrService.findOnePosition(+id);
  }

  @Post("positions")
  @ApiOperation({ summary: "Create a new position" })
  createPosition(@Body() data: CreatePositionDto) {
    return this.hrService.createPosition(data);
  }

  @Put("positions/:id")
  @ApiOperation({ summary: "Update a position" })
  updatePosition(@Param("id") id: string, @Body() data: UpdatePositionDto) {
    return this.hrService.updatePosition(+id, data);
  }

  @Delete("positions/:id")
  @ApiOperation({ summary: "Delete a position" })
  deletePosition(@Param("id") id: string) {
    return this.hrService.deletePosition(+id);
  }

  // ==================== CONTRACTS ====================
  @Get("contracts")
  @ApiOperation({ summary: "List all contracts" })
  findContracts(@Query("employeeId") employeeId?: string) {
    return this.hrService.findContracts(employeeId ? +employeeId : undefined);
  }

  @Get("contracts/:id")
  @ApiOperation({ summary: "Get contract by ID" })
  findOneContract(@Param("id") id: string) {
    return this.hrService.findOneContract(+id);
  }

  @Post("contracts")
  @ApiOperation({ summary: "Create a contract" })
  createContract(@Body() data: any) {
    return this.hrService.createContract(data);
  }

  @Put("contracts/:id")
  @ApiOperation({ summary: "Update a contract" })
  updateContract(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateContract(+id, data);
  }

  @Delete("contracts/:id")
  @ApiOperation({ summary: "Delete a contract" })
  deleteContract(@Param("id") id: string) {
    return this.hrService.deleteContract(+id);
  }

  @Post("contracts/:id/set-active")
  @ApiOperation({ summary: "Set contract as active" })
  setContractActive(@Param("id") id: string) {
    return this.hrService.setContractActive(+id);
  }

  @Post("contracts/:id/archive")
  @ApiOperation({ summary: "Archive contract" })
  archiveContract(@Param("id") id: string) {
    return this.hrService.archiveContract(+id);
  }

  @Post("contracts/:id/terminate")
  @ApiOperation({ summary: "Terminate or end contract" })
  terminateContract(@Param("id") id: string, @Body() data: any) {
    return this.hrService.terminateContract(+id, data || {});
  }

  @Post("contracts/:id/renew")
  @ApiOperation({ summary: "Renew contract by creating a follow-up draft" })
  renewContract(@Param("id") id: string, @Body() data: any) {
    return this.hrService.renewContract(+id, data);
  }

  // ==================== ATTENDANCE ====================
  @Get("attendance")
  @ApiOperation({ summary: "List attendance records" })
  findAttendance(
    @Query("employeeId") employeeId?: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string,
  ) {
    return this.hrService.findAttendance(
      employeeId ? +employeeId : undefined,
      startDate,
      endDate,
    );
  }

  @Post("attendance")
  @ApiOperation({ summary: "Log attendance" })
  logAttendance(@Body() data: any) {
    return this.hrService.logAttendance(data);
  }

  @Delete("attendance/:id")
  @ApiOperation({ summary: "Delete attendance record" })
  deleteAttendance(@Param("id") id: string) {
    return this.hrService.deleteAttendance(+id);
  }

  // ==================== LEAVE TYPES ====================
  @Get("leave-types")
  @ApiOperation({ summary: "List all leave types" })
  findLeaveTypes() {
    return this.hrService.findLeaveTypes();
  }

  @Get("leave-types/:id")
  @ApiOperation({ summary: "Get leave type by ID" })
  findOneLeaveType(@Param("id") id: string) {
    return this.hrService.findOneLeaveType(+id);
  }

  @Post("leave-types")
  @ApiOperation({ summary: "Create a leave type" })
  createLeaveType(@Body() data: any) {
    return this.hrService.createLeaveType(data);
  }

  @Put("leave-types/:id")
  @ApiOperation({ summary: "Update a leave type" })
  updateLeaveType(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateLeaveType(+id, data);
  }

  @Delete("leave-types/:id")
  @ApiOperation({ summary: "Delete a leave type" })
  deleteLeaveType(@Param("id") id: string) {
    return this.hrService.deleteLeaveType(+id);
  }

  // ==================== LEAVE REQUESTS ====================
  @Get("leave-requests")
  @ApiOperation({ summary: "List leave requests" })
  findLeaveRequests(
    @Query("employeeId") employeeId?: string,
    @Query("status") status?: string,
  ) {
    return this.hrService.findLeaveRequests(
      employeeId ? +employeeId : undefined,
      status,
    );
  }

  @Get("leave-requests/:id")
  @ApiOperation({ summary: "Get leave request by ID" })
  findOneLeaveRequest(@Param("id") id: string) {
    return this.hrService.findOneLeaveRequest(+id);
  }

  @Post("leave-requests")
  @ApiOperation({ summary: "Create a leave request" })
  createLeaveRequest(@Body() data: any) {
    return this.hrService.createLeaveRequest(data);
  }

  @Put("leave-requests/:id")
  @ApiOperation({ summary: "Update a leave request" })
  updateLeaveRequest(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateLeaveRequest(+id, data);
  }

  @Delete("leave-requests/:id")
  @ApiOperation({ summary: "Delete a leave request" })
  deleteLeaveRequest(@Param("id") id: string) {
    return this.hrService.deleteLeaveRequest(+id);
  }

  // ==================== EMPLOYEE DOCUMENTS ====================
  @Get("documents")
  @ApiOperation({ summary: "List employee documents" })
  findDocuments(@Query("employeeId") employeeId?: string) {
    return this.hrService.findDocuments(employeeId ? +employeeId : undefined);
  }

  @Get("documents/:id")
  @ApiOperation({ summary: "Get document by ID" })
  findOneDocument(@Param("id") id: string) {
    return this.hrService.findOneDocument(+id);
  }

  @Post("documents")
  @ApiOperation({ summary: "Upload an employee document" })
  @UseInterceptors(FileInterceptor("file"))
  createDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body("employeeId") employeeId: string,
    @Body("documentType") documentType: string,
    @Body("expiryDate") expiryDate: string,
    @Body("notes") notes: string,
  ) {
    return this.hrService.createDocument(file, {
      employeeId: +employeeId,
      documentType,
      expiryDate: expiryDate || null,
      notes: notes || null,
    });
  }

  @Put("documents/:id")
  @ApiOperation({ summary: "Update document metadata" })
  updateDocument(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateDocument(+id, data);
  }

  @Delete("documents/:id")
  @ApiOperation({ summary: "Delete a document" })
  deleteDocument(@Param("id") id: string) {
    return this.hrService.deleteDocument(+id);
  }

  // ==================== CNSS PROFILES ====================
  @Get("cnss-profiles")
  @ApiOperation({ summary: "List all CNSS profiles" })
  findCnssProfiles() {
    return this.hrService.findCnssProfiles();
  }

  @Get("cnss-profiles/employee/:employeeId")
  @ApiOperation({ summary: "Get CNSS profile by employee ID" })
  findOneCnssProfileByEmployee(@Param("employeeId") employeeId: string) {
    return this.hrService.findOneCnssProfileByEmployee(+employeeId);
  }

  @Post("cnss-profiles/employee/:employeeId")
  @ApiOperation({ summary: "Create or update CNSS profile for an employee" })
  createOrUpdateCnssProfile(
    @Param("employeeId") employeeId: string,
    @Body() data: CreateCnssProfileDto,
  ) {
    return this.hrService.createOrUpdateCnssProfile(+employeeId, data);
  }

  // ==================== IRPP TAX PROFILES ====================
  @Get("irpp-tax-profiles")
  @ApiOperation({ summary: "List all IRPP tax profiles" })
  findIrppTaxProfiles() {
    return this.hrService.findIrppTaxProfiles();
  }

  @Get("irpp-tax-profiles/employee/:employeeId")
  @ApiOperation({ summary: "Get IRPP tax profile by employee ID" })
  findOneIrppTaxProfileByEmployee(@Param("employeeId") employeeId: string) {
    return this.hrService.findOneIrppTaxProfileByEmployee(+employeeId);
  }

  @Post("irpp-tax-profiles/employee/:employeeId")
  @ApiOperation({ summary: "Create or update IRPP tax profile for an employee" })
  createOrUpdateIrppTaxProfile(
    @Param("employeeId") employeeId: string,
    @Body() data: CreateIrppTaxProfileDto,
  ) {
    return this.hrService.createOrUpdateIrppTaxProfile(+employeeId, data);
  }

  // ==================== SHIFTS ====================
  @Get("shifts")
  @ApiOperation({ summary: "List all shifts" })
  findShifts() {
    return this.hrService.findShifts();
  }

  @Get("shifts/:id")
  @ApiOperation({ summary: "Get shift by ID" })
  findOneShift(@Param("id") id: string) {
    return this.hrService.findOneShift(+id);
  }

  @Post("shifts")
  @ApiOperation({ summary: "Create a shift" })
  createShift(@Body() data: any) {
    return this.hrService.createShift(data);
  }

  @Put("shifts/:id")
  @ApiOperation({ summary: "Update a shift" })
  updateShift(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateShift(+id, data);
  }

  @Delete("shifts/:id")
  @ApiOperation({ summary: "Delete a shift" })
  deleteShift(@Param("id") id: string) {
    return this.hrService.deleteShift(+id);
  }

  // ==================== SHIFT ASSIGNMENTS ====================
  @Get("shift-assignments")
  @ApiOperation({ summary: "List shift assignments" })
  findShiftAssignments(@Query("employeeId") employeeId?: string) {
    return this.hrService.findShiftAssignments(employeeId ? +employeeId : undefined);
  }

  @Get("shift-assignments/:id")
  @ApiOperation({ summary: "Get shift assignment by ID" })
  findOneShiftAssignment(@Param("id") id: string) {
    return this.hrService.findOneShiftAssignment(+id);
  }

  @Post("shift-assignments")
  @ApiOperation({ summary: "Create a shift assignment" })
  createShiftAssignment(@Body() data: any) {
    return this.hrService.createShiftAssignment(data);
  }

  @Put("shift-assignments/:id")
  @ApiOperation({ summary: "Update a shift assignment" })
  updateShiftAssignment(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateShiftAssignment(+id, data);
  }

  @Delete("shift-assignments/:id")
  @ApiOperation({ summary: "Delete a shift assignment" })
  deleteShiftAssignment(@Param("id") id: string) {
    return this.hrService.deleteShiftAssignment(+id);
  }

  // ==================== HR SETTINGS ====================
  @Get("hr-settings")
  @ApiOperation({ summary: "Get HR settings (overtime rates, night hours)" })
  getHrSettings() {
    return this.hrService.getHrSettings();
  }

  @Put("hr-settings")
  @ApiOperation({ summary: "Update HR settings" })
  updateHrSettings(@Body() data: any) {
    return this.hrService.updateHrSettings(data);
  }

  // ==================== OVERTIME REQUESTS ====================
  @Get("overtime-requests")
  @ApiOperation({ summary: "List overtime requests" })
  findOvertimeRequests(
    @Query("employeeId") employeeId?: string,
    @Query("status") status?: string,
  ) {
    return this.hrService.findOvertimeRequests(
      employeeId ? +employeeId : undefined,
      status,
    );
  }

  @Get("overtime-requests/:id")
  @ApiOperation({ summary: "Get overtime request by ID" })
  findOneOvertimeRequest(@Param("id") id: string) {
    return this.hrService.findOneOvertimeRequest(+id);
  }

  @Post("overtime-requests")
  @ApiOperation({ summary: "Create an overtime request" })
  createOvertimeRequest(@Body() data: any) {
    return this.hrService.createOvertimeRequest(data);
  }

  @Put("overtime-requests/:id")
  @ApiOperation({ summary: "Update an overtime request" })
  updateOvertimeRequest(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateOvertimeRequest(+id, data);
  }

  @Post("overtime-requests/:id/approve")
  @ApiOperation({ summary: "Approve an overtime request" })
  async approveOvertime(@Param("id") id: string, @Req() req: any) {
    const userEmail = req.user?.email;
    if (!userEmail) throw new Error("User email not found");
    const emp = await this.hrService.findEmployeeByEmail(userEmail);
    if (!emp) throw new Error("No employee record found for current user");
    return this.hrService.approveOvertime(+id, emp.id);
  }

  @Post("overtime-requests/:id/reject")
  @ApiOperation({ summary: "Reject an overtime request" })
  rejectOvertime(@Param("id") id: string) {
    return this.hrService.rejectOvertime(+id);
  }

  @Delete("overtime-requests/:id")
  @ApiOperation({ summary: "Delete an overtime request" })
  deleteOvertimeRequest(@Param("id") id: string) {
    return this.hrService.deleteOvertimeRequest(+id);
  }

  @Get("employee-by-email/:email")
  @ApiOperation({ summary: "Find employee by email (for current user lookup)" })
  findEmployeeByEmail(@Param("email") email: string) {
    return this.hrService.findEmployeeByEmail(email);
  }

  // ==================== LEAVE BALANCES ====================
  @Get("leave-balances")
  @ApiOperation({ summary: "List leave balances" })
  findLeaveBalances(
    @Query("employeeId") employeeId?: string,
    @Query("year") year?: string,
  ) {
    return this.hrService.findLeaveBalances(
      employeeId ? +employeeId : undefined,
      year ? +year : undefined,
    );
  }

  @Get("leave-balances/:id")
  @ApiOperation({ summary: "Get leave balance by ID" })
  findOneLeaveBalance(@Param("id") id: string) {
    return this.hrService.findOneLeaveBalance(+id);
  }

  @Post("leave-balances")
  @ApiOperation({ summary: "Create a leave balance" })
  createLeaveBalance(@Body() data: CreateLeaveBalanceDto) {
    return this.hrService.createLeaveBalance(data);
  }

  @Put("leave-balances/:id")
  @ApiOperation({ summary: "Update a leave balance" })
  updateLeaveBalance(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateLeaveBalance(+id, data);
  }

  @Delete("leave-balances/:id")
  @ApiOperation({ summary: "Delete a leave balance" })
  deleteLeaveBalance(@Param("id") id: string) {
    return this.hrService.deleteLeaveBalance(+id);
  }

  @Post("leave-balances/rollover/:year")
  @ApiOperation({ summary: "Rollover leave balances to next year (carry forward or cash out)" })
  rolloverLeaveBalances(@Param("year") year: string) {
    return this.hrService.rolloverLeaveBalances(+year);
  }

  @Post("leave-balances/sync")
  @ApiOperation({ summary: "Backfill carriedForwardDays from previous year's remaining balance" })
  syncLeaveBalances() {
    return this.hrService.syncLeaveBalances();
  }

  // ==================== KPIs ====================
  @Get("kpis")
  @ApiOperation({ summary: "List all KPIs" })
  findKpis() {
    return this.hrService.findKpis();
  }

  @Get("kpis/:id")
  @ApiOperation({ summary: "Get KPI by ID" })
  findOneKpi(@Param("id") id: string) {
    return this.hrService.findOneKpi(+id);
  }

  @Post("kpis")
  @ApiOperation({ summary: "Create a KPI" })
  createKpi(@Body() data: any) {
    return this.hrService.createKpi(data);
  }

  @Put("kpis/:id")
  @ApiOperation({ summary: "Update a KPI" })
  updateKpi(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateKpi(+id, data);
  }

  @Delete("kpis/:id")
  @ApiOperation({ summary: "Delete a KPI" })
  deleteKpi(@Param("id") id: string) {
    return this.hrService.deleteKpi(+id);
  }

  // ==================== KPI ASSIGNMENTS ====================
  @Get("kpi-assignments")
  @ApiOperation({ summary: "List KPI assignments" })
  findKpiAssignments(@Query("employeeId") employeeId?: string) {
    return this.hrService.findKpiAssignments(employeeId ? +employeeId : undefined);
  }

  @Get("kpi-assignments/:id")
  @ApiOperation({ summary: "Get KPI assignment by ID" })
  findOneKpiAssignment(@Param("id") id: string) {
    return this.hrService.findOneKpiAssignment(+id);
  }

  @Post("kpi-assignments")
  @ApiOperation({ summary: "Create a KPI assignment" })
  createKpiAssignment(@Body() data: any) {
    return this.hrService.createKpiAssignment(data);
  }

  @Put("kpi-assignments/:id")
  @ApiOperation({ summary: "Update a KPI assignment" })
  updateKpiAssignment(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateKpiAssignment(+id, data);
  }

  @Delete("kpi-assignments/:id")
  @ApiOperation({ summary: "Delete a KPI assignment" })
  deleteKpiAssignment(@Param("id") id: string) {
    return this.hrService.deleteKpiAssignment(+id);
  }

  // ==================== GOALS ====================
  @Get("goals")
  @ApiOperation({ summary: "List goals" })
  findGoals(
    @Query("employeeId") employeeId?: string,
    @Query("status") status?: string,
  ) {
    return this.hrService.findGoals(
      employeeId ? +employeeId : undefined,
      status,
    );
  }

  @Get("goals/:id")
  @ApiOperation({ summary: "Get goal by ID" })
  findOneGoal(@Param("id") id: string) {
    return this.hrService.findOneGoal(+id);
  }

  @Post("goals")
  @ApiOperation({ summary: "Create a goal" })
  createGoal(@Body() data: any) {
    return this.hrService.createGoal(data);
  }

  @Put("goals/:id")
  @ApiOperation({ summary: "Update a goal" })
  updateGoal(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateGoal(+id, data);
  }

  @Delete("goals/:id")
  @ApiOperation({ summary: "Delete a goal" })
  deleteGoal(@Param("id") id: string) {
    return this.hrService.deleteGoal(+id);
  }

  // ==================== PERFORMANCE REVIEWS ====================
  @Get("performance-reviews")
  @ApiOperation({ summary: "List performance reviews" })
  findPerformanceReviews(@Query("employeeId") employeeId?: string) {
    return this.hrService.findPerformanceReviews(employeeId ? +employeeId : undefined);
  }

  @Get("performance-reviews/:id")
  @ApiOperation({ summary: "Get performance review by ID" })
  findOnePerformanceReview(@Param("id") id: string) {
    return this.hrService.findOnePerformanceReview(+id);
  }

  @Post("performance-reviews")
  @ApiOperation({ summary: "Create a performance review" })
  createPerformanceReview(@Body() data: any) {
    return this.hrService.createPerformanceReview(data);
  }

  @Put("performance-reviews/:id")
  @ApiOperation({ summary: "Update a performance review" })
  updatePerformanceReview(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updatePerformanceReview(+id, data);
  }

  @Delete("performance-reviews/:id")
  @ApiOperation({ summary: "Delete a performance review" })
  deletePerformanceReview(@Param("id") id: string) {
    return this.hrService.deletePerformanceReview(+id);
  }

  // ==================== VACATION ACCRUAL RULES ====================
  @Get("accrual-rules")
  @ApiOperation({ summary: "List vacation accrual rules" })
  findAccrualRules(@Query("employeeId") employeeId?: string) {
    return this.hrService.findAccrualRules(employeeId ? +employeeId : undefined);
  }

  @Get("accrual-rules/:id")
  @ApiOperation({ summary: "Get vacation accrual rule by ID" })
  findOneAccrualRule(@Param("id") id: string) {
    return this.hrService.findOneAccrualRule(+id);
  }

  @Post("accrual-rules")
  @ApiOperation({ summary: "Create a vacation accrual rule" })
  createAccrualRule(@Body() data: any) {
    return this.hrService.createAccrualRule(data);
  }

  @Put("accrual-rules/:id")
  @ApiOperation({ summary: "Update a vacation accrual rule" })
  updateAccrualRule(@Param("id") id: string, @Body() data: any) {
    return this.hrService.updateAccrualRule(+id, data);
  }

  @Delete("accrual-rules/:id")
  @ApiOperation({ summary: "Delete a vacation accrual rule" })
  deleteAccrualRule(@Param("id") id: string) {
    return this.hrService.deleteAccrualRule(+id);
  }

  @Post("accrual-rules/run")
  @ApiOperation({ summary: "Run vacation accrual for employee or all" })
  runAccrual(@Body("employeeId") employeeId: number, @Body("year") year: number, @Body("month") month: number) {
    if (employeeId) {
      return this.hrService.runAccrualForEmployee(employeeId, year || new Date().getFullYear(), month || new Date().getMonth() + 1);
    }
    return this.hrService.runAccrualForAll(year || new Date().getFullYear(), month || new Date().getMonth() + 1);
  }

  // ==================== HR REPORTS ====================
  @Get("reports/headcount")
  @ApiOperation({ summary: "Headcount report by department, status, gender" })
  getHeadcountReport() {
    return this.hrService.getHeadcountReport();
  }

  @Get("reports/turnover")
  @ApiOperation({ summary: "Employee turnover report" })
  getTurnoverReport() {
    return this.hrService.getTurnoverReport();
  }

  @Get("reports/leave-trends")
  @ApiOperation({ summary: "Leave trends report" })
  getLeaveTrendsReport(@Query("year") year?: string) {
    return this.hrService.getLeaveTrendsReport(year ? +year : undefined);
  }

  // ==================== DOCUMENT GENERATION ====================
  @Get("documents/work-certificate/:employeeId")
  @ApiOperation({ summary: "Generate work certificate (HTML)" })
  async generateWorkCertificate(@Param("employeeId") employeeId: string, @Res() res: any) {
    const html = await this.hrService.generateWorkCertificate(+employeeId);
    res.set({ "Content-Type": "text/html", "Content-Disposition": `attachment; filename="attestation-travail-${employeeId}.html"` });
    res.send(html);
  }

  @Get("documents/employment-contract/:employeeId")
  @ApiOperation({ summary: "Generate employment contract (HTML)" })
  async generateEmploymentContract(@Param("employeeId") employeeId: string, @Res() res: any) {
    const html = await this.hrService.generateEmploymentContract(+employeeId);
    res.set({ "Content-Type": "text/html", "Content-Disposition": `attachment; filename="contrat-travail-${employeeId}.html"` });
    res.send(html);
  }

  @Get("documents/employment-contract/contract/:contractId")
  @ApiOperation({ summary: "Generate employment contract preview by contract ID (HTML)" })
  async generateEmploymentContractByContract(@Param("contractId") contractId: string, @Res() res: any) {
    const html = await this.hrService.generateEmploymentContractByContract(+contractId);
    res.set({ "Content-Type": "text/html", "Content-Disposition": `inline; filename="contrat-travail-${contractId}.html"` });
    res.send(html);
  }
}
