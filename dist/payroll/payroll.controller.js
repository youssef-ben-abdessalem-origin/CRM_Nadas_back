"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PayrollController", {
    enumerable: true,
    get: function() {
        return PayrollController;
    }
});
const _common = require("@nestjs/common");
const _payrollservice = require("./payroll.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
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
let PayrollController = class PayrollController {
    // ==================== SALARY COMPONENTS ====================
    findComponents() {
        return this.payrollService.findComponents();
    }
    findOneComponent(id) {
        return this.payrollService.findOneComponent(+id);
    }
    createComponent(data) {
        return this.payrollService.createComponent(data);
    }
    updateComponent(id, data) {
        return this.payrollService.updateComponent(+id, data);
    }
    deleteComponent(id) {
        return this.payrollService.deleteComponent(+id);
    }
    // ==================== EMPLOYEE SALARY COMPONENTS ====================
    findEmployeeComponents(employeeId) {
        return this.payrollService.findEmployeeComponents(employeeId ? +employeeId : undefined);
    }
    createEmployeeComponent(data) {
        return this.payrollService.createEmployeeComponent(data);
    }
    updateEmployeeComponent(id, data) {
        return this.payrollService.updateEmployeeComponent(+id, data);
    }
    deleteEmployeeComponent(id) {
        return this.payrollService.deleteEmployeeComponent(+id);
    }
    // ==================== PAYROLL PROFILES ====================
    findProfiles() {
        return this.payrollService.findProfiles();
    }
    findOneProfileByEmployee(employeeId) {
        return this.payrollService.findOneProfileByEmployee(+employeeId);
    }
    createOrUpdateProfile(employeeId, data) {
        return this.payrollService.createOrUpdateProfile(+employeeId, data);
    }
    // ==================== PAYROLL PERIODS ====================
    findPeriods() {
        return this.payrollService.findPeriods();
    }
    createPeriod(data) {
        return this.payrollService.createPeriod(data);
    }
    updatePeriod(id, data) {
        return this.payrollService.updatePeriod(+id, data);
    }
    // ==================== LOANS ====================
    findLoans(employeeId) {
        return this.payrollService.findLoans(employeeId ? +employeeId : undefined);
    }
    createLoan(data) {
        return this.payrollService.createLoan(data);
    }
    updateLoan(id, data) {
        return this.payrollService.updateLoan(+id, data);
    }
    // ==================== ADVANCES ====================
    findAdvances(employeeId) {
        return this.payrollService.findAdvances(employeeId ? +employeeId : undefined);
    }
    createAdvance(data) {
        return this.payrollService.createAdvance(data);
    }
    updateAdvance(id, data) {
        return this.payrollService.updateAdvance(+id, data);
    }
    // ==================== PAYROLL SETTINGS ====================
    getSettings() {
        return this.payrollService.getSettings();
    }
    updateSettings(data) {
        return this.payrollService.updateSettings(data);
    }
    // ==================== PAYSLIPS ====================
    findPayslips(periodId, employeeId) {
        return this.payrollService.findPayslips(periodId ? +periodId : undefined, employeeId ? +employeeId : undefined);
    }
    findOnePayslip(id) {
        return this.payrollService.findOnePayslip(+id);
    }
    generatePayslipsForPeriod(periodId) {
        return this.payrollService.generatePayslipsForPeriod(periodId);
    }
    approvePayslip(id) {
        return this.payrollService.approvePayslip(+id);
    }
    payPayslip(id) {
        return this.payrollService.payPayslip(+id);
    }
    // ==================== CNSS DECLARATIONS ====================
    findCnssDeclarations() {
        return this.payrollService.findCnssDeclarations();
    }
    findOneCnssDeclaration(id) {
        return this.payrollService.findOneCnssDeclaration(+id);
    }
    generateCnssDeclaration(periodId) {
        return this.payrollService.generateCnssDeclaration(periodId);
    }
    // ==================== BANK TRANSFER FILES ====================
    findBankTransferFiles() {
        return this.payrollService.findBankTransferFiles();
    }
    findOneBankTransferFile(id) {
        return this.payrollService.findOneBankTransferFile(+id);
    }
    generateBankTransferFile(periodId, format) {
        return this.payrollService.generateBankTransferFile(periodId, format || "sepa");
    }
    // ==================== STC SETTLEMENTS ====================
    findStcSettlements() {
        return this.payrollService.findStcSettlements();
    }
    generateStcSettlement(periodId) {
        return this.payrollService.generateStcSettlement(periodId);
    }
    // ==================== IRPP DECLARATIONS ====================
    findIrppDeclarations() {
        return this.payrollService.findIrppDeclarations();
    }
    findOneIrppDeclaration(id) {
        return this.payrollService.findOneIrppDeclaration(+id);
    }
    generateIrppDeclaration(taxYear) {
        return this.payrollService.generateIrppDeclaration(taxYear);
    }
    // ==================== 13TH MONTH SALARY ====================
    generateThirteenthMonth(periodId) {
        return this.payrollService.generateThirteenthMonth(periodId);
    }
    // ==================== PAYROLL REPORTS ====================
    getPayrollCostReport(periodId) {
        return this.payrollService.getPayrollCostReport(periodId ? +periodId : undefined);
    }
    getDepartmentPayrollCostReport(periodId) {
        return this.payrollService.getDepartmentPayrollCostReport(periodId ? +periodId : undefined);
    }
    getPeriodComparisonReport() {
        return this.payrollService.getPeriodComparisonReport();
    }
    constructor(payrollService){
        this.payrollService = payrollService;
    }
};
_ts_decorate([
    (0, _common.Get)("components"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findComponents", null);
_ts_decorate([
    (0, _common.Get)("components/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findOneComponent", null);
_ts_decorate([
    (0, _common.Post)("components"),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "createComponent", null);
_ts_decorate([
    (0, _common.Put)("components/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "updateComponent", null);
_ts_decorate([
    (0, _common.Delete)("components/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "deleteComponent", null);
_ts_decorate([
    (0, _common.Get)("employee-components"),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findEmployeeComponents", null);
_ts_decorate([
    (0, _common.Post)("employee-components"),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "createEmployeeComponent", null);
_ts_decorate([
    (0, _common.Put)("employee-components/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "updateEmployeeComponent", null);
_ts_decorate([
    (0, _common.Delete)("employee-components/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "deleteEmployeeComponent", null);
_ts_decorate([
    (0, _common.Get)("profiles"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findProfiles", null);
_ts_decorate([
    (0, _common.Get)("profiles/employee/:employeeId"),
    _ts_param(0, (0, _common.Param)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findOneProfileByEmployee", null);
_ts_decorate([
    (0, _common.Post)("profiles/employee/:employeeId"),
    _ts_param(0, (0, _common.Param)("employeeId")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "createOrUpdateProfile", null);
_ts_decorate([
    (0, _common.Get)("periods"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findPeriods", null);
_ts_decorate([
    (0, _common.Post)("periods"),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "createPeriod", null);
_ts_decorate([
    (0, _common.Put)("periods/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "updatePeriod", null);
_ts_decorate([
    (0, _common.Get)("loans"),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findLoans", null);
_ts_decorate([
    (0, _common.Post)("loans"),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "createLoan", null);
_ts_decorate([
    (0, _common.Put)("loans/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "updateLoan", null);
_ts_decorate([
    (0, _common.Get)("advances"),
    _ts_param(0, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findAdvances", null);
_ts_decorate([
    (0, _common.Post)("advances"),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "createAdvance", null);
_ts_decorate([
    (0, _common.Put)("advances/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "updateAdvance", null);
_ts_decorate([
    (0, _common.Get)("settings"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "getSettings", null);
_ts_decorate([
    (0, _common.Put)("settings"),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "updateSettings", null);
_ts_decorate([
    (0, _common.Get)("payslips"),
    _ts_param(0, (0, _common.Query)("periodId")),
    _ts_param(1, (0, _common.Query)("employeeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findPayslips", null);
_ts_decorate([
    (0, _common.Get)("payslips/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findOnePayslip", null);
_ts_decorate([
    (0, _common.Post)("payslips/generate"),
    _ts_param(0, (0, _common.Body)("periodId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "generatePayslipsForPeriod", null);
_ts_decorate([
    (0, _common.Post)("payslips/:id/approve"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "approvePayslip", null);
_ts_decorate([
    (0, _common.Post)("payslips/:id/pay"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "payPayslip", null);
_ts_decorate([
    (0, _common.Get)("cnss-declarations"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findCnssDeclarations", null);
_ts_decorate([
    (0, _common.Get)("cnss-declarations/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findOneCnssDeclaration", null);
_ts_decorate([
    (0, _common.Post)("cnss-declarations/generate"),
    _ts_param(0, (0, _common.Body)("periodId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "generateCnssDeclaration", null);
_ts_decorate([
    (0, _common.Get)("bank-transfers"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findBankTransferFiles", null);
_ts_decorate([
    (0, _common.Get)("bank-transfers/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findOneBankTransferFile", null);
_ts_decorate([
    (0, _common.Post)("bank-transfers/generate"),
    _ts_param(0, (0, _common.Body)("periodId")),
    _ts_param(1, (0, _common.Body)("format")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "generateBankTransferFile", null);
_ts_decorate([
    (0, _common.Get)("stc-settlements"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findStcSettlements", null);
_ts_decorate([
    (0, _common.Post)("stc-settlements/generate"),
    _ts_param(0, (0, _common.Body)("periodId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "generateStcSettlement", null);
_ts_decorate([
    (0, _common.Get)("irpp-declarations"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findIrppDeclarations", null);
_ts_decorate([
    (0, _common.Get)("irpp-declarations/:id"),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "findOneIrppDeclaration", null);
_ts_decorate([
    (0, _common.Post)("irpp-declarations/generate"),
    _ts_param(0, (0, _common.Body)("taxYear")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "generateIrppDeclaration", null);
_ts_decorate([
    (0, _common.Post)("thirteenth-month/generate"),
    _ts_param(0, (0, _common.Body)("periodId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "generateThirteenthMonth", null);
_ts_decorate([
    (0, _common.Get)("reports/cost"),
    _ts_param(0, (0, _common.Query)("periodId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "getPayrollCostReport", null);
_ts_decorate([
    (0, _common.Get)("reports/department-cost"),
    _ts_param(0, (0, _common.Query)("periodId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "getDepartmentPayrollCostReport", null);
_ts_decorate([
    (0, _common.Get)("reports/period-comparison"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PayrollController.prototype, "getPeriodComparisonReport", null);
PayrollController = _ts_decorate([
    (0, _common.Controller)("payroll"),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _payrollservice.PayrollService === "undefined" ? Object : _payrollservice.PayrollService
    ])
], PayrollController);

//# sourceMappingURL=payroll.controller.js.map