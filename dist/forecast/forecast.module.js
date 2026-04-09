"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForecastModule", {
    enumerable: true,
    get: function() {
        return ForecastModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _forecastservice = require("./forecast.service");
const _forecastcontroller = require("./forecast.controller");
const _forecastperiodentity = require("./entities/forecast-period.entity");
const _forecasttargetentity = require("./entities/forecast-target.entity");
const _forecastadjustmententity = require("./entities/forecast-adjustment.entity");
const _forecastconfigentity = require("./entities/forecast-config.entity");
const _forecaststagemappingentity = require("./entities/forecast-stage-mapping.entity");
const _forecastsnapshotentity = require("./entities/forecast-snapshot.entity");
const _dealentity = require("../deals/entities/deal.entity");
const _userentity = require("../users/entities/user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ForecastModule = class ForecastModule {
};
ForecastModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _forecastperiodentity.ForecastPeriod,
                _forecasttargetentity.ForecastTarget,
                _forecastadjustmententity.ForecastAdjustment,
                _forecastconfigentity.ForecastConfig,
                _forecaststagemappingentity.ForecastStageMapping,
                _forecastsnapshotentity.ForecastSnapshot,
                _dealentity.Deal,
                _userentity.User
            ])
        ],
        controllers: [
            _forecastcontroller.ForecastController
        ],
        providers: [
            _forecastservice.ForecastService
        ],
        exports: [
            _forecastservice.ForecastService
        ]
    })
], ForecastModule);

//# sourceMappingURL=forecast.module.js.map