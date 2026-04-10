"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AutomationsModule", {
    enumerable: true,
    get: function() {
        return AutomationsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _automationscontroller = require("./automations.controller");
const _automationsservice = require("./automations.service");
const _automationruleentity = require("./entities/automation-rule.entity");
const _leadentity = require("../leads/entities/lead.entity");
const _dealentity = require("../deals/entities/deal.entity");
const _taskentity = require("../tasks/entities/task.entity");
const _notificationentity = require("../settings/entities/notification.entity");
const _userentity = require("../users/entities/user.entity");
const _gmailmodule = require("../gmail/gmail.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AutomationsModule = class AutomationsModule {
};
AutomationsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _automationruleentity.AutomationRule,
                _leadentity.Lead,
                _dealentity.Deal,
                _taskentity.Task,
                _notificationentity.Notification,
                _userentity.User
            ]),
            _gmailmodule.GmailModule
        ],
        controllers: [
            _automationscontroller.AutomationsController
        ],
        providers: [
            _automationsservice.AutomationsService
        ],
        exports: [
            _automationsservice.AutomationsService
        ]
    })
], AutomationsModule);

//# sourceMappingURL=automations.module.js.map