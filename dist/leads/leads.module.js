"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LeadsModule", {
    enumerable: true,
    get: function() {
        return LeadsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _leadscontroller = require("./leads.controller");
const _leadsservice = require("./leads.service");
const _leadentity = require("./entities/lead.entity");
const _leadsourceentity = require("./entities/lead-source.entity");
const _pipelinestageentity = require("./entities/pipeline-stage.entity");
const _leadscorecategoryentity = require("./entities/lead-score-category.entity");
const _leadpriorityentity = require("./entities/lead-priority.entity");
const _qualificationstageentity = require("./entities/qualification-stage.entity");
const _contactstatusentity = require("../contacts/entities/contact-status.entity");
const _contacttierentity = require("../contacts/entities/contact-tier.entity");
const _dealstageentity = require("../deals/entities/deal-stage.entity");
const _accountsmodule = require("../accounts/accounts.module");
const _contactsmodule = require("../contacts/contacts.module");
const _dealsmodule = require("../deals/deals.module");
const _automationsmodule = require("../automations/automations.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LeadsModule = class LeadsModule {
};
LeadsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _leadentity.Lead,
                _leadsourceentity.LeadSource,
                _pipelinestageentity.PipelineStage,
                _leadscorecategoryentity.LeadScoreCategory,
                _leadpriorityentity.LeadPriority,
                _qualificationstageentity.QualificationStage,
                _contactstatusentity.ContactStatus,
                _contacttierentity.ContactTier,
                _dealstageentity.DealStage
            ]),
            (0, _common.forwardRef)(()=>_accountsmodule.AccountsModule),
            (0, _common.forwardRef)(()=>_contactsmodule.ContactsModule),
            (0, _common.forwardRef)(()=>_dealsmodule.DealsModule),
            _automationsmodule.AutomationsModule
        ],
        controllers: [
            _leadscontroller.LeadsController
        ],
        providers: [
            _leadsservice.LeadsService
        ],
        exports: [
            _leadsservice.LeadsService
        ]
    })
], LeadsModule);

//# sourceMappingURL=leads.module.js.map