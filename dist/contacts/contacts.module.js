"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ContactsModule", {
    enumerable: true,
    get: function() {
        return ContactsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _contactsservice = require("./contacts.service");
const _contactscontroller = require("./contacts.controller");
const _contactentity = require("./entities/contact.entity");
const _contactstatusentity = require("./entities/contact-status.entity");
const _contacttierentity = require("./entities/contact-tier.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ContactsModule = class ContactsModule {
};
ContactsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _contactentity.Contact,
                _contactstatusentity.ContactStatus,
                _contacttierentity.ContactTier
            ])
        ],
        providers: [
            _contactsservice.ContactsService
        ],
        controllers: [
            _contactscontroller.ContactsController
        ],
        exports: [
            _contactsservice.ContactsService
        ]
    })
], ContactsModule);

//# sourceMappingURL=contacts.module.js.map