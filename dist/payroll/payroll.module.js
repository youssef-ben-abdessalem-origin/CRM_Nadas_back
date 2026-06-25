"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PayrollModule", {
    enumerable: true,
    get: function() {
        return PayrollModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _payrollservice = require("./payroll.service");
const _payrollcontroller = require("./payroll.controller");
const _salarycomponententity = require("./entities/salary-component.entity");
const _employeesalarycomponententity = require("./entities/employee-salary-component.entity");
const _payrollprofileentity = require("./entities/payroll-profile.entity");
const _payrollperiodentity = require("./entities/payroll-period.entity");
const _payslipentity = require("./entities/payslip.entity");
const _payslipdetailentity = require("./entities/payslip-detail.entity");
const _loanentity = require("./entities/loan.entity");
const _advanceentity = require("./entities/advance.entity");
const _payrollsettingsentity = require("./entities/payroll-settings.entity");
const _cnssdeclarationentity = require("./entities/cnss-declaration.entity");
const _irppdeclarationentity = require("./entities/irpp-declaration.entity");
const _banktransferfileentity = require("./entities/bank-transfer-file.entity");
const _employeeentity = require("../hr/entities/employee.entity");
const _contractentity = require("../hr/entities/contract.entity");
const _attendanceentity = require("../hr/entities/attendance.entity");
const _overtimerequestentity = require("../hr/entities/overtime-request.entity");
const _hrsettingsentity = require("../hr/entities/hr-settings.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PayrollModule = class PayrollModule {
};
PayrollModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _salarycomponententity.SalaryComponent,
                _employeesalarycomponententity.EmployeeSalaryComponent,
                _payrollprofileentity.PayrollProfile,
                _payrollperiodentity.PayrollPeriod,
                _payslipentity.Payslip,
                _payslipdetailentity.PayslipDetail,
                _loanentity.Loan,
                _advanceentity.Advance,
                _payrollsettingsentity.PayrollSettings,
                _cnssdeclarationentity.CnssDeclaration,
                _irppdeclarationentity.IrppDeclaration,
                _banktransferfileentity.BankTransferFile,
                _employeeentity.Employee,
                _contractentity.Contract,
                _attendanceentity.Attendance,
                _overtimerequestentity.OvertimeRequest,
                _hrsettingsentity.HrSettings
            ])
        ],
        controllers: [
            _payrollcontroller.PayrollController
        ],
        providers: [
            _payrollservice.PayrollService
        ],
        exports: [
            _payrollservice.PayrollService,
            _typeorm.TypeOrmModule
        ]
    })
], PayrollModule);

//# sourceMappingURL=payroll.module.js.map