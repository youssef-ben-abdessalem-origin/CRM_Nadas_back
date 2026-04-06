"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccountsModule", {
    enumerable: true,
    get: function() {
        return AccountsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _accountsservice = require("./accounts.service");
const _accountscontroller = require("./accounts.controller");
const _accountentity = require("./entities/account.entity");
const _accounttypeentity = require("./entities/account-type.entity");
const _accountstatusentity = require("./entities/account-status.entity");
const _accounttierentity = require("./entities/account-tier.entity");
const _contactentity = require("../contacts/entities/contact.entity");
const _contactstatusentity = require("../contacts/entities/contact-status.entity");
const _contacttierentity = require("../contacts/entities/contact-tier.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AccountsModule = class AccountsModule {
};
AccountsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _accountentity.Account,
                _accounttypeentity.AccountType,
                _accountstatusentity.AccountStatus,
                _accounttierentity.AccountTier,
                _contactentity.Contact,
                _contactstatusentity.ContactStatus,
                _contacttierentity.ContactTier
            ])
        ],
        providers: [
            _accountsservice.AccountsService
        ],
        controllers: [
            _accountscontroller.AccountsController
        ],
        exports: [
            _accountsservice.AccountsService
        ]
    })
], AccountsModule);

//# sourceMappingURL=accounts.module.js.map