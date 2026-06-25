"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HrController", {
    enumerable: true,
    get: function() {
        return HrController;
    }
});
const _common = require("@nestjs/common");
const _platformexpress = require("@nestjs/platform-express");
const _swagger = require("@nestjs/swagger");
const _hrservice = require("./hr.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
const _createemployeedto = require("./dto/create-employee.dto");
const _updateemployeedto = require("./dto/update-employee.dto");
const _createpositiondto = require("./dto/create-position.dto");
const _updatepositiondto = require("./dto/update-position.dto");
const _createcnssprofiledto = require("./dto/create-cnss-profile.dto");
const _createirpptaxprofiledto = require("./dto/create-irpp-tax-profile.dto");
const _createleavebalancedto = require("./dto/create-leave-balance.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let HrController = class HrController {
    // ==================== EMPLOYEES ====================
    findEmployees(search, departmentId, status, includeDrafts) {
        return this.hrService.findEmployees(search, departmentId ? +departmentId : undefined, status, includeDrafts === "true");
    }
    findOneEmployee(id) {
        return this.hrService.findOneEmployee(+id);
    }
    createEmployee(data) {
        return this.hrService.createEmployee(data);
    }
    createEmployeeDraft(data) {
        return this.hrService.createEmployeeDraft(data || {});
    }
    updateEmployee(id, data) {
        return this.hrService.updateEmployee(+id, data);
    }
    updateEmployeeDraft(id, data) {
        return this.hrService.updateEmployeeDraft(+id, data || {});
    }
    deleteEmployee(id) {
        return this.hrService.deleteEmployee(+id);
    }
    // ==================== POSITIONS ====================
    findPositions() {
        return this.hrService.findPositions();
    }
    findOnePosition(id) {
        return this.hrService.findOnePosition(+id);
    }
    createPosition(data) {
        return this.hrService.createPosition(data);
    }
    updatePosition(id, data) {
        return this.hrService.updatePosition(+id, data);
    }
    deletePosition(id) {
        return this.hrService.deletePosition(+id);
    }
    // ==================== CONTRACTS ====================
    findContracts(employeeId) {
        return this.hrService.findContracts(employeeId ? +employeeId : undefined);
    }
    findOneContract(id) {
        return this.hrService.findOneContract(+id);
    }
    createContract(data) {
        return this.hrService.createContract(data);
    }
    updateContract(id, data) {
        return this.hrService.updateContract(+id, data);
    }
    deleteContract(id) {
        return this.hrService.deleteContract(+id);
    }
    setContractActive(id) {
        return this.hrService.setContractActive(+id);
    }
    archiveContract(id) {
        return this.hrService.archiveContract(+id);
    }
    terminateContract(id, data) {
        return this.hrService.terminateContract(+id, data || {});
    }
    renewContract(id, data) {
        return this.hrService.renewContract(+id, data);
    }
    // ==================== ATTENDANCE ====================
    findAttendance(employeeId, startDate, endDate) {
        return this.hrService.findAttendance(employeeId ? +employeeId : undefined, startDate, endDate);
    }
    logAttendance(data) {
        return this.hrService.logAttendance(data);
    }
    deleteAttendance(id) {
        return this.hrService.deleteAttendance(+id);
    }
    // ==================== LEAVE TYPES ====================
    findLeaveTypes() {
        return this.hrService.findLeaveTypes();
    }
    findOneLeaveType(id) {
        return this.hrService.findOneLeaveType(+id);
    }
    createLeaveType(data) {
        return this.hrService.createLeaveType(data);
    }
    updateLeaveType(id, data) {
        return this.hrService.updateLeaveType(+id, data);
    }
    deleteLeaveType(id) {
        return this.hrService.deleteLeaveType(+id);
    }
    // ==================== LEAVE REQUESTS ====================
    findLeaveRequests(employeeId, status) {
        return this.hrService.findLeaveRequests(employeeId ? +employeeId : undefined, status);
    }
    findOneLeaveRequest(id) {
        return this.hrService.findOneLeaveRequest(+id);
    }
    createLeaveRequest(data) {
        return this.hrService.createLeaveRequest(data);
    }
    updateLeaveRequest(id, data) {
        return this.hrService.updateLeaveRequest(+id, data);
    }
    deleteLeaveRequest(id) {
        return this.hrService.deleteLeaveRequest(+id);
    }
    // ==================== EMPLOYEE DOCUMENTS ====================
    findDocuments(employeeId) {
        return this.hrService.findDocuments(employeeId ? +employeeId : undefined);
    }
    findOneDocument(id) {
        return this.hrService.findOneDocument(+id);
    }
    createDocument(file, employeeId, documentType, expiryDate, notes) {
        return this.hrService.createDocument(file, {
            employeeId: +employeeId,
            documentType,
            expiryDate: expiryDate || null,
            notes: notes || null
        });
    }
    updateDocument(id, data) {
        return this.hrService.updateDocument(+id, data);
    }
    deleteDocument(id) {
        return this.hrService.deleteDocument(+id);
    }
    // ==================== CNSS PROFILES ====================
    findCnssProfiles() {
        return this.hrService.findCnssProfiles();
    }
    findOneCnssProfileByEmployee(employeeId) {
        return this.hrService.findOneCnssProfileByEmployee(+employeeId);
    }
    createOrUpdateCnssProfile(employeeId, data) {
        return this.hrService.createOrUpdateCnssProfile(+employeeId, data);
    }
    // ==================== IRPP TAX PROFILES ====================
    findIrppTaxProfiles() {
        return this.hrService.findIrppTaxProfiles();
    }
    findOneIrppTaxProfileByEmployee(employeeId) {
        return this.hrService.findOneIrppTaxProfileByEmployee(+employeeId);
    }
    createOrUpdateIrppTaxProfile(employeeId, data) {
        return this.hrService.createOrUpdateIrppTaxProfile(+employeeId, data);
    }
    // ==================== SHIFTS ====================
    findShifts() {
        return this.hrService.findShifts();
    }
    findOneShift(id) {
        return this.hrService.findOneShift(+id);
    }
    createShift(data) {
        return this.hrService.createShift(data);
    }
    updateShift(id, data) {
        return this.hrService.updateShift(+id, data);
    }
    deleteShift(id) {
        return this.hrService.deleteShift(+id);
    }
    // ==================== SHIFT ASSIGNMENTS ====================
    findShiftAssignments(employeeId) {
        return this.hrService.findShiftAssignments(employeeId ? +employeeId : undefined);
    }
    findOneShiftAssignment(id) {
        return this.hrService.findOneShiftAssignment(+id);
    }
    createShiftAssignment(data) {
        return this.hrService.createShiftAssignment(data);
    }
    updateShiftAssignment(id, data) {
        return this.hrService.updateShiftAssignment(+id, data);
    }
    deleteShiftAssignment(id) {
        return this.hrService.deleteShiftAssignment(+id);
    }
    // ==================== HR SETTINGS ====================
    getHrSettings() {
        return this.hrService.getHrSettings();
    }
    updateHrSettings(data) {
        return this.hrService.updateHrSettings(data);
    }
    // ==================== OVERTIME REQUESTS ====================
    findOvertimeRequests(employeeId, status) {
        return this.hrService.findOvertimeRequests(employeeId ? +employeeId : undefined, status);
    }
    findOneOvertimeRequest(id) {
        return this.hrService.findOneOvertimeRequest(+id);
    }
    createOvertimeRequest(data) {
        return this.hrService.createOvertimeRequest(data);
    }
    updateOvertimeRequest(id, data) {
        return this.hrService.updateOvertimeRequest(+id, data);
    }
    async approveOvertime(id, req) {
        const userEmail = req.user?.email;
        if (!userEmail) throw new Error("User email not found");
        const emp = await this.hrService.findEmployeeByEmail(userEmail);
        if (!emp) throw new Error("No employee record found for current user");
        return this.hrService.approveOvertime(+id, emp.id);
    }
    rejectOvertime(id) {
        return this.hrService.rejectOvertime(+id);
    }
    deleteOvertimeRequest(id) {
        return this.hrService.deleteOvertimeRequest(+id);
    }
    findEmployeeByEmail(email) {
        return this.hrService.findEmployeeByEmail(email);
    }
    // ==================== LEAVE BALANCES ====================
    findLeaveBalances(employeeId, year) {
        return this.hrService.findLeaveBalances(employeeId ? +employeeId : undefined, year ? +year : undefined);
    }
    findOneLeaveBalance(id) {
        return this.hrService.findOneLeaveBalance(+id);
    }
    createLeaveBalance(data) {
        return this.hrService.createLeaveBalance(data);
    }
    updateLeaveBalance(id, data) {
        return this.hrService.updateLeaveBalance(+id, data);
    }
    deleteLeaveBalance(id) {
        return this.hrService.deleteLeaveBalance(+id);
    }
    rolloverLeaveBalances(year) {
        return this.hrService.rolloverLeaveBalances(+year);
    }
    syncLeaveBalances() {
        return this.hrService.syncLeaveBalances();
    }
    // ==================== KPIs ====================
    findKpis() {
        return this.hrService.findKpis();
    }
    findOneKpi(id) {
        return this.hrService.findOneKpi(+id);
    }
    createKpi(data) {
        return this.hrService.createKpi(data);
    }
    updateKpi(id, data) {
        return this.hrService.updateKpi(+id, data);
    }
    deleteKpi(id) {
        return this.hrService.deleteKpi(+id);
    }
    // ==================== KPI ASSIGNMENTS ====================
    findKpiAssignments(employeeId) {
        return this.hrService.findKpiAssignments(employeeId ? +employeeId : undefined);
    }
    findOneKpiAssignment(id) {
        return this.hrService.findOneKpiAssignment(+id);
    }
    createKpiAssignment(data) {
        return this.hrService.createKpiAssignment(data);
    }
    updateKpiAssignment(id, data) {
        return this.hrService.updateKpiAssignment(+id, data);
    }
    deleteKpiAssignment(id) {
        return this.hrService.deleteKpiAssignment(+id);
    }
    // ==================== GOALS ====================
    findGoals(employeeId, status) {
        return this.hrService.findGoals(employeeId ? +employeeId : undefined, status);
    }
    findOneGoal(id) {
        return this.hrService.findOneGoal(+id);
    }
    createGoal(data) {
        return this.hrService.createGoal(data);
    }
    updateGoal(id, data) {
        return this.hrService.updateGoal(+id, data);
    }
    deleteGoal(id) {
        return this.hrService.deleteGoal(+id);
    }
    // ==================== PERFORMANCE REVIEWS ====================
    findPerformanceReviews(employeeId) {
        return this.hrService.findPerformanceReviews(employeeId ? +employeeId : undefined);
    }
    findOnePerformanceReview(id) {
        return this.hrService.findOnePerformanceReview(+id);
    }
    createPerformanceReview(data) {
        return this.hrService.createPerformanceReview(data);
    }
    updatePerformanceReview(id, data) {
        return this.hrService.updatePerformanceReview(+id, data);
    }
    deletePerformanceReview(id) {
        return this.hrService.deletePerformanceReview(+id);
    }
    // ==================== VACATION ACCRUAL RULES ====================
    findAccrualRules(employeeId) {
        return this.hrService.findAccrualRules(employeeId ? +employeeId : undefined);
    }
    findOneAccrualRule(id) {
        return this.hrService.findOneAccrualRule(+id);
    }
    createAccrualRule(data) {
        return this.hrService.createAccrualRule(data);
    }
    updateAccrualRule(id, data) {
        return this.hrService.updateAccrualRule(+id, data);
    }
    deleteAccrualRule(id) {
        return this.hrService.deleteAccrualRule(+id);
    }
    runAccrual(employeeId, year, month) {
        if (employeeId) {
            return this.hrService.runAccrualForEmployee(employeeId, year || new Date().getFullYear(), month || new Date().getMonth() + 1);
        }
        return this.hrService.runAccrualForAll(year || new Date().getFullYear(), month || new Date().getMonth() + 1);
    }
    // ==================== HR REPORTS ====================
    getHeadcountReport() {
        return this.hrService.getHeadcountReport();
    }
    getTurnoverReport() {
        return this.hrService.getTurnoverReport();
    }
    getLeaveTrendsReport(year) {
        return this.hrService.getLeaveTrendsReport(year ? +year : undefined);
    }
    // ==================== DOCUMENT GENERATION ====================
    async generateWorkCertificate(employeeId, res) {
        const html = await this.hrService.generateWorkCertificate(+employeeId);
        res.set({
            "Content-Type": "text/html",
            "Content-Disposition": `attachment; filename="attestation-travail-${employeeId}.html"`
        });
        res.send(html);
    }
    async generateEmploymentContract(employeeId, res) {
        const html = await this.hrService.generateEmploymentContract(+employeeId);
        res.set({
            "Content-Type": "text/html",
            "Content-Disposition": `attachment; filename="contrat-travail-${employeeId}.html"`
        });
        res.send(html);
    }
    async generateEmploymentContractByContract(contractId, res) {
        const html = await this.hrService.generateEmploymentContractByContract(+contractId);
        res.set({
            "Content-Type": "text/html",
            "Content-Disposition": `inline; filename="contrat-travail-${contractId}.html"`
        });
        res.send(html);
    }
    constructor(hrService){
        this.hrService = hrService;
    }
};
_ts_decorate([
    (0, _common.Get)("employees"),
    (0, _swagger.ApiOperation)({
        summary: "List all employees"
    }),
    _ts_param(0, (0, _common.Query)("search")),
    _ts_param(1, (0, _common.Query)("departmentId")),
    _ts_param(2, (0, _common.Query)("status")),
    _ts_param(3, (0, _common.Query)("includeDrafts")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findEmployees", null);
_ts_decorate([
    (0, _common.Get)("employees/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get employee by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneEmployee", null);
_ts_decorate([
    (0, _common.Post)("employees"),
    (0, _swagger.ApiOperation)({
        summary: "Create a new employee"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createemployeedto.CreateEmployeeDto === "undefined" ? Object : _createemployeedto.CreateEmployeeDto
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createEmployee", null);
_ts_decorate([
    (0, _common.Post)("employees/draft"),
    (0, _swagger.ApiOperation)({
        summary: "Create employee draft with partial data"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createEmployeeDraft", null);
_ts_decorate([
    (0, _common.Put)("employees/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update an employee"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateemployeedto.UpdateEmployeeDto === "undefined" ? Object : _updateemployeedto.UpdateEmployeeDto
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateEmployee", null);
_ts_decorate([
    (0, _common.Put)("employees/:id/draft"),
    (0, _swagger.ApiOperation)({
        summary: "Update employee draft with partial data"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateEmployeeDraft", null);
_ts_decorate([
    (0, _common.Delete)("employees/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete an employee"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteEmployee", null);
_ts_decorate([
    (0, _common.Get)("positions"),
    (0, _swagger.ApiOperation)({
        summary: "List all positions"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findPositions", null);
_ts_decorate([
    (0, _common.Get)("positions/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get position by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOnePosition", null);
_ts_decorate([
    (0, _common.Post)("positions"),
    (0, _swagger.ApiOperation)({
        summary: "Create a new position"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpositiondto.CreatePositionDto === "undefined" ? Object : _createpositiondto.CreatePositionDto
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createPosition", null);
_ts_decorate([
    (0, _common.Put)("positions/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a position"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatepositiondto.UpdatePositionDto === "undefined" ? Object : _updatepositiondto.UpdatePositionDto
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updatePosition", null);
_ts_decorate([
    (0, _common.Delete)("positions/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a position"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deletePosition", null);
_ts_decorate([
    (0, _common.Get)("contracts"),
    (0, _swagger.ApiOperation)({
        summary: "List all contracts"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findContracts", null);
_ts_decorate([
    (0, _common.Get)("contracts/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get contract by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneContract", null);
_ts_decorate([
    (0, _common.Post)("contracts"),
    (0, _swagger.ApiOperation)({
        summary: "Create a contract"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createContract", null);
_ts_decorate([
    (0, _common.Put)("contracts/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a contract"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateContract", null);
_ts_decorate([
    (0, _common.Delete)("contracts/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a contract"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteContract", null);
_ts_decorate([
    (0, _common.Post)("contracts/:id/set-active"),
    (0, _swagger.ApiOperation)({
        summary: "Set contract as active"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "setContractActive", null);
_ts_decorate([
    (0, _common.Post)("contracts/:id/archive"),
    (0, _swagger.ApiOperation)({
        summary: "Archive contract"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "archiveContract", null);
_ts_decorate([
    (0, _common.Post)("contracts/:id/terminate"),
    (0, _swagger.ApiOperation)({
        summary: "Terminate or end contract"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "terminateContract", null);
_ts_decorate([
    (0, _common.Post)("contracts/:id/renew"),
    (0, _swagger.ApiOperation)({
        summary: "Renew contract by creating a follow-up draft"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "renewContract", null);
_ts_decorate([
    (0, _common.Get)("attendance"),
    (0, _swagger.ApiOperation)({
        summary: "List attendance records"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_param(1, (0, _common.Query)("startDate")),
    _ts_param(2, (0, _common.Query)("endDate")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findAttendance", null);
_ts_decorate([
    (0, _common.Post)("attendance"),
    (0, _swagger.ApiOperation)({
        summary: "Log attendance"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "logAttendance", null);
_ts_decorate([
    (0, _common.Delete)("attendance/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete attendance record"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteAttendance", null);
_ts_decorate([
    (0, _common.Get)("leave-types"),
    (0, _swagger.ApiOperation)({
        summary: "List all leave types"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findLeaveTypes", null);
_ts_decorate([
    (0, _common.Get)("leave-types/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get leave type by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneLeaveType", null);
_ts_decorate([
    (0, _common.Post)("leave-types"),
    (0, _swagger.ApiOperation)({
        summary: "Create a leave type"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createLeaveType", null);
_ts_decorate([
    (0, _common.Put)("leave-types/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a leave type"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateLeaveType", null);
_ts_decorate([
    (0, _common.Delete)("leave-types/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a leave type"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteLeaveType", null);
_ts_decorate([
    (0, _common.Get)("leave-requests"),
    (0, _swagger.ApiOperation)({
        summary: "List leave requests"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_param(1, (0, _common.Query)("status")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findLeaveRequests", null);
_ts_decorate([
    (0, _common.Get)("leave-requests/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get leave request by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneLeaveRequest", null);
_ts_decorate([
    (0, _common.Post)("leave-requests"),
    (0, _swagger.ApiOperation)({
        summary: "Create a leave request"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createLeaveRequest", null);
_ts_decorate([
    (0, _common.Put)("leave-requests/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a leave request"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateLeaveRequest", null);
_ts_decorate([
    (0, _common.Delete)("leave-requests/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a leave request"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteLeaveRequest", null);
_ts_decorate([
    (0, _common.Get)("documents"),
    (0, _swagger.ApiOperation)({
        summary: "List employee documents"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findDocuments", null);
_ts_decorate([
    (0, _common.Get)("documents/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get document by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneDocument", null);
_ts_decorate([
    (0, _common.Post)("documents"),
    (0, _swagger.ApiOperation)({
        summary: "Upload an employee document"
    }),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)("file")),
    _ts_param(0, (0, _common.UploadedFile)()),
    _ts_param(1, (0, _common.Body)("employeeId")),
    _ts_param(2, (0, _common.Body)("documentType")),
    _ts_param(3, (0, _common.Body)("expiryDate")),
    _ts_param(4, (0, _common.Body)("notes")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File,
        String,
        String,
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createDocument", null);
_ts_decorate([
    (0, _common.Put)("documents/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update document metadata"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateDocument", null);
_ts_decorate([
    (0, _common.Delete)("documents/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a document"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteDocument", null);
_ts_decorate([
    (0, _common.Get)("cnss-profiles"),
    (0, _swagger.ApiOperation)({
        summary: "List all CNSS profiles"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findCnssProfiles", null);
_ts_decorate([
    (0, _common.Get)("cnss-profiles/employee/:employeeId"),
    (0, _swagger.ApiOperation)({
        summary: "Get CNSS profile by employee ID"
    }),
    _ts_param(0, (0, _common.Param)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneCnssProfileByEmployee", null);
_ts_decorate([
    (0, _common.Post)("cnss-profiles/employee/:employeeId"),
    (0, _swagger.ApiOperation)({
        summary: "Create or update CNSS profile for an employee"
    }),
    _ts_param(0, (0, _common.Param)("employeeId")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _createcnssprofiledto.CreateCnssProfileDto === "undefined" ? Object : _createcnssprofiledto.CreateCnssProfileDto
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createOrUpdateCnssProfile", null);
_ts_decorate([
    (0, _common.Get)("irpp-tax-profiles"),
    (0, _swagger.ApiOperation)({
        summary: "List all IRPP tax profiles"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findIrppTaxProfiles", null);
_ts_decorate([
    (0, _common.Get)("irpp-tax-profiles/employee/:employeeId"),
    (0, _swagger.ApiOperation)({
        summary: "Get IRPP tax profile by employee ID"
    }),
    _ts_param(0, (0, _common.Param)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneIrppTaxProfileByEmployee", null);
_ts_decorate([
    (0, _common.Post)("irpp-tax-profiles/employee/:employeeId"),
    (0, _swagger.ApiOperation)({
        summary: "Create or update IRPP tax profile for an employee"
    }),
    _ts_param(0, (0, _common.Param)("employeeId")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _createirpptaxprofiledto.CreateIrppTaxProfileDto === "undefined" ? Object : _createirpptaxprofiledto.CreateIrppTaxProfileDto
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createOrUpdateIrppTaxProfile", null);
_ts_decorate([
    (0, _common.Get)("shifts"),
    (0, _swagger.ApiOperation)({
        summary: "List all shifts"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findShifts", null);
_ts_decorate([
    (0, _common.Get)("shifts/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get shift by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneShift", null);
_ts_decorate([
    (0, _common.Post)("shifts"),
    (0, _swagger.ApiOperation)({
        summary: "Create a shift"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createShift", null);
_ts_decorate([
    (0, _common.Put)("shifts/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a shift"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateShift", null);
_ts_decorate([
    (0, _common.Delete)("shifts/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a shift"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteShift", null);
_ts_decorate([
    (0, _common.Get)("shift-assignments"),
    (0, _swagger.ApiOperation)({
        summary: "List shift assignments"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findShiftAssignments", null);
_ts_decorate([
    (0, _common.Get)("shift-assignments/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get shift assignment by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneShiftAssignment", null);
_ts_decorate([
    (0, _common.Post)("shift-assignments"),
    (0, _swagger.ApiOperation)({
        summary: "Create a shift assignment"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createShiftAssignment", null);
_ts_decorate([
    (0, _common.Put)("shift-assignments/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a shift assignment"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateShiftAssignment", null);
_ts_decorate([
    (0, _common.Delete)("shift-assignments/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a shift assignment"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteShiftAssignment", null);
_ts_decorate([
    (0, _common.Get)("hr-settings"),
    (0, _swagger.ApiOperation)({
        summary: "Get HR settings (overtime rates, night hours)"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "getHrSettings", null);
_ts_decorate([
    (0, _common.Put)("hr-settings"),
    (0, _swagger.ApiOperation)({
        summary: "Update HR settings"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateHrSettings", null);
_ts_decorate([
    (0, _common.Get)("overtime-requests"),
    (0, _swagger.ApiOperation)({
        summary: "List overtime requests"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_param(1, (0, _common.Query)("status")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOvertimeRequests", null);
_ts_decorate([
    (0, _common.Get)("overtime-requests/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get overtime request by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneOvertimeRequest", null);
_ts_decorate([
    (0, _common.Post)("overtime-requests"),
    (0, _swagger.ApiOperation)({
        summary: "Create an overtime request"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createOvertimeRequest", null);
_ts_decorate([
    (0, _common.Put)("overtime-requests/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update an overtime request"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateOvertimeRequest", null);
_ts_decorate([
    (0, _common.Post)("overtime-requests/:id/approve"),
    (0, _swagger.ApiOperation)({
        summary: "Approve an overtime request"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], HrController.prototype, "approveOvertime", null);
_ts_decorate([
    (0, _common.Post)("overtime-requests/:id/reject"),
    (0, _swagger.ApiOperation)({
        summary: "Reject an overtime request"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "rejectOvertime", null);
_ts_decorate([
    (0, _common.Delete)("overtime-requests/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete an overtime request"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteOvertimeRequest", null);
_ts_decorate([
    (0, _common.Get)("employee-by-email/:email"),
    (0, _swagger.ApiOperation)({
        summary: "Find employee by email (for current user lookup)"
    }),
    _ts_param(0, (0, _common.Param)("email")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findEmployeeByEmail", null);
_ts_decorate([
    (0, _common.Get)("leave-balances"),
    (0, _swagger.ApiOperation)({
        summary: "List leave balances"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_param(1, (0, _common.Query)("year")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findLeaveBalances", null);
_ts_decorate([
    (0, _common.Get)("leave-balances/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get leave balance by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneLeaveBalance", null);
_ts_decorate([
    (0, _common.Post)("leave-balances"),
    (0, _swagger.ApiOperation)({
        summary: "Create a leave balance"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createleavebalancedto.CreateLeaveBalanceDto === "undefined" ? Object : _createleavebalancedto.CreateLeaveBalanceDto
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createLeaveBalance", null);
_ts_decorate([
    (0, _common.Put)("leave-balances/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a leave balance"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateLeaveBalance", null);
_ts_decorate([
    (0, _common.Delete)("leave-balances/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a leave balance"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteLeaveBalance", null);
_ts_decorate([
    (0, _common.Post)("leave-balances/rollover/:year"),
    (0, _swagger.ApiOperation)({
        summary: "Rollover leave balances to next year (carry forward or cash out)"
    }),
    _ts_param(0, (0, _common.Param)("year")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "rolloverLeaveBalances", null);
_ts_decorate([
    (0, _common.Post)("leave-balances/sync"),
    (0, _swagger.ApiOperation)({
        summary: "Backfill carriedForwardDays from previous year's remaining balance"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "syncLeaveBalances", null);
_ts_decorate([
    (0, _common.Get)("kpis"),
    (0, _swagger.ApiOperation)({
        summary: "List all KPIs"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findKpis", null);
_ts_decorate([
    (0, _common.Get)("kpis/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get KPI by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneKpi", null);
_ts_decorate([
    (0, _common.Post)("kpis"),
    (0, _swagger.ApiOperation)({
        summary: "Create a KPI"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createKpi", null);
_ts_decorate([
    (0, _common.Put)("kpis/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a KPI"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateKpi", null);
_ts_decorate([
    (0, _common.Delete)("kpis/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a KPI"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteKpi", null);
_ts_decorate([
    (0, _common.Get)("kpi-assignments"),
    (0, _swagger.ApiOperation)({
        summary: "List KPI assignments"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findKpiAssignments", null);
_ts_decorate([
    (0, _common.Get)("kpi-assignments/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get KPI assignment by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneKpiAssignment", null);
_ts_decorate([
    (0, _common.Post)("kpi-assignments"),
    (0, _swagger.ApiOperation)({
        summary: "Create a KPI assignment"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createKpiAssignment", null);
_ts_decorate([
    (0, _common.Put)("kpi-assignments/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a KPI assignment"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateKpiAssignment", null);
_ts_decorate([
    (0, _common.Delete)("kpi-assignments/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a KPI assignment"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteKpiAssignment", null);
_ts_decorate([
    (0, _common.Get)("goals"),
    (0, _swagger.ApiOperation)({
        summary: "List goals"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_param(1, (0, _common.Query)("status")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findGoals", null);
_ts_decorate([
    (0, _common.Get)("goals/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get goal by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneGoal", null);
_ts_decorate([
    (0, _common.Post)("goals"),
    (0, _swagger.ApiOperation)({
        summary: "Create a goal"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createGoal", null);
_ts_decorate([
    (0, _common.Put)("goals/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a goal"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateGoal", null);
_ts_decorate([
    (0, _common.Delete)("goals/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a goal"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteGoal", null);
_ts_decorate([
    (0, _common.Get)("performance-reviews"),
    (0, _swagger.ApiOperation)({
        summary: "List performance reviews"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findPerformanceReviews", null);
_ts_decorate([
    (0, _common.Get)("performance-reviews/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get performance review by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOnePerformanceReview", null);
_ts_decorate([
    (0, _common.Post)("performance-reviews"),
    (0, _swagger.ApiOperation)({
        summary: "Create a performance review"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createPerformanceReview", null);
_ts_decorate([
    (0, _common.Put)("performance-reviews/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a performance review"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updatePerformanceReview", null);
_ts_decorate([
    (0, _common.Delete)("performance-reviews/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a performance review"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deletePerformanceReview", null);
_ts_decorate([
    (0, _common.Get)("accrual-rules"),
    (0, _swagger.ApiOperation)({
        summary: "List vacation accrual rules"
    }),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findAccrualRules", null);
_ts_decorate([
    (0, _common.Get)("accrual-rules/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Get vacation accrual rule by ID"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "findOneAccrualRule", null);
_ts_decorate([
    (0, _common.Post)("accrual-rules"),
    (0, _swagger.ApiOperation)({
        summary: "Create a vacation accrual rule"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "createAccrualRule", null);
_ts_decorate([
    (0, _common.Put)("accrual-rules/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Update a vacation accrual rule"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "updateAccrualRule", null);
_ts_decorate([
    (0, _common.Delete)("accrual-rules/:id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete a vacation accrual rule"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "deleteAccrualRule", null);
_ts_decorate([
    (0, _common.Post)("accrual-rules/run"),
    (0, _swagger.ApiOperation)({
        summary: "Run vacation accrual for employee or all"
    }),
    _ts_param(0, (0, _common.Body)("employeeId")),
    _ts_param(1, (0, _common.Body)("year")),
    _ts_param(2, (0, _common.Body)("month")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "runAccrual", null);
_ts_decorate([
    (0, _common.Get)("reports/headcount"),
    (0, _swagger.ApiOperation)({
        summary: "Headcount report by department, status, gender"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "getHeadcountReport", null);
_ts_decorate([
    (0, _common.Get)("reports/turnover"),
    (0, _swagger.ApiOperation)({
        summary: "Employee turnover report"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "getTurnoverReport", null);
_ts_decorate([
    (0, _common.Get)("reports/leave-trends"),
    (0, _swagger.ApiOperation)({
        summary: "Leave trends report"
    }),
    _ts_param(0, (0, _common.Query)("year")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], HrController.prototype, "getLeaveTrendsReport", null);
_ts_decorate([
    (0, _common.Get)("documents/work-certificate/:employeeId"),
    (0, _swagger.ApiOperation)({
        summary: "Generate work certificate (HTML)"
    }),
    _ts_param(0, (0, _common.Param)("employeeId")),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], HrController.prototype, "generateWorkCertificate", null);
_ts_decorate([
    (0, _common.Get)("documents/employment-contract/:employeeId"),
    (0, _swagger.ApiOperation)({
        summary: "Generate employment contract (HTML)"
    }),
    _ts_param(0, (0, _common.Param)("employeeId")),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], HrController.prototype, "generateEmploymentContract", null);
_ts_decorate([
    (0, _common.Get)("documents/employment-contract/contract/:contractId"),
    (0, _swagger.ApiOperation)({
        summary: "Generate employment contract preview by contract ID (HTML)"
    }),
    _ts_param(0, (0, _common.Param)("contractId")),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], HrController.prototype, "generateEmploymentContractByContract", null);
HrController = _ts_decorate([
    (0, _swagger.ApiTags)("HR"),
    (0, _common.Controller)("hr"),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _hrservice.HrService === "undefined" ? Object : _hrservice.HrService
    ])
], HrController);

//# sourceMappingURL=hr.controller.js.map