"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _typeorm = require("@nestjs/typeorm");
const _auditinterceptor = require("./common/interceptors/audit.interceptor");
const _jwt = require("@nestjs/jwt");
const _passport = require("@nestjs/passport");
const _authmodule = require("./auth/auth.module");
const _usersmodule = require("./users/users.module");
const _leadsmodule = require("./leads/leads.module");
const _dealsmodule = require("./deals/deals.module");
const _accountsmodule = require("./accounts/accounts.module");
const _contactsmodule = require("./contacts/contacts.module");
const _settingsmodule = require("./settings/settings.module");
const _userentity = require("./users/entities/user.entity");
const _leadentity = require("./leads/entities/lead.entity");
const _leadsourceentity = require("./leads/entities/lead-source.entity");
const _pipelinestageentity = require("./leads/entities/pipeline-stage.entity");
const _leadscorecategoryentity = require("./leads/entities/lead-score-category.entity");
const _leadpriorityentity = require("./leads/entities/lead-priority.entity");
const _qualificationstageentity = require("./leads/entities/qualification-stage.entity");
const _dealentity = require("./deals/entities/deal.entity");
const _dealstageentity = require("./deals/entities/deal-stage.entity");
const _dealreasonentity = require("./deals/entities/deal-reason.entity");
const _accountentity = require("./accounts/entities/account.entity");
const _accounttypeentity = require("./accounts/entities/account-type.entity");
const _accountstatusentity = require("./accounts/entities/account-status.entity");
const _accounttierentity = require("./accounts/entities/account-tier.entity");
const _contactentity = require("./contacts/entities/contact.entity");
const _contactstatusentity = require("./contacts/entities/contact-status.entity");
const _contacttierentity = require("./contacts/entities/contact-tier.entity");
const _currencyentity = require("./settings/entities/currency.entity");
const _countryentity = require("./settings/entities/country.entity");
const _industryentity = require("./settings/entities/industry.entity");
const _tagentity = require("./settings/entities/tag.entity");
const _activitytypeentity = require("./settings/entities/activity-type.entity");
const _emailtemplateentity = require("./settings/entities/email-template.entity");
const _notificationentity = require("./settings/entities/notification.entity");
const _auditlogentity = require("./settings/entities/audit-log.entity");
const _carrierentity = require("./settings/entities/carrier.entity");
const _companysettingsentity = require("./settings/entities/company-settings.entity");
const _uploadsmodule = require("./uploads/uploads.module");
const _profilemodule = require("./profile/profile.module");
const _gmailmodule = require("./gmail/gmail.module");
const _activitiesmodule = require("./activities/activities.module");
const _activityentity = require("./activities/entities/activity.entity");
const _productentity = require("./products/entities/product.entity");
const _productcategoryentity = require("./products/entities/product-category.entity");
const _productunitentity = require("./products/entities/product-unit.entity");
const _productpricingmodelentity = require("./products/entities/product-pricing-model.entity");
const _productvariantentity = require("./products/entities/product-variant.entity");
const _pricebookentity = require("./products/entities/price-book.entity");
const _pricebookitementity = require("./products/entities/price-book-item.entity");
const _brandentity = require("./products/entities/brand.entity");
const _inventoryentity = require("./products/entities/inventory.entity");
const _productmediaentity = require("./products/entities/product-media.entity");
const _productattributeentity = require("./products/entities/product-attribute.entity");
const _producttypeentity = require("./products/entities/product-type.entity");
const _taxclassentity = require("./products/entities/tax-class.entity");
const _productsmodule = require("./products/products.module");
const _billingmodule = require("./billing/billing.module");
const _billingentity = require("./billing/entities/billing.entity");
const _roleentity = require("./roles/entities/role.entity");
const _permissionentity = require("./permissions/entities/permission.entity");
const _rolesmodule = require("./roles/roles.module");
const _permissionsmodule = require("./permissions/permissions.module");
const _taskentity = require("./tasks/entities/task.entity");
const _tasksmodule = require("./tasks/tasks.module");
const _forecastmodule = require("./forecast/forecast.module");
const _forecastperiodentity = require("./forecast/entities/forecast-period.entity");
const _forecasttargetentity = require("./forecast/entities/forecast-target.entity");
const _forecastadjustmententity = require("./forecast/entities/forecast-adjustment.entity");
const _forecastconfigentity = require("./forecast/entities/forecast-config.entity");
const _forecaststagemappingentity = require("./forecast/entities/forecast-stage-mapping.entity");
const _forecastsnapshotentity = require("./forecast/entities/forecast-snapshot.entity");
const _workdriveteamentity = require("./workdrive/entities/workdrive-team.entity");
const _workdrivefolderentity = require("./workdrive/entities/workdrive-folder.entity");
const _workdrivefileentity = require("./workdrive/entities/workdrive-file.entity");
const _workdrivepermissionentity = require("./workdrive/entities/workdrive-permission.entity");
const _workdrivemodule = require("./workdrive/workdrive.module");
const _dashboardmodule = require("./dashboard/dashboard.module");
const _campaignentity = require("./campaigns/entities/campaign.entity");
const _campaigntypeentity = require("./campaigns/entities/campaign-type.entity");
const _campaignstatusentity = require("./campaigns/entities/campaign-status.entity");
const _campaignsmodule = require("./campaigns/campaigns.module");
const _vendorentity = require("./vendors/entities/vendor.entity");
const _vendorsmodule = require("./vendors/vendors.module");
const _automationruleentity = require("./automations/entities/automation-rule.entity");
const _automationsmodule = require("./automations/automations.module");
const _departmententity = require("./departments/entities/department.entity");
const _departmentsmodule = require("./departments/departments.module");
const _costcenterentity = require("./cost-centers/entities/cost-center.entity");
const _costcentersmodule = require("./cost-centers/cost-centers.module");
const _vendorcategoryentity = require("./vendors/entities/vendor-category.entity");
const _employeeentity = require("./hr/entities/employee.entity");
const _positionentity = require("./hr/entities/position.entity");
const _contractentity = require("./hr/entities/contract.entity");
const _attendanceentity = require("./hr/entities/attendance.entity");
const _leavetypeentity = require("./hr/entities/leave-type.entity");
const _leaverequestentity = require("./hr/entities/leave-request.entity");
const _employeedocumententity = require("./hr/entities/employee-document.entity");
const _cnssprofileentity = require("./hr/entities/cnss-profile.entity");
const _irpptaxprofileentity = require("./hr/entities/irpp-tax-profile.entity");
const _shiftentity = require("./hr/entities/shift.entity");
const _shiftassignmententity = require("./hr/entities/shift-assignment.entity");
const _overtimerequestentity = require("./hr/entities/overtime-request.entity");
const _leavebalanceentity = require("./hr/entities/leave-balance.entity");
const _kpientity = require("./hr/entities/kpi.entity");
const _kpiassignmententity = require("./hr/entities/kpi-assignment.entity");
const _goalentity = require("./hr/entities/goal.entity");
const _performancereviewentity = require("./hr/entities/performance-review.entity");
const _vacationaccrualruleentity = require("./hr/entities/vacation-accrual-rule.entity");
const _hrsettingsentity = require("./hr/entities/hr-settings.entity");
const _salarycomponententity = require("./payroll/entities/salary-component.entity");
const _employeesalarycomponententity = require("./payroll/entities/employee-salary-component.entity");
const _payrollprofileentity = require("./payroll/entities/payroll-profile.entity");
const _payrollperiodentity = require("./payroll/entities/payroll-period.entity");
const _payslipentity = require("./payroll/entities/payslip.entity");
const _payslipdetailentity = require("./payroll/entities/payslip-detail.entity");
const _loanentity = require("./payroll/entities/loan.entity");
const _advanceentity = require("./payroll/entities/advance.entity");
const _payrollsettingsentity = require("./payroll/entities/payroll-settings.entity");
const _cnssdeclarationentity = require("./payroll/entities/cnss-declaration.entity");
const _irppdeclarationentity = require("./payroll/entities/irpp-declaration.entity");
const _banktransferfileentity = require("./payroll/entities/bank-transfer-file.entity");
const _hrmodule = require("./hr/hr.module");
const _payrollmodule = require("./payroll/payroll.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forRoot({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "admin",
                database: "CRM_NEW_2026",
                synchronize: true,
                entities: [
                    _userentity.User,
                    _leadentity.Lead,
                    _leadsourceentity.LeadSource,
                    _pipelinestageentity.PipelineStage,
                    _leadscorecategoryentity.LeadScoreCategory,
                    _leadpriorityentity.LeadPriority,
                    _qualificationstageentity.QualificationStage,
                    _dealentity.Deal,
                    _dealstageentity.DealStage,
                    _dealreasonentity.DealReason,
                    _accountentity.Account,
                    _accounttypeentity.AccountType,
                    _accountstatusentity.AccountStatus,
                    _accounttierentity.AccountTier,
                    _contactentity.Contact,
                    _contactstatusentity.ContactStatus,
                    _contacttierentity.ContactTier,
                    _currencyentity.Currency,
                    _countryentity.Country,
                    _industryentity.Industry,
                    _tagentity.Tag,
                    _activitytypeentity.ActivityType,
                    _emailtemplateentity.EmailTemplate,
                    _notificationentity.Notification,
                    _auditlogentity.AuditLog,
                    _activityentity.Activity,
                    _productentity.Product,
                    _productcategoryentity.ProductCategory,
                    _productunitentity.ProductUnit,
                    _productpricingmodelentity.ProductPricingModel,
                    _productvariantentity.ProductVariant,
                    _pricebookentity.PriceBook,
                    _pricebookitementity.PriceBookItem,
                    _brandentity.Brand,
                    _inventoryentity.Inventory,
                    _productmediaentity.ProductMedia,
                    _productattributeentity.ProductAttribute,
                    _producttypeentity.ProductType,
                    _taxclassentity.TaxClass,
                    _billingentity.Quote,
                    _billingentity.QuoteItem,
                    _billingentity.Invoice,
                    _billingentity.InvoiceItem,
                    _roleentity.Role,
                    _permissionentity.Permission,
                    _taskentity.Task,
                    _forecastperiodentity.ForecastPeriod,
                    _forecasttargetentity.ForecastTarget,
                    _forecastadjustmententity.ForecastAdjustment,
                    _forecastconfigentity.ForecastConfig,
                    _forecaststagemappingentity.ForecastStageMapping,
                    _forecastsnapshotentity.ForecastSnapshot,
                    _workdriveteamentity.WorkDriveTeam,
                    _workdrivefolderentity.WorkDriveFolder,
                    _workdrivefileentity.WorkDriveFile,
                    _workdrivepermissionentity.WorkDrivePermission,
                    _campaignentity.Campaign,
                    _campaigntypeentity.CampaignType,
                    _campaignstatusentity.CampaignStatus,
                    _vendorentity.Vendor,
                    _automationruleentity.AutomationRule,
                    _departmententity.Department,
                    _costcenterentity.CostCenter,
                    _carrierentity.Carrier,
                    _companysettingsentity.CompanySettings,
                    _vendorcategoryentity.VendorCategory,
                    _billingentity.Payment,
                    _employeeentity.Employee,
                    _positionentity.Position,
                    _contractentity.Contract,
                    _attendanceentity.Attendance,
                    _leavetypeentity.LeaveType,
                    _leaverequestentity.LeaveRequest,
                    _employeedocumententity.EmployeeDocument,
                    _cnssprofileentity.CnssProfile,
                    _irpptaxprofileentity.IrppTaxProfile,
                    _shiftentity.Shift,
                    _shiftassignmententity.ShiftAssignment,
                    _overtimerequestentity.OvertimeRequest,
                    _leavebalanceentity.LeaveBalance,
                    _kpientity.Kpi,
                    _kpiassignmententity.KpiAssignment,
                    _goalentity.Goal,
                    _performancereviewentity.PerformanceReview,
                    _vacationaccrualruleentity.VacationAccrualRule,
                    _hrsettingsentity.HrSettings,
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
                    _banktransferfileentity.BankTransferFile
                ]
            }),
            _jwt.JwtModule.register({
                global: true,
                secret: "NexusCRM2026SecretKeyForJWTTokenGenerationMustBeAtLeast256BitsLong",
                signOptions: {
                    expiresIn: "7d"
                }
            }),
            _passport.PassportModule.register({
                defaultStrategy: "jwt"
            }),
            _authmodule.AuthModule,
            _usersmodule.UsersModule,
            _leadsmodule.LeadsModule,
            _dealsmodule.DealsModule,
            _accountsmodule.AccountsModule,
            _contactsmodule.ContactsModule,
            _settingsmodule.SettingsModule,
            _uploadsmodule.UploadsModule,
            _gmailmodule.GmailModule,
            _activitiesmodule.ActivitiesModule,
            _profilemodule.ProfileModule,
            _productsmodule.ProductsModule,
            _billingmodule.BillingModule,
            _rolesmodule.RolesModule,
            _permissionsmodule.PermissionsModule,
            _tasksmodule.TasksModule,
            _forecastmodule.ForecastModule,
            _workdrivemodule.WorkDriveModule,
            _dashboardmodule.DashboardModule,
            _campaignsmodule.CampaignsModule,
            _vendorsmodule.VendorsModule,
            _automationsmodule.AutomationsModule,
            _departmentsmodule.DepartmentsModule,
            _costcentersmodule.CostCentersModule,
            _hrmodule.HrModule,
            _payrollmodule.PayrollModule
        ],
        providers: [
            {
                provide: _core.APP_INTERCEPTOR,
                useClass: _auditinterceptor.AuditInterceptor
            }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map