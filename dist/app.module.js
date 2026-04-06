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
const _typeorm = require("@nestjs/typeorm");
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
const _productsmodule = require("./products/products.module");
const _billingmodule = require("./billing/billing.module");
const _billingentity = require("./billing/entities/billing.entity");
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
                database: "nexus_crm_new",
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
                    _billingentity.Quote,
                    _billingentity.Invoice
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
            _billingmodule.BillingModule
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map