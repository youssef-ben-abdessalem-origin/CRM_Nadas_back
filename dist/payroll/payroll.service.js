"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PayrollService", {
    enumerable: true,
    get: function() {
        return PayrollService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
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
const _companysettingsentity = require("../settings/entities/company-settings.entity");
const _attendanceentity = require("../hr/entities/attendance.entity");
const _overtimerequestentity = require("../hr/entities/overtime-request.entity");
const _hrsettingsentity = require("../hr/entities/hr-settings.entity");
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
const DEFAULT_SALARY_COMPONENTS = [
    {
        code: "BASIC_SALARY",
        name: "Basic Salary",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Core monthly fixed salary base."
    },
    {
        code: "GROSS_SALARY",
        name: "Gross Salary",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Reference gross salary total before deductions."
    },
    {
        code: "TRANSPORT_ALLOWANCE",
        name: "Transport Allowance",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Recurring transport allowance."
    },
    {
        code: "HOUSING_ALLOWANCE",
        name: "Housing Allowance",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Recurring housing allowance."
    },
    {
        code: "FOOD_ALLOWANCE",
        name: "Food Allowance",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Meal or food allowance."
    },
    {
        code: "PHONE_ALLOWANCE",
        name: "Phone Allowance",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Recurring telecom or phone allowance."
    },
    {
        code: "RESPONSIBILITY_ALLOWANCE",
        name: "Responsibility Allowance",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Allowance tied to role responsibility."
    },
    {
        code: "PERFORMANCE_BONUS",
        name: "Performance Bonus",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Periodic performance-related bonus."
    },
    {
        code: "ANNUAL_BONUS",
        name: "Annual Bonus",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Annual bonus component."
    },
    {
        code: "ATTENDANCE_BONUS",
        name: "Attendance Bonus",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Attendance-related bonus."
    },
    {
        code: "SENIORITY_BONUS",
        name: "Seniority Bonus",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Prime d'anciennete / seniority bonus."
    },
    {
        code: "OVERTIME_25",
        name: "Overtime 25%",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Overtime compensated at 25% premium."
    },
    {
        code: "OVERTIME_50",
        name: "Overtime 50%",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Overtime compensated at 50% premium."
    },
    {
        code: "OVERTIME_100",
        name: "Overtime 100%",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Overtime compensated at 100% premium."
    },
    {
        code: "COMMISSION",
        name: "Sales Commission",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Sales commission earning."
    },
    {
        code: "SALES_INCENTIVE",
        name: "Sales Incentive",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Sales incentive earning."
    },
    {
        code: "SHIFT_ALLOWANCE",
        name: "Shift Allowance",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Shift differential allowance."
    },
    {
        code: "NIGHT_ALLOWANCE",
        name: "Night Work Allowance",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Night work allowance."
    },
    {
        code: "HAZARD_ALLOWANCE",
        name: "Hazard Allowance",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Hazard or risk allowance."
    },
    {
        code: "TRAVEL_ALLOWANCE",
        name: "Travel Allowance",
        type: "EARNING",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Travel allowance; tax/CNSS treatment may vary by policy."
    },
    {
        code: "MISSION_ALLOWANCE",
        name: "Mission Allowance",
        type: "EARNING",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Mission allowance; tax/CNSS treatment may vary by policy."
    },
    {
        code: "LEAVE_PAYMENT",
        name: "Paid Leave Payment",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Paid leave salary element."
    },
    {
        code: "SICK_LEAVE_PAYMENT",
        name: "Sick Leave Payment",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Sick leave compensation element."
    },
    {
        code: "OTHER_EARNING",
        name: "Other Earnings",
        type: "EARNING",
        taxable: true,
        subjectToCnss: true,
        active: true,
        description: "Catch-all earning component."
    },
    {
        code: "CNSS_EMPLOYEE",
        name: "Employee CNSS Contribution",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Employee social security deduction."
    },
    {
        code: "INCOME_TAX",
        name: "Income Tax (IRPP)",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Employee income tax deduction."
    },
    {
        code: "ADVANCE_SALARY",
        name: "Salary Advance",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Salary advance deduction."
    },
    {
        code: "LOAN_REPAYMENT",
        name: "Loan Repayment",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Loan repayment deduction."
    },
    {
        code: "ABSENCE_DEDUCTION",
        name: "Absence Deduction",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Deduction for unpaid absence."
    },
    {
        code: "LATE_DEDUCTION",
        name: "Late Arrival Deduction",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Deduction for late arrival."
    },
    {
        code: "UNPAID_LEAVE",
        name: "Unpaid Leave Deduction",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Deduction for unpaid leave."
    },
    {
        code: "INSURANCE",
        name: "Insurance Deduction",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Insurance-related deduction."
    },
    {
        code: "UNION_FEE",
        name: "Union Fee",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Union or syndicate fee deduction."
    },
    {
        code: "OTHER_DEDUCTION",
        name: "Other Deduction",
        type: "DEDUCTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Catch-all deduction component."
    },
    {
        code: "CNSS_EMPLOYER",
        name: "Employer CNSS Contribution",
        type: "EMPLOYER_CONTRIBUTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Employer social security contribution."
    },
    {
        code: "WORK_ACCIDENT",
        name: "Work Accident Contribution",
        type: "EMPLOYER_CONTRIBUTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Work accident insurance contribution."
    },
    {
        code: "TRAINING_TAX",
        name: "Training Tax",
        type: "EMPLOYER_CONTRIBUTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "Training tax / TFP employer contribution."
    },
    {
        code: "FOPROLOS",
        name: "FOPROLOS Contribution",
        type: "EMPLOYER_CONTRIBUTION",
        taxable: false,
        subjectToCnss: false,
        active: true,
        description: "FOPROLOS employer contribution."
    }
];
let PayrollService = class PayrollService {
    async onModuleInit() {
        await this.seedDefaultSalaryComponents();
    }
    async seedDefaultSalaryComponents() {
        for (const component of DEFAULT_SALARY_COMPONENTS){
            const existing = await this.componentRepository.findOne({
                where: {
                    code: component.code
                }
            });
            if (!existing) {
                await this.componentRepository.save(this.componentRepository.create(component));
            }
        }
    }
    async getComponentByCodes(...codes) {
        for (const code of codes){
            const component = await this.componentRepository.findOne({
                where: {
                    code
                }
            });
            if (component) return component;
        }
        return null;
    }
    // ==================== SALARY COMPONENTS ====================
    async findComponents() {
        return this.componentRepository.find();
    }
    async findOneComponent(id) {
        const comp = await this.componentRepository.findOne({
            where: {
                id
            }
        });
        if (!comp) throw new _common.NotFoundException("Salary component not found");
        return comp;
    }
    async createComponent(data) {
        const comp = this.componentRepository.create(data);
        return this.componentRepository.save(comp);
    }
    async updateComponent(id, data) {
        const comp = await this.findOneComponent(id);
        Object.assign(comp, data);
        return this.componentRepository.save(comp);
    }
    async deleteComponent(id) {
        const comp = await this.findOneComponent(id);
        await this.componentRepository.remove(comp);
    }
    // ==================== EMPLOYEE SALARY COMPONENTS ====================
    async findEmployeeComponents(employeeId) {
        return this.employeeComponentRepository.find({
            where: employeeId ? {
                employeeId
            } : {},
            relations: [
                "component"
            ]
        });
    }
    async createEmployeeComponent(data) {
        const esc = this.employeeComponentRepository.create(data);
        return this.employeeComponentRepository.save(esc);
    }
    async updateEmployeeComponent(id, data) {
        const esc = await this.employeeComponentRepository.findOne({
            where: {
                id
            }
        });
        if (!esc) throw new _common.NotFoundException("Employee salary component assignment not found");
        Object.assign(esc, data);
        return this.employeeComponentRepository.save(esc);
    }
    async deleteEmployeeComponent(id) {
        const esc = await this.employeeComponentRepository.findOne({
            where: {
                id
            }
        });
        if (!esc) throw new _common.NotFoundException("Employee salary component assignment not found");
        await this.employeeComponentRepository.remove(esc);
    }
    // ==================== PAYROLL PROFILES ====================
    async findProfiles() {
        return this.profileRepository.find({
            relations: [
                "employee"
            ]
        });
    }
    async findOneProfileByEmployee(employeeId) {
        const profile = await this.profileRepository.findOne({
            where: {
                employeeId
            },
            relations: [
                "employee"
            ]
        });
        if (!profile) throw new _common.NotFoundException("Payroll profile not found for employee");
        return profile;
    }
    async createOrUpdateProfile(employeeId, data) {
        let profile = await this.profileRepository.findOne({
            where: {
                employeeId
            }
        });
        if (profile) {
            Object.assign(profile, data);
        } else {
            profile = this.profileRepository.create({
                ...data,
                employeeId
            });
        }
        return this.profileRepository.save(profile);
    }
    // ==================== PAYROLL PERIODS ====================
    async findPeriods() {
        return this.periodRepository.find({
            order: {
                startDate: "DESC"
            }
        });
    }
    async createPeriod(data) {
        const period = this.periodRepository.create(data);
        return this.periodRepository.save(period);
    }
    async updatePeriod(id, data) {
        const period = await this.periodRepository.findOne({
            where: {
                id
            }
        });
        if (!period) throw new _common.NotFoundException("Payroll period not found");
        Object.assign(period, data);
        return this.periodRepository.save(period);
    }
    // ==================== LOANS ====================
    async findLoans(employeeId) {
        return this.loanRepository.find({
            where: employeeId ? {
                employeeId
            } : {},
            relations: [
                "employee"
            ],
            order: {
                startDate: "DESC"
            }
        });
    }
    async createLoan(data) {
        const loan = this.loanRepository.create({
            ...data,
            balance: data.loanAmount
        });
        return this.loanRepository.save(loan);
    }
    async updateLoan(id, data) {
        const loan = await this.loanRepository.findOne({
            where: {
                id
            }
        });
        if (!loan) throw new _common.NotFoundException("Loan not found");
        Object.assign(loan, data);
        return this.loanRepository.save(loan);
    }
    // ==================== ADVANCES ====================
    async findAdvances(employeeId) {
        return this.advanceRepository.find({
            where: employeeId ? {
                employeeId
            } : {},
            relations: [
                "employee"
            ],
            order: {
                requestDate: "DESC"
            }
        });
    }
    async createAdvance(data) {
        const adv = this.advanceRepository.create(data);
        return this.advanceRepository.save(adv);
    }
    async updateAdvance(id, data) {
        const adv = await this.advanceRepository.findOne({
            where: {
                id
            }
        });
        if (!adv) throw new _common.NotFoundException("Advance not found");
        Object.assign(adv, data);
        return this.advanceRepository.save(adv);
    }
    // ==================== PAYROLL SETTINGS ====================
    async getSettings() {
        let settings = await this.settingsRepository.findOne({
            where: {}
        });
        if (!settings) {
            settings = this.settingsRepository.create({
                cnssEmployeeRate: 9.68,
                cnssEmployerRate: 17.07,
                tfpRate: 1.00,
                foprolosRate: 0.50,
                accidentInsuranceRate: 0.40,
                cnssMaxCap: 2730,
                currency: "TND",
                workingDaysMonth: 26,
                overtimeMultiplier: 1.25
            });
            await this.settingsRepository.save(settings);
        }
        return settings;
    }
    async updateSettings(data) {
        const settings = await this.getSettings();
        Object.assign(settings, data);
        return this.settingsRepository.save(settings);
    }
    // ==================== PAYSLIPS & CALCULATIONS ====================
    async findPayslips(periodId, employeeId) {
        return this.payslipRepository.find({
            where: {
                ...periodId ? {
                    payrollPeriodId: periodId
                } : {},
                ...employeeId ? {
                    employeeId
                } : {}
            },
            relations: [
                "employee",
                "employee.department",
                "employee.position",
                "payrollPeriod",
                "details",
                "details.component"
            ],
            order: {
                createdAt: "DESC"
            }
        });
    }
    async findOnePayslip(id) {
        const payslip = await this.payslipRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee",
                "employee.department",
                "employee.position",
                "payrollPeriod",
                "details",
                "details.component"
            ]
        });
        if (!payslip) throw new _common.NotFoundException("Payslip not found");
        return payslip;
    }
    async generatePayslipsForPeriod(periodId) {
        const period = await this.periodRepository.findOne({
            where: {
                id: periodId
            }
        });
        if (!period) throw new _common.NotFoundException("Period not found");
        // Remove existing draft payslips for this period
        await this.payslipRepository.delete({
            payrollPeriodId: periodId,
            status: "Draft"
        });
        // Fetch active employees with active contracts
        const employees = await this.employeeRepository.find({
            where: {
                status: "Active"
            },
            relations: [
                "contracts"
            ]
        });
        const settings = await this.getSettings();
        const generatedPayslips = [];
        // Make sure default CNSS and IRPP salary components exist
        let cnssComp = await this.getComponentByCodes("CNSS_EMPLOYEE", "CNSS");
        if (!cnssComp) {
            cnssComp = await this.componentRepository.save({
                code: "CNSS_EMPLOYEE",
                name: "Employee CNSS Contribution",
                type: "DEDUCTION",
                taxable: false,
                subjectToCnss: false,
                active: true
            });
        }
        let irppComp = await this.getComponentByCodes("INCOME_TAX", "IRPP");
        if (!irppComp) {
            irppComp = await this.componentRepository.save({
                code: "INCOME_TAX",
                name: "Income Tax (IRPP)",
                type: "DEDUCTION",
                taxable: false,
                subjectToCnss: false,
                active: true
            });
        }
        for (const employee of employees){
            const activeContract = employee.contracts?.find((c)=>c.status === "Active");
            if (!activeContract) continue;
            const profile = await this.profileRepository.findOne({
                where: {
                    employeeId: employee.id
                }
            });
            const employeeComponents = await this.employeeComponentRepository.find({
                where: {
                    employeeId: employee.id,
                    active: true
                },
                relations: [
                    "component"
                ]
            });
            // Repayments check (Loans & Advances)
            const loans = await this.loanRepository.find({
                where: {
                    employeeId: employee.id,
                    status: "Active"
                }
            });
            const advances = await this.advanceRepository.find({
                where: {
                    employeeId: employee.id,
                    status: "Approved"
                }
            });
            // Math starts
            const baseSalary = Number(activeContract.baseSalary);
            let grossSalary = baseSalary;
            let totalEarnings = baseSalary;
            let totalDeductions = 0;
            const detailsToSave = [];
            // Add Base Salary Line
            let baseComp = await this.getComponentByCodes("BASIC_SALARY", "BASE_SALARY");
            if (!baseComp) {
                baseComp = await this.componentRepository.save({
                    code: "BASIC_SALARY",
                    name: "Basic Salary",
                    type: "EARNING",
                    taxable: true,
                    subjectToCnss: true,
                    active: true
                });
            }
            detailsToSave.push({
                componentId: baseComp.id,
                amount: baseSalary
            });
            // Add Earnings (Allowances)
            let cnssBase = baseComp.subjectToCnss ? baseSalary : 0;
            let taxableBase = baseComp.taxable ? baseSalary : 0;
            const cnssCap = Number(settings.cnssMaxCap);
            for (const ec of employeeComponents){
                const amount = Number(ec.amount);
                if (ec.component.type === "EARNING") {
                    grossSalary += amount;
                    totalEarnings += amount;
                    if (ec.component.subjectToCnss) cnssBase += amount;
                    if (ec.component.taxable) taxableBase += amount;
                    detailsToSave.push({
                        componentId: ec.componentId,
                        amount
                    });
                }
            }
            // ============ Seniority Bonus (Prime d'Ancienneté) ============
            let seniorityBonusAmount = 0;
            if (settings.seniorityBonusEnabled) {
                const yearsOfService = this.getYearsOfService(employee.hireDate);
                let seniorityRate = 0;
                if (yearsOfService >= 20) seniorityRate = Number(settings.seniorityBonusRate20yr);
                else if (yearsOfService >= 15) seniorityRate = Number(settings.seniorityBonusRate15yr);
                else if (yearsOfService >= 10) seniorityRate = Number(settings.seniorityBonusRate10yr);
                else if (yearsOfService >= 5) seniorityRate = Number(settings.seniorityBonusRate5yr);
                if (seniorityRate > 0) {
                    seniorityBonusAmount = Math.round(baseSalary * (seniorityRate / 100) * 1000) / 1000;
                    grossSalary += seniorityBonusAmount;
                    totalEarnings += seniorityBonusAmount;
                    cnssBase += seniorityBonusAmount;
                    taxableBase += seniorityBonusAmount;
                    let seniorityComp = await this.getComponentByCodes("SENIORITY_BONUS");
                    if (!seniorityComp) {
                        seniorityComp = await this.componentRepository.save({
                            code: "SENIORITY_BONUS",
                            name: "Prime d'Ancienneté",
                            type: "EARNING",
                            taxable: true,
                            subjectToCnss: true,
                            active: true
                        });
                    }
                    detailsToSave.push({
                        componentId: seniorityComp.id,
                        amount: seniorityBonusAmount
                    });
                }
            }
            // ============ Overtime Pay (Approved Assignments) ============
            let overtimePayAmount = 0;
            const hrSettings = await this.hrSettingsRepository.findOne({
                where: {}
            });
            const overtimeRates = hrSettings ? {
                weekday: Number(hrSettings.overtimeWeekdayRate),
                night: Number(hrSettings.overtimeNightRate),
                restDay: Number(hrSettings.overtimeRestDayRate)
            } : {
                weekday: 1.25,
                night: 1.50,
                restDay: 2.00
            };
            const approvedOvertimes = await this.overtimeRequestRepository.find({
                where: {
                    employeeId: employee.id,
                    status: "Approved",
                    date: (0, _typeorm1.Between)(period.startDate, period.endDate)
                }
            });
            if (approvedOvertimes.length > 0) {
                const hourlyRate = baseSalary / (Number(hrSettings?.workingDaysPerMonth || settings.workingDaysPerMonth || 26) * 8);
                const categoryTotals = {
                    weekday: 0,
                    night: 0,
                    restDay: 0
                };
                for (const ot of approvedOvertimes){
                    const cat = ot.category || "weekday";
                    categoryTotals[cat] = (categoryTotals[cat] || 0) + ot.totalHours;
                }
                for (const [cat, hours] of Object.entries(categoryTotals)){
                    if (hours <= 0) continue;
                    const rate = overtimeRates[cat] || 1.25;
                    const premium = rate - 1;
                    const pay = Math.round(hourlyRate * hours * premium * 1000) / 1000;
                    if (pay > 0) {
                        overtimePayAmount += pay;
                        const codeMap = {
                            weekday: "OVERTIME_25",
                            night: "OVERTIME_50",
                            restDay: "OVERTIME_100"
                        };
                        let otComp = await this.getComponentByCodes(codeMap[cat]);
                        if (!otComp) {
                            const nameMap = {
                                weekday: "Overtime 25%",
                                night: "Overtime 50%",
                                restDay: "Overtime 100%"
                            };
                            otComp = await this.componentRepository.save({
                                code: codeMap[cat],
                                name: nameMap[cat],
                                type: "EARNING",
                                taxable: true,
                                subjectToCnss: true,
                                active: true
                            });
                        }
                        detailsToSave.push({
                            componentId: otComp.id,
                            amount: pay
                        });
                    }
                }
                if (overtimePayAmount > 0) {
                    grossSalary += overtimePayAmount;
                    totalEarnings += overtimePayAmount;
                    cnssBase += overtimePayAmount;
                    taxableBase += overtimePayAmount;
                }
            }
            // ============ Absence Deduction ============
            let absenceDeductionAmount = 0;
            if (settings.absenceDeductionEnabled) {
                const periodStart = period.startDate;
                const periodEnd = period.endDate;
                const workingDays = Number(settings.workingDaysPerMonth || 26);
                const dailySalary = baseSalary / workingDays;
                const deductionRate = Number(settings.dailySalaryDeductionRate) / 100;
                // Count unexcused absences in the period
                const absences = await this.attendanceRepository.find({
                    where: {
                        employeeId: employee.id,
                        status: "Absent",
                        workDate: (0, _typeorm1.Between)(periodStart, periodEnd)
                    }
                });
                // Also count working days with no attendance record
                const totalWorkingDaysInPeriod = this.getWorkingDaysBetween(periodStart, periodEnd);
                const presentRecords = await this.attendanceRepository.find({
                    where: {
                        employeeId: employee.id,
                        workDate: (0, _typeorm1.Between)(periodStart, periodEnd)
                    }
                });
                const recordedDays = new Set(presentRecords.map((a)=>a.workDate.toISOString().split("T")[0]));
                const allDays = this.getDateRange(periodStart, periodEnd);
                let missingDays = 0;
                for (const d of allDays){
                    if (this.isWorkingDay(d) && !recordedDays.has(d.toISOString().split("T")[0])) {
                        missingDays++;
                    }
                }
                const totalAbsenceDays = absences.length + missingDays;
                absenceDeductionAmount = Math.round(dailySalary * deductionRate * totalAbsenceDays * 1000) / 1000;
                if (absenceDeductionAmount > 0) {
                    totalDeductions += absenceDeductionAmount;
                    let absenceComp = await this.getComponentByCodes("ABSENCE_DEDUCTION");
                    if (!absenceComp) {
                        absenceComp = await this.componentRepository.save({
                            code: "ABSENCE_DEDUCTION",
                            name: "Absence Deduction",
                            type: "DEDUCTION",
                            taxable: false,
                            subjectToCnss: false,
                            active: true
                        });
                    }
                    detailsToSave.push({
                        componentId: absenceComp.id,
                        amount: -absenceDeductionAmount
                    });
                }
            }
            // 1. CNSS Deduction (capped at cnssMaxCap)
            const cappedCnssBase = Math.min(cnssBase, cnssCap);
            let cnssDeduction = 0;
            if (profile && profile.socialRegime === "CNSS") {
                cnssDeduction = cappedCnssBase * (settings.cnssEmployeeRate / 100);
                cnssDeduction = Math.round(cnssDeduction * 1000) / 1000;
                totalDeductions += cnssDeduction;
                detailsToSave.push({
                    componentId: cnssComp.id,
                    amount: -cnssDeduction
                });
            }
            // Employer Contributions (not deducted from net salary, for accounting)
            let totalEmployerContributions = 0;
            if (profile && profile.socialRegime === "CNSS") {
                const cnssEmployerAmount = cappedCnssBase * (Number(settings.cnssEmployerRate) / 100);
                const tfpAmount = cappedCnssBase * (Number(settings.tfpRate) / 100);
                const foprolosAmount = cappedCnssBase * (Number(settings.foprolosRate) / 100);
                const accidentInsAmount = cappedCnssBase * (Number(settings.accidentInsuranceRate) / 100);
                totalEmployerContributions = Math.round((cnssEmployerAmount + tfpAmount + foprolosAmount + accidentInsAmount) * 1000) / 1000;
                let cnssEmployerComp = await this.getComponentByCodes("CNSS_EMPLOYER");
                if (!cnssEmployerComp) {
                    cnssEmployerComp = await this.componentRepository.save({
                        code: "CNSS_EMPLOYER",
                        name: "CNSS Employer Contribution",
                        type: "EMPLOYER_CONTRIBUTION",
                        taxable: false,
                        subjectToCnss: false,
                        active: true
                    });
                }
                detailsToSave.push({
                    componentId: cnssEmployerComp.id,
                    amount: Math.round(cnssEmployerAmount * 1000) / 1000
                });
                let tfpComp = await this.getComponentByCodes("TRAINING_TAX", "TFP");
                if (!tfpComp) {
                    tfpComp = await this.componentRepository.save({
                        code: "TRAINING_TAX",
                        name: "Training Tax",
                        type: "EMPLOYER_CONTRIBUTION",
                        taxable: false,
                        subjectToCnss: false,
                        active: true
                    });
                }
                detailsToSave.push({
                    componentId: tfpComp.id,
                    amount: Math.round(tfpAmount * 1000) / 1000
                });
                let foprolosComp = await this.getComponentByCodes("FOPROLOS");
                if (!foprolosComp) {
                    foprolosComp = await this.componentRepository.save({
                        code: "FOPROLOS",
                        name: "FOPROLOS Contribution",
                        type: "EMPLOYER_CONTRIBUTION",
                        taxable: false,
                        subjectToCnss: false,
                        active: true
                    });
                }
                detailsToSave.push({
                    componentId: foprolosComp.id,
                    amount: Math.round(foprolosAmount * 1000) / 1000
                });
                let accidentInsComp = await this.getComponentByCodes("WORK_ACCIDENT", "ACCIDENT_INSURANCE");
                if (!accidentInsComp) {
                    accidentInsComp = await this.componentRepository.save({
                        code: "WORK_ACCIDENT",
                        name: "Work Accident Contribution",
                        type: "EMPLOYER_CONTRIBUTION",
                        taxable: false,
                        subjectToCnss: false,
                        active: true
                    });
                }
                detailsToSave.push({
                    componentId: accidentInsComp.id,
                    amount: Math.round(accidentInsAmount * 1000) / 1000
                });
            }
            // CNSS Deduction reduces taxable income in Tunisia
            taxableBase = Math.max(0, taxableBase - cnssDeduction);
            // 2. IRPP Deduction
            const annualTaxableBase = taxableBase * 12;
            let childCount = employee.childrenCount || 0;
            let marital = employee.maritalStatus || "Single";
            const annualIRPP = this.calculateAnnualIRPP(annualTaxableBase, marital, childCount);
            const monthlyIRPP = Math.round(annualIRPP / 12 * 1000) / 1000;
            totalDeductions += monthlyIRPP;
            detailsToSave.push({
                componentId: irppComp.id,
                amount: -monthlyIRPP
            });
            // 3. Add Custom Deductions
            for (const ec of employeeComponents){
                const amount = Number(ec.amount);
                if (ec.component.type === "DEDUCTION") {
                    totalDeductions += amount;
                    detailsToSave.push({
                        componentId: ec.componentId,
                        amount: -amount
                    });
                }
            }
            // 4. Repayments (Loans & Advances)
            // Loans
            for (const loan of loans){
                const repayment = Math.min(Number(loan.balance), Number(loan.installmentAmount));
                if (repayment > 0) {
                    totalDeductions += repayment;
                    let loanRepayComp = await this.componentRepository.findOne({
                        where: {
                            code: "LOAN_REPAYMENT"
                        }
                    });
                    if (!loanRepayComp) {
                        loanRepayComp = await this.componentRepository.save({
                            code: "LOAN_REPAYMENT",
                            name: "Loan Installment Deduction",
                            type: "DEDUCTION",
                            taxable: false,
                            subjectToCnss: false,
                            active: true
                        });
                    }
                    detailsToSave.push({
                        componentId: loanRepayComp.id,
                        amount: -repayment
                    });
                // Deduct from loan balance inside database if approved/paid (we will do this when payslip is approved)
                }
            }
            // Advances
            for (const adv of advances){
                // Check if deduction date falls in this period or just deduct it
                const advAmount = Number(adv.amount);
                totalDeductions += advAmount;
                let advRepayComp = await this.componentRepository.findOne({
                    where: {
                        code: "ADVANCE_REPAYMENT"
                    }
                });
                if (!advRepayComp) {
                    advRepayComp = await this.componentRepository.save({
                        code: "ADVANCE_REPAYMENT",
                        name: "Advance Deduction",
                        type: "DEDUCTION",
                        taxable: false,
                        subjectToCnss: false,
                        active: true
                    });
                }
                detailsToSave.push({
                    componentId: advRepayComp.id,
                    amount: -advAmount
                });
            }
            const netSalary = Math.max(0, totalEarnings - totalDeductions);
            const payslip = this.payslipRepository.create({
                employeeId: employee.id,
                payrollPeriodId: period.id,
                grossSalary,
                totalEarnings,
                totalDeductions,
                totalEmployerContributions,
                netSalary,
                status: "Draft"
            });
            const savedPayslip = await this.payslipRepository.save(payslip);
            for (const detail of detailsToSave){
                const payslipDetail = this.payslipDetailRepository.create({
                    ...detail,
                    payslipId: savedPayslip.id
                });
                await this.payslipDetailRepository.save(payslipDetail);
            }
            generatedPayslips.push(await this.findOnePayslip(savedPayslip.id));
        }
        return generatedPayslips;
    }
    async approvePayslip(id) {
        const payslip = await this.findOnePayslip(id);
        if (payslip.status !== "Draft") throw new _common.BadRequestException("Payslip is not in Draft status");
        // Perform loan and advance balance deduction updates
        const loans = await this.loanRepository.find({
            where: {
                employeeId: payslip.employeeId,
                status: "Active"
            }
        });
        for (const loan of loans){
            const repayment = Math.min(Number(loan.balance), Number(loan.installmentAmount));
            if (repayment > 0) {
                loan.balance = Number(loan.balance) - repayment;
                if (loan.balance <= 0) {
                    loan.status = "Fully Repaid";
                }
                await this.loanRepository.save(loan);
            }
        }
        const advances = await this.advanceRepository.find({
            where: {
                employeeId: payslip.employeeId,
                status: "Approved"
            }
        });
        for (const adv of advances){
            adv.status = "Deducted";
            await this.advanceRepository.save(adv);
        }
        payslip.status = "Approved";
        return this.payslipRepository.save(payslip);
    }
    async payPayslip(id) {
        const payslip = await this.findOnePayslip(id);
        if (payslip.status !== "Approved") throw new _common.BadRequestException("Payslip must be Approved to mark as Paid");
        payslip.status = "Paid";
        payslip.paymentDate = new Date();
        return this.payslipRepository.save(payslip);
    }
    // ==================== CNSS DECLARATIONS ====================
    async findCnssDeclarations() {
        return this.cnssDeclarationRepository.find({
            relations: [
                "payrollPeriod"
            ],
            order: {
                createdAt: "DESC"
            }
        });
    }
    async findOneCnssDeclaration(id) {
        const dec = await this.cnssDeclarationRepository.findOne({
            where: {
                id
            },
            relations: [
                "payrollPeriod"
            ]
        });
        if (!dec) throw new _common.NotFoundException("CNSS declaration not found");
        return dec;
    }
    async generateCnssDeclaration(periodId) {
        const payslips = await this.payslipRepository.find({
            where: {
                payrollPeriodId: periodId
            },
            relations: [
                "details",
                "details.component"
            ]
        });
        if (payslips.length === 0) throw new _common.BadRequestException("No payslips found for this period");
        let totalGross = 0, totalEmp = 0, totalEmployer = 0, totalTfp = 0, totalFopro = 0, totalAcc = 0;
        for (const ps of payslips){
            totalGross += Number(ps.grossSalary);
            for (const d of ps.details || []){
                const code = d.component?.code;
                const amt = Number(d.amount);
                if (code === "CNSS_EMPLOYEE" || code === "CNSS") totalEmp += Math.abs(amt);
                else if (code === "CNSS_EMPLOYER") totalEmployer += amt;
                else if (code === "TRAINING_TAX" || code === "TFP") totalTfp += amt;
                else if (code === "FOPROLOS") totalFopro += amt;
                else if (code === "WORK_ACCIDENT" || code === "ACCIDENT_INSURANCE") totalAcc += amt;
            }
        }
        const period = await this.periodRepository.findOne({
            where: {
                id: periodId
            }
        });
        const declaration = this.cnssDeclarationRepository.create({
            payrollPeriodId: periodId,
            declarationDate: new Date(),
            employeeCount: payslips.length,
            totalGrossSalary: Math.round(totalGross * 1000) / 1000,
            totalCnssEmployee: Math.round(totalEmp * 1000) / 1000,
            totalCnssEmployer: Math.round(totalEmployer * 1000) / 1000,
            totalTfp: Math.round(totalTfp * 1000) / 1000,
            totalFoprolos: Math.round(totalFopro * 1000) / 1000,
            totalAccidentInsurance: Math.round(totalAcc * 1000) / 1000,
            status: "Generated"
        });
        return this.cnssDeclarationRepository.save(declaration);
    }
    // ==================== IRPP DECLARATIONS ====================
    async findIrppDeclarations() {
        return this.irppDeclarationRepository.find({
            relations: [
                "employee"
            ],
            order: {
                taxYear: "DESC"
            }
        });
    }
    async findOneIrppDeclaration(id) {
        const dec = await this.irppDeclarationRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee"
            ]
        });
        if (!dec) throw new _common.NotFoundException("IRPP declaration not found");
        return dec;
    }
    async generateIrppDeclaration(taxYear) {
        const employees = await this.employeeRepository.find({
            where: {
                status: "Active"
            }
        });
        const generated = [];
        for (const emp of employees){
            const payslips = await this.payslipRepository.find({
                where: {
                    employeeId: emp.id,
                    status: "Approved"
                },
                relations: [
                    "details",
                    "details.component"
                ]
            });
            // Filter to only payslips in the given tax year (based on paymentDate or createdAt)
            const yearPayslips = payslips.filter((ps)=>{
                const d = ps.paymentDate || ps.createdAt;
                return new Date(d).getFullYear() === taxYear;
            });
            if (yearPayslips.length === 0) continue;
            let taxableIncome = 0, taxDeducted = 0, cnssDeducted = 0;
            for (const ps of yearPayslips){
                taxableIncome += Number(ps.grossSalary);
                for (const d of ps.details || []){
                    const code = d.component?.code;
                    const amt = Number(d.amount);
                    if (code === "INCOME_TAX" || code === "IRPP") taxDeducted += Math.abs(amt);
                    else if (code === "CNSS_EMPLOYEE" || code === "CNSS") cnssDeducted += Math.abs(amt);
                }
            }
            // Remove existing declaration for this employee/taxYear if any
            await this.irppDeclarationRepository.delete({
                employeeId: emp.id,
                taxYear
            });
            const dec = this.irppDeclarationRepository.create({
                taxYear,
                employeeId: emp.id,
                annualTaxableIncome: Math.round(taxableIncome * 1000) / 1000,
                annualTaxDeducted: Math.round(taxDeducted * 1000) / 1000,
                annualCnssDeducted: Math.round(cnssDeducted * 1000) / 1000,
                status: "Generated"
            });
            generated.push(await this.irppDeclarationRepository.save(dec));
        }
        return generated;
    }
    // ==================== BANK TRANSFER FILES ====================
    async findBankTransferFiles() {
        return this.bankTransferRepository.find({
            relations: [
                "payrollPeriod"
            ],
            order: {
                createdAt: "DESC"
            }
        });
    }
    async findOneBankTransferFile(id) {
        const file = await this.bankTransferRepository.findOne({
            where: {
                id
            },
            relations: [
                "payrollPeriod"
            ]
        });
        if (!file) throw new _common.NotFoundException("Bank transfer file not found");
        return file;
    }
    async generateBankTransferFile(periodId, format) {
        const period = await this.periodRepository.findOne({
            where: {
                id: periodId
            }
        });
        if (!period) throw new _common.NotFoundException("Payroll period not found");
        const payslips = await this.payslipRepository.find({
            where: {
                payrollPeriodId: periodId,
                status: "Paid"
            },
            relations: [
                "employee"
            ]
        });
        if (payslips.length === 0) throw new _common.BadRequestException("No paid payslips found for this period");
        // Fetch company settings for debtor info
        const companyRepo = this.settingsRepository.manager.getRepository(_companysettingsentity.CompanySettings);
        let company = await companyRepo.findOne({
            where: {}
        });
        if (!company) {
            company = companyRepo.create({
                name: "Company Name"
            });
        }
        // Fetch payroll profiles for bank details
        const employeeIds = payslips.map((p)=>p.employeeId);
        const profiles = await this.profileRepository.find({
            where: employeeIds.map((id)=>({
                    employeeId: id
                }))
        });
        const profileMap = new Map(profiles.map((p)=>[
                p.employeeId,
                p
            ]));
        if (format === "sepa") {
            return this.generateSepaXml(payslips, period, company, profileMap);
        } else if (format === "csv") {
            return this.generateCsvFile(payslips, period, company, profileMap);
        } else {
            throw new _common.BadRequestException(`Unsupported format: ${format}. Use 'sepa' or 'csv'.`);
        }
    }
    async generateSepaXml(payslips, period, company, profileMap) {
        const totalAmount = payslips.reduce((sum, p)=>sum + Number(p.netSalary), 0);
        const now = new Date();
        const msgId = "BANK-TRF-" + period.id + "-" + now.getTime();
        const createdDt = now.toISOString().replace(/[-:]/g, "").split(".")[0];
        const reqdExctnDt = period.endDate.toISOString().split("T")[0];
        const nl = "\n";
        const safeName = period.periodName.replace(/\s+/g, "-");
        let xml = '<?xml version="1.0" encoding="UTF-8"?>' + nl;
        xml += '<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03">' + nl;
        xml += "  <CstmrCdtTrfInitn>" + nl;
        xml += "    <GrpHdr>" + nl;
        xml += "      <MsgId>" + msgId + "</MsgId>" + nl;
        xml += "      <CreDtTm>" + createdDt + "</CreDtTm>" + nl;
        xml += "      <NbOfTxs>" + payslips.length + "</NbOfTxs>" + nl;
        xml += "      <CtrlSum>" + totalAmount.toFixed(3) + "</CtrlSum>" + nl;
        xml += "      <InitgPty>" + nl;
        xml += "        <Nm>" + this.escapeXml(company.legalName || company.name) + "</Nm>" + nl;
        xml += "      </InitgPty>" + nl;
        xml += "    </GrpHdr>" + nl;
        xml += "    <PmtInf>" + nl;
        xml += "      <PmtInfId>PAYROLL-" + safeName + "</PmtInfId>" + nl;
        xml += "      <PmtMtd>TRF</PmtMtd>" + nl;
        xml += "      <NbOfTxs>" + payslips.length + "</NbOfTxs>" + nl;
        xml += "      <CtrlSum>" + totalAmount.toFixed(3) + "</CtrlSum>" + nl;
        xml += "      <PmtTpInf>" + nl;
        xml += "        <SvcLvl>" + nl;
        xml += "          <Cd>SEPA</Cd>" + nl;
        xml += "        </SvcLvl>" + nl;
        xml += "      </PmtTpInf>" + nl;
        xml += "      <ReqdExctnDt>" + reqdExctnDt + "</ReqdExctnDt>" + nl;
        xml += "      <Dbtr>" + nl;
        xml += "        <Nm>" + this.escapeXml(company.legalName || company.name) + "</Nm>" + nl;
        xml += "      </Dbtr>" + nl;
        xml += "      <DbtrAcct>" + nl;
        xml += "        <Id>" + nl;
        xml += "          <IBAN>" + (company.bankIban || "TN5901000000000000000000") + "</IBAN>" + nl;
        xml += "        </Id>" + nl;
        xml += "      </DbtrAcct>" + nl;
        xml += "      <DbtrAgt>" + nl;
        xml += "        <FinInstnId>" + nl;
        xml += "          <BIC>" + (company.bankName ? this.getBicFromBank(company.bankName) : "BICCODE") + "</BIC>" + nl;
        xml += "        </FinInstnId>" + nl;
        xml += "      </DbtrAgt>" + nl;
        xml += "      <ChrgBr>SLEV</ChrgBr>" + nl;
        for (const payslip of payslips){
            const emp = payslip.employee;
            const profile = profileMap.get(emp.id);
            const rib = profile?.rib || "";
            const endToEndId = "PAY-" + period.id + "-" + emp.employeeNumber;
            const amount = Number(payslip.netSalary);
            xml += "      <CdtTrfTxInf>" + nl;
            xml += "        <PmtId>" + nl;
            xml += "          <EndToEndId>" + endToEndId + "</EndToEndId>" + nl;
            xml += "        </PmtId>" + nl;
            xml += "        <Amt>" + nl;
            xml += '          <InstdAmt Ccy="TND">' + amount.toFixed(3) + "</InstdAmt>" + nl;
            xml += "        </Amt>" + nl;
            xml += "        <Cdtr>" + nl;
            xml += "          <Nm>" + this.escapeXml(emp.firstName + " " + emp.lastName) + "</Nm>" + nl;
            xml += "        </Cdtr>" + nl;
            if (rib) {
                xml += "        <CdtrAcct>" + nl;
                xml += "          <Id>" + nl;
                xml += "            <IBAN>" + rib + "</IBAN>" + nl;
                xml += "          </Id>" + nl;
                xml += "        </CdtrAcct>" + nl;
            }
            xml += "        <RmtInf>" + nl;
            xml += "          <Ustrd>" + this.escapeXml("Paie " + period.periodName + " - " + emp.firstName + " " + emp.lastName) + "</Ustrd>" + nl;
            xml += "        </RmtInf>" + nl;
            xml += "      </CdtTrfTxInf>" + nl;
        }
        xml += "    </PmtInf>" + nl;
        xml += "  </CstmrCdtTrfInitn>" + nl;
        xml += "</Document>" + nl;
        const file = this.bankTransferRepository.create({
            payrollPeriodId: period.id,
            fileName: "SEPA-PAYROLL-" + safeName + ".xml",
            fileContent: xml,
            format: "sepa",
            totalEmployees: payslips.length,
            totalAmount: Math.round(totalAmount * 1000) / 1000
        });
        return this.bankTransferRepository.save(file);
    }
    async generateCsvFile(payslips, period, company, profileMap) {
        const totalAmount = payslips.reduce((sum, p)=>sum + Number(p.netSalary), 0);
        let csv = "RIB,EmployeeName,Amount,Reference\n";
        const newline = "\n";
        for (const payslip of payslips){
            const emp = payslip.employee;
            const profile = profileMap.get(emp.id);
            const rib = profile?.rib || "";
            const amount = Number(payslip.netSalary).toFixed(3);
            const ref = "PAY-" + period.id + "-" + emp.employeeNumber;
            csv += rib + ',"' + emp.firstName + " " + emp.lastName + '",' + amount + "," + ref + newline;
        }
        const safeName = period.periodName.replace(/\s+/g, "-");
        const file = this.bankTransferRepository.create({
            payrollPeriodId: period.id,
            fileName: "CSV-PAYROLL-" + safeName + ".csv",
            fileContent: csv,
            format: "csv",
            totalEmployees: payslips.length,
            totalAmount: Math.round(totalAmount * 1000) / 1000
        });
        return this.bankTransferRepository.save(file);
    }
    escapeXml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }
    getBicFromBank(bankName) {
        const bankBicMap = {
            "ATB": "ATBBTNTN",
            "Amen Bank": "AMENTNTN",
            "Attijari Bank": "ATJITNTN",
            "BH Bank": "BHGNTNTN",
            "BIAT": "BIATTNTN",
            "BNA": "BNANTNTN",
            "Banque Zitouna": "BZITTNTN",
            "CIH": "CIHBTNTN",
            "QNB": "QNBATNTN",
            "Société Générale": "SOGETNTN",
            "STB": "STBKTNTN",
            "UBCI": "UBCITNTN",
            "UIB": "UIBKTNTN"
        };
        for (const [key, bic] of Object.entries(bankBicMap)){
            if (bankName.toLowerCase().includes(key.toLowerCase())) return bic;
        }
        return "BICCODE";
    }
    // ==================== STC SETTLEMENTS ====================
    async findStcSettlements() {
        return [];
    }
    async generateStcSettlement(periodId) {
        const period = await this.periodRepository.findOne({
            where: {
                id: periodId
            }
        });
        if (!period) throw new _common.NotFoundException("Payroll period not found");
        const payslips = await this.payslipRepository.find({
            where: {
                payrollPeriodId: periodId,
                status: "Paid"
            },
            relations: [
                "employee"
            ]
        });
        if (payslips.length === 0) throw new _common.BadRequestException("No paid payslips found for this period");
        const employeeIds = payslips.map((p)=>p.employeeId);
        const profiles = await this.profileRepository.find({
            where: employeeIds.map((id)=>({
                    employeeId: id
                }))
        });
        const profileMap = new Map(profiles.map((p)=>[
                p.employeeId,
                p
            ]));
        const totalAmount = payslips.reduce((sum, p)=>sum + Number(p.netSalary), 0);
        const now = new Date();
        // STC flat file format
        let content = "";
        content += "STC\tSALARY_TRANSFER\t";
        content += `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}\t`;
        content += `${period.periodName}\n`;
        // Header record
        content += `H\t${payslips.length}\t${totalAmount.toFixed(3)}\n`;
        for (const payslip of payslips){
            const emp = payslip.employee;
            const profile = profileMap.get(emp.id);
            const rib = profile?.rib || "";
            content += `D\t${emp.employeeNumber}\t`;
            content += `${emp.firstName.toUpperCase()} ${emp.lastName.toUpperCase()}\t`;
            content += `${rib}\t${Number(payslip.netSalary).toFixed(3)}\n`;
        }
        content += "T\t" + now.toISOString() + "\n";
        return {
            periodId: period.id,
            periodName: period.periodName,
            generatedAt: now,
            format: "stc",
            totalEmployees: payslips.length,
            totalAmount: Math.round(totalAmount * 1000) / 1000,
            content
        };
    }
    // Tunisian Progressive IRPP Calculation helper
    calculateAnnualIRPP(annualTaxableIncome, maritalStatus, childrenCount) {
        // Basic chef de famille / spouse deduction
        let totalDeductions = 0;
        if (maritalStatus === "Married") {
            totalDeductions += 300; // chef de famille deduction
        }
        // Children deduction
        totalDeductions += Math.min(4, childrenCount) * 100; // 100 TND per child, max 4 children
        const taxable = Math.max(0, annualTaxableIncome - totalDeductions);
        // Progressive Brackets
        let tax = 0;
        if (taxable <= 5000) {
            tax = 0;
        } else if (taxable <= 20000) {
            tax = (taxable - 5000) * 0.26;
        } else if (taxable <= 30000) {
            tax = 15000 * 0.26 + (taxable - 20000) * 0.28;
        } else if (taxable <= 50000) {
            tax = 15000 * 0.26 + 10000 * 0.28 + (taxable - 30000) * 0.32;
        } else {
            tax = 15000 * 0.26 + 10000 * 0.28 + 20000 * 0.32 + (taxable - 50000) * 0.35;
        }
        return tax;
    }
    // ==================== HELPERS ====================
    getYearsOfService(hireDate) {
        const now = new Date();
        const hired = new Date(hireDate);
        let years = now.getFullYear() - hired.getFullYear();
        const monthDiff = now.getMonth() - hired.getMonth();
        if (monthDiff < 0 || monthDiff === 0 && now.getDate() < hired.getDate()) {
            years--;
        }
        return Math.max(0, years);
    }
    getWorkingDaysBetween(start, end) {
        let count = 0;
        const d = new Date(start);
        while(d <= end){
            const day = d.getDay();
            if (day !== 0 && day !== 6) count++;
            d.setDate(d.getDate() + 1);
        }
        return count;
    }
    getDateRange(start, end) {
        const dates = [];
        const d = new Date(start);
        while(d <= end){
            dates.push(new Date(d));
            d.setDate(d.getDate() + 1);
        }
        return dates;
    }
    isWorkingDay(date) {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    }
    // ==================== 13TH MONTH SALARY ====================
    async generateThirteenthMonth(periodId) {
        const period = await this.periodRepository.findOne({
            where: {
                id: periodId
            }
        });
        if (!period) throw new _common.NotFoundException("Period not found");
        const settings = await this.getSettings();
        if (!settings.thirteenthMonthEnabled) {
            throw new _common.BadRequestException("13th month salary is not enabled in payroll settings");
        }
        // Remove existing draft 13th month payslips for this period
        await this.payslipRepository.delete({
            payrollPeriodId: periodId,
            status: "Draft"
        });
        const employees = await this.employeeRepository.find({
            where: {
                status: "Active"
            },
            relations: [
                "contracts"
            ]
        });
        const generatedPayslips = [];
        const thirteenthMonthRate = Number(settings.thirteenthMonthRate) / 100;
        for (const employee of employees){
            const activeContract = employee.contracts?.find((c)=>c.status === "Active");
            if (!activeContract) continue;
            const baseSalary = Number(activeContract.baseSalary);
            const thirteenthSalary = Math.round(baseSalary * thirteenthMonthRate * 1000) / 1000;
            const detailsToSave = [];
            let thirteenthComp = await this.componentRepository.findOne({
                where: {
                    code: "THIRTEENTH_MONTH"
                }
            });
            if (!thirteenthComp) {
                thirteenthComp = await this.componentRepository.save({
                    code: "THIRTEENTH_MONTH",
                    name: "13th Month Salary",
                    type: "EARNING",
                    taxable: true,
                    subjectToCnss: true,
                    active: true
                });
            }
            detailsToSave.push({
                componentId: thirteenthComp.id,
                amount: thirteenthSalary
            });
            // Apply CNSS deduction (same rules as normal payslip)
            const profile = await this.profileRepository.findOne({
                where: {
                    employeeId: employee.id
                }
            });
            const cnssCap = Number(settings.cnssMaxCap);
            let cnssDeduction = 0;
            let totalEmployerContributions = 0;
            if (profile && profile.socialRegime === "CNSS") {
                const cappedCnss = Math.min(thirteenthSalary, cnssCap);
                cnssDeduction = Math.round(cappedCnss * (settings.cnssEmployeeRate / 100) * 1000) / 1000;
                let cnssComp = await this.getComponentByCodes("CNSS_EMPLOYEE", "CNSS");
                if (!cnssComp) {
                    cnssComp = await this.componentRepository.save({
                        code: "CNSS_EMPLOYEE",
                        name: "Employee CNSS Contribution",
                        type: "DEDUCTION",
                        taxable: false,
                        subjectToCnss: false,
                        active: true
                    });
                }
                detailsToSave.push({
                    componentId: cnssComp.id,
                    amount: -cnssDeduction
                });
                // Employer contributions
                const cnssEmployerAmount = cappedCnss * (Number(settings.cnssEmployerRate) / 100);
                const tfpAmount = cappedCnss * (Number(settings.tfpRate) / 100);
                const foprolosAmount = cappedCnss * (Number(settings.foprolosRate) / 100);
                const accidentInsAmount = cappedCnss * (Number(settings.accidentInsuranceRate) / 100);
                totalEmployerContributions = Math.round((cnssEmployerAmount + tfpAmount + foprolosAmount + accidentInsAmount) * 1000) / 1000;
            }
            // IRPP on 13th month
            let irppDeduction = 0;
            const taxableBase = Math.max(0, thirteenthSalary - cnssDeduction);
            const annualTaxableBase = taxableBase;
            let childCount = employee.childrenCount || 0;
            let marital = employee.maritalStatus || "Single";
            const annualIRPP = this.calculateAnnualIRPP(annualTaxableBase, marital, childCount);
            irppDeduction = Math.round(annualIRPP * 1000) / 1000;
            let irppComp = await this.getComponentByCodes("INCOME_TAX", "IRPP");
            if (!irppComp) {
                irppComp = await this.componentRepository.save({
                    code: "INCOME_TAX",
                    name: "Income Tax (IRPP)",
                    type: "DEDUCTION",
                    taxable: false,
                    subjectToCnss: false,
                    active: true
                });
            }
            detailsToSave.push({
                componentId: irppComp.id,
                amount: -irppDeduction
            });
            const totalDeductions = cnssDeduction + irppDeduction;
            const netSalary = Math.max(0, thirteenthSalary - totalDeductions);
            const payslip = this.payslipRepository.create({
                employeeId: employee.id,
                payrollPeriodId: period.id,
                grossSalary: thirteenthSalary,
                totalEarnings: thirteenthSalary,
                totalDeductions,
                totalEmployerContributions,
                netSalary,
                status: "Draft"
            });
            const savedPayslip = await this.payslipRepository.save(payslip);
            for (const detail of detailsToSave){
                const pd = this.payslipDetailRepository.create({
                    ...detail,
                    payslipId: savedPayslip.id
                });
                await this.payslipDetailRepository.save(pd);
            }
            generatedPayslips.push(await this.findOnePayslip(savedPayslip.id));
        }
        return generatedPayslips;
    }
    // ==================== PAYROLL REPORTS ====================
    async getPayrollCostReport(periodId) {
        let query = this.payslipRepository.createQueryBuilder("ps").leftJoin("ps.employee", "emp").select("SUM(ps.grossSalary)", "totalGrossSalary").addSelect("SUM(ps.netSalary)", "totalNetSalary").addSelect("SUM(ps.totalDeductions)", "totalDeductions").addSelect("SUM(ps.totalEmployerContributions)", "totalEmployerContributions").addSelect("COUNT(ps.id)", "totalEmployees").addSelect("AVG(ps.netSalary)", "averageNetSalary");
        if (periodId) {
            query = query.where("ps.payrollPeriodId = :periodId", {
                periodId
            });
        }
        const totals = await query.getRawOne();
        return {
            periodId: periodId || null,
            totalGrossSalary: Number(totals?.totalGrossSalary || 0),
            totalNetSalary: Number(totals?.totalNetSalary || 0),
            totalDeductions: Number(totals?.totalDeductions || 0),
            totalEmployerContributions: Number(totals?.totalEmployerContributions || 0),
            totalEmployees: Number(totals?.totalEmployees || 0),
            averageNetSalary: Number(totals?.averageNetSalary || 0)
        };
    }
    async getDepartmentPayrollCostReport(periodId) {
        let query = this.payslipRepository.createQueryBuilder("ps").leftJoin("ps.employee", "emp").leftJoin("emp.department", "dept").select("dept.name", "department").addSelect("SUM(ps.grossSalary)", "totalGrossSalary").addSelect("SUM(ps.netSalary)", "totalNetSalary").addSelect("SUM(ps.totalDeductions)", "totalDeductions").addSelect("SUM(ps.totalEmployerContributions)", "totalEmployerContributions").addSelect("COUNT(ps.id)", "totalEmployees").groupBy("dept.name");
        if (periodId) {
            query = query.where("ps.payrollPeriodId = :periodId", {
                periodId
            });
        }
        return (await query.getRawMany()).map((r)=>({
                department: r.department || "Unassigned",
                totalGrossSalary: Number(r.totalGrossSalary || 0),
                totalNetSalary: Number(r.totalNetSalary || 0),
                totalDeductions: Number(r.totalDeductions || 0),
                totalEmployerContributions: Number(r.totalEmployerContributions || 0),
                totalEmployees: Number(r.totalEmployees || 0)
            }));
    }
    async getPeriodComparisonReport() {
        const periods = await this.periodRepository.find({
            order: {
                endDate: "DESC"
            },
            take: 6
        });
        const data = [];
        for (const p of periods){
            const report = await this.getPayrollCostReport(p.id);
            data.push({
                periodName: p.periodName,
                ...report
            });
        }
        return data;
    }
    constructor(componentRepository, employeeComponentRepository, profileRepository, periodRepository, payslipRepository, payslipDetailRepository, loanRepository, advanceRepository, settingsRepository, cnssDeclarationRepository, irppDeclarationRepository, bankTransferRepository, employeeRepository, contractRepository, attendanceRepository, overtimeRequestRepository, hrSettingsRepository){
        this.componentRepository = componentRepository;
        this.employeeComponentRepository = employeeComponentRepository;
        this.profileRepository = profileRepository;
        this.periodRepository = periodRepository;
        this.payslipRepository = payslipRepository;
        this.payslipDetailRepository = payslipDetailRepository;
        this.loanRepository = loanRepository;
        this.advanceRepository = advanceRepository;
        this.settingsRepository = settingsRepository;
        this.cnssDeclarationRepository = cnssDeclarationRepository;
        this.irppDeclarationRepository = irppDeclarationRepository;
        this.bankTransferRepository = bankTransferRepository;
        this.employeeRepository = employeeRepository;
        this.contractRepository = contractRepository;
        this.attendanceRepository = attendanceRepository;
        this.overtimeRequestRepository = overtimeRequestRepository;
        this.hrSettingsRepository = hrSettingsRepository;
    }
};
PayrollService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_salarycomponententity.SalaryComponent)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_employeesalarycomponententity.EmployeeSalaryComponent)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_payrollprofileentity.PayrollProfile)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_payrollperiodentity.PayrollPeriod)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_payslipentity.Payslip)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_payslipdetailentity.PayslipDetail)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_loanentity.Loan)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_advanceentity.Advance)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_payrollsettingsentity.PayrollSettings)),
    _ts_param(9, (0, _typeorm.InjectRepository)(_cnssdeclarationentity.CnssDeclaration)),
    _ts_param(10, (0, _typeorm.InjectRepository)(_irppdeclarationentity.IrppDeclaration)),
    _ts_param(11, (0, _typeorm.InjectRepository)(_banktransferfileentity.BankTransferFile)),
    _ts_param(12, (0, _typeorm.InjectRepository)(_employeeentity.Employee)),
    _ts_param(13, (0, _typeorm.InjectRepository)(_contractentity.Contract)),
    _ts_param(14, (0, _typeorm.InjectRepository)(_attendanceentity.Attendance)),
    _ts_param(15, (0, _typeorm.InjectRepository)(_overtimerequestentity.OvertimeRequest)),
    _ts_param(16, (0, _typeorm.InjectRepository)(_hrsettingsentity.HrSettings)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], PayrollService);

//# sourceMappingURL=payroll.service.js.map