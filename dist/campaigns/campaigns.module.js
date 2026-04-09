"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CampaignsModule", {
    enumerable: true,
    get: function() {
        return CampaignsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _campaignscontroller = require("./campaigns.controller");
const _campaignsservice = require("./campaigns.service");
const _campaignentity = require("./entities/campaign.entity");
const _campaigntypeentity = require("./entities/campaign-type.entity");
const _campaignstatusentity = require("./entities/campaign-status.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CampaignsModule = class CampaignsModule {
};
CampaignsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _campaignentity.Campaign,
                _campaigntypeentity.CampaignType,
                _campaignstatusentity.CampaignStatus
            ])
        ],
        controllers: [
            _campaignscontroller.CampaignsController
        ],
        providers: [
            _campaignsservice.CampaignsService
        ],
        exports: [
            _campaignsservice.CampaignsService
        ]
    })
], CampaignsModule);

//# sourceMappingURL=campaigns.module.js.map