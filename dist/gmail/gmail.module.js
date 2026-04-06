"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailModule", {
    enumerable: true,
    get: function() {
        return GmailModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _gmailcontroller = require("./gmail.controller");
const _gmailservice = require("./gmail.service");
const _userentity = require("../users/entities/user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GmailModule = class GmailModule {
};
GmailModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _userentity.User
            ])
        ],
        controllers: [
            _gmailcontroller.GmailController
        ],
        providers: [
            _gmailservice.GmailService
        ],
        exports: [
            _gmailservice.GmailService
        ]
    })
], GmailModule);

//# sourceMappingURL=gmail.module.js.map