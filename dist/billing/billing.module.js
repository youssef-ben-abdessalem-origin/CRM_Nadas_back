"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingModule", {
    enumerable: true,
    get: function() {
        return BillingModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _billingservice = require("./billing.service");
const _billingcontroller = require("./billing.controller");
const _billingentity = require("./entities/billing.entity");
const _contactsmodule = require("../contacts/contacts.module");
const _accountsmodule = require("../accounts/accounts.module");
const _dealsmodule = require("../deals/deals.module");
const _gmailmodule = require("../gmail/gmail.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let BillingModule = class BillingModule {
};
BillingModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _billingentity.Quote,
                _billingentity.Invoice,
                _billingentity.Payment,
                _billingentity.QuoteItem,
                _billingentity.InvoiceItem
            ]),
            _contactsmodule.ContactsModule,
            _accountsmodule.AccountsModule,
            _dealsmodule.DealsModule,
            _gmailmodule.GmailModule
        ],
        providers: [
            _billingservice.BillingService
        ],
        controllers: [
            _billingcontroller.BillingController
        ],
        exports: [
            _billingservice.BillingService
        ]
    })
], BillingModule);

//# sourceMappingURL=billing.module.js.map