import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditInterceptor } from "./common/interceptors/audit.interceptor";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { LeadsModule } from "./leads/leads.module";
import { DealsModule } from "./deals/deals.module";
import { AccountsModule } from "./accounts/accounts.module";
import { ContactsModule } from "./contacts/contacts.module";
import { SettingsModule } from "./settings/settings.module";
import { User } from "./users/entities/user.entity";
import { Lead } from "./leads/entities/lead.entity";
import { LeadSource } from "./leads/entities/lead-source.entity";
import { PipelineStage } from "./leads/entities/pipeline-stage.entity";
import { LeadScoreCategory } from "./leads/entities/lead-score-category.entity";
import { LeadPriority } from "./leads/entities/lead-priority.entity";
import { QualificationStage } from "./leads/entities/qualification-stage.entity";
import { Deal } from "./deals/entities/deal.entity";
import { DealStage } from "./deals/entities/deal-stage.entity";
import { DealReason } from "./deals/entities/deal-reason.entity";
import { Account } from "./accounts/entities/account.entity";
import { AccountType } from "./accounts/entities/account-type.entity";
import { AccountStatus } from "./accounts/entities/account-status.entity";
import { AccountTier } from "./accounts/entities/account-tier.entity";
import { Contact } from "./contacts/entities/contact.entity";
import { ContactStatus } from "./contacts/entities/contact-status.entity";
import { ContactTier } from "./contacts/entities/contact-tier.entity";
import { Currency } from "./settings/entities/currency.entity";
import { Country } from "./settings/entities/country.entity";
import { Industry } from "./settings/entities/industry.entity";
import { Tag } from "./settings/entities/tag.entity";
import { ActivityType } from "./settings/entities/activity-type.entity";
import { EmailTemplate } from "./settings/entities/email-template.entity";
import { Notification } from "./settings/entities/notification.entity";
import { AuditLog } from "./settings/entities/audit-log.entity";
import { Carrier } from "./settings/entities/carrier.entity";
import { CompanySettings } from "./settings/entities/company-settings.entity";
import { UploadsModule } from "./uploads/uploads.module";
import { ProfileModule } from "./profile/profile.module";
import { GmailModule } from "./gmail/gmail.module";
import { ActivitiesModule } from "./activities/activities.module";
import { Activity } from "./activities/entities/activity.entity";
import { Product } from "./products/entities/product.entity";
import { ProductCategory } from "./products/entities/product-category.entity";
import { ProductUnit } from "./products/entities/product-unit.entity";
import { ProductPricingModel } from "./products/entities/product-pricing-model.entity";
import { ProductVariant } from "./products/entities/product-variant.entity";
import { PriceBook } from "./products/entities/price-book.entity";
import { PriceBookItem } from "./products/entities/price-book-item.entity";
import { Brand } from "./products/entities/brand.entity";
import { Inventory } from "./products/entities/inventory.entity";
import { ProductMedia } from "./products/entities/product-media.entity";
import { ProductAttribute } from "./products/entities/product-attribute.entity";
import { ProductType } from "./products/entities/product-type.entity";
import { TaxClass } from "./products/entities/tax-class.entity";
import { ProductsModule } from "./products/products.module";
import { BillingModule } from "./billing/billing.module";
import { Quote, Invoice, QuoteItem, InvoiceItem, Payment } from "./billing/entities/billing.entity";
import { Role } from "./roles/entities/role.entity";
import { Permission } from "./permissions/entities/permission.entity";
import { RolesModule } from "./roles/roles.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { Task } from "./tasks/entities/task.entity";
import { TasksModule } from "./tasks/tasks.module";
import { ForecastModule } from "./forecast/forecast.module";
import { ForecastPeriod } from "./forecast/entities/forecast-period.entity";
import { ForecastTarget } from "./forecast/entities/forecast-target.entity";
import { ForecastAdjustment } from "./forecast/entities/forecast-adjustment.entity";
import { ForecastConfig } from "./forecast/entities/forecast-config.entity";
import { ForecastStageMapping } from "./forecast/entities/forecast-stage-mapping.entity";
import { ForecastSnapshot } from "./forecast/entities/forecast-snapshot.entity";
import { WorkDriveTeam } from "./workdrive/entities/workdrive-team.entity";
import { WorkDriveFolder } from "./workdrive/entities/workdrive-folder.entity";
import { WorkDriveFile } from "./workdrive/entities/workdrive-file.entity";
import { WorkDrivePermission } from "./workdrive/entities/workdrive-permission.entity";
import { WorkDriveModule } from "./workdrive/workdrive.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { Campaign } from "./campaigns/entities/campaign.entity";
import { CampaignType } from "./campaigns/entities/campaign-type.entity";
import { CampaignStatus } from "./campaigns/entities/campaign-status.entity";
import { CampaignsModule } from "./campaigns/campaigns.module";
import { Vendor } from "./vendors/entities/vendor.entity";
import { VendorsModule } from "./vendors/vendors.module";
import { AutomationRule } from "./automations/entities/automation-rule.entity";
import { AutomationsModule } from "./automations/automations.module";
import { Department } from "./departments/entities/department.entity";
import { DepartmentsModule } from "./departments/departments.module";
import { CostCenter } from "./cost-centers/entities/cost-center.entity";
import { CostCentersModule } from "./cost-centers/cost-centers.module";
import { VendorCategory } from "./vendors/entities/vendor-category.entity";

import { Employee } from "./hr/entities/employee.entity";
import { Position } from "./hr/entities/position.entity";
import { Contract } from "./hr/entities/contract.entity";
import { Attendance } from "./hr/entities/attendance.entity";
import { LeaveType } from "./hr/entities/leave-type.entity";
import { LeaveRequest } from "./hr/entities/leave-request.entity";
import { EmployeeDocument } from "./hr/entities/employee-document.entity";
import { CnssProfile } from "./hr/entities/cnss-profile.entity";
import { IrppTaxProfile } from "./hr/entities/irpp-tax-profile.entity";
import { Shift } from "./hr/entities/shift.entity";
import { ShiftAssignment } from "./hr/entities/shift-assignment.entity";
import { OvertimeRequest } from "./hr/entities/overtime-request.entity";
import { LeaveBalance } from "./hr/entities/leave-balance.entity";
import { Kpi } from "./hr/entities/kpi.entity";
import { KpiAssignment } from "./hr/entities/kpi-assignment.entity";
import { Goal } from "./hr/entities/goal.entity";
import { PerformanceReview } from "./hr/entities/performance-review.entity";
import { VacationAccrualRule } from "./hr/entities/vacation-accrual-rule.entity";
import { HrSettings } from "./hr/entities/hr-settings.entity";
import { SalaryComponent } from "./payroll/entities/salary-component.entity";
import { EmployeeSalaryComponent } from "./payroll/entities/employee-salary-component.entity";
import { PayrollProfile } from "./payroll/entities/payroll-profile.entity";
import { PayrollPeriod } from "./payroll/entities/payroll-period.entity";
import { Payslip } from "./payroll/entities/payslip.entity";
import { PayslipDetail } from "./payroll/entities/payslip-detail.entity";
import { Loan } from "./payroll/entities/loan.entity";
import { Advance } from "./payroll/entities/advance.entity";
import { PayrollSettings } from "./payroll/entities/payroll-settings.entity";
import { CnssDeclaration } from "./payroll/entities/cnss-declaration.entity";
import { IrppDeclaration } from "./payroll/entities/irpp-declaration.entity";
import { BankTransferFile } from "./payroll/entities/bank-transfer-file.entity";

import { HrModule } from "./hr/hr.module";
import { PayrollModule } from "./payroll/payroll.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "CRM_NEW_2026",
      synchronize: true,
      entities: [
        User,
        Lead,
        LeadSource,
        PipelineStage,
        LeadScoreCategory,
        LeadPriority,
        QualificationStage,
        Deal,
        DealStage,
        DealReason,
        Account,
        AccountType,
        AccountStatus,
        AccountTier,
        Contact,
        ContactStatus,
        ContactTier,
        Currency,
        Country,
        Industry,
        Tag,
        ActivityType,
        EmailTemplate,
        Notification,
        AuditLog,
        Activity,
        Product,
        ProductCategory,
        ProductUnit,
        ProductPricingModel,
        ProductVariant,
        PriceBook,
        PriceBookItem,
        Brand,
        Inventory,
        ProductMedia,
        ProductAttribute,
        ProductType,
        TaxClass,
        Quote,
        QuoteItem,
        Invoice,
        InvoiceItem,
        Role,
        Permission,
        Task,
        ForecastPeriod,
        ForecastTarget,
        ForecastAdjustment,
        ForecastConfig,
        ForecastStageMapping,
        ForecastSnapshot,
        WorkDriveTeam,
        WorkDriveFolder,
        WorkDriveFile,
        WorkDrivePermission,
        Campaign,
        CampaignType,
        CampaignStatus,
        Vendor,
        AutomationRule,
        Department,
        CostCenter,
        Carrier,
        CompanySettings,
        VendorCategory,
        Payment,
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
        BankTransferFile
      ],
    }),
    JwtModule.register({
      global: true,
      secret:
        "NexusCRM2026SecretKeyForJWTTokenGenerationMustBeAtLeast256BitsLong",
      signOptions: { expiresIn: "7d" },
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    AuthModule,
    UsersModule,
    LeadsModule,
    DealsModule,
    AccountsModule,
    ContactsModule,
    SettingsModule,
    UploadsModule,
    GmailModule,
    ActivitiesModule,
    ProfileModule,
    ProductsModule,
    BillingModule,
    RolesModule,
    PermissionsModule,
    TasksModule,
    ForecastModule,
    WorkDriveModule,
    DashboardModule,
    CampaignsModule,
    VendorsModule,
    AutomationsModule,
    DepartmentsModule,
    CostCentersModule,
    HrModule,
    PayrollModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
