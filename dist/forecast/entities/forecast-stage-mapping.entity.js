"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ForecastCategory () {
        return ForecastCategory;
    },
    get ForecastStageMapping () {
        return ForecastStageMapping;
    }
});
const _typeorm = require("typeorm");
const _dealstageentity = require("../../deals/entities/deal-stage.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var ForecastCategory = /*#__PURE__*/ function(ForecastCategory) {
    ForecastCategory["PIPELINE"] = "PIPELINE";
    ForecastCategory["BEST_CASE"] = "BEST_CASE";
    ForecastCategory["COMMIT"] = "COMMIT";
    ForecastCategory["CLOSED"] = "CLOSED";
    return ForecastCategory;
}({});
let ForecastStageMapping = class ForecastStageMapping {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], ForecastStageMapping.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], ForecastStageMapping.prototype, "stageName", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)(()=>_dealstageentity.DealStage),
    (0, _typeorm.JoinColumn)({
        name: 'dealStageId'
    }),
    _ts_metadata("design:type", typeof _dealstageentity.DealStage === "undefined" ? Object : _dealstageentity.DealStage)
], ForecastStageMapping.prototype, "dealStage", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], ForecastStageMapping.prototype, "dealStageId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: ForecastCategory,
        default: "PIPELINE"
    }),
    _ts_metadata("design:type", String)
], ForecastStageMapping.prototype, "category", void 0);
ForecastStageMapping = _ts_decorate([
    (0, _typeorm.Entity)('forecast_stage_mapping')
], ForecastStageMapping);

//# sourceMappingURL=forecast-stage-mapping.entity.js.map