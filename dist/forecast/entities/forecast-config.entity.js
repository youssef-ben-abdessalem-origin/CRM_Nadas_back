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
    get ForecastConfig () {
        return ForecastConfig;
    },
    get ForecastModelType () {
        return ForecastModelType;
    },
    get HierarchyType () {
        return HierarchyType;
    },
    get MetricType () {
        return MetricType;
    }
});
const _typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var ForecastModelType = /*#__PURE__*/ function(ForecastModelType) {
    ForecastModelType["TOP_DOWN"] = "TOP_DOWN";
    ForecastModelType["BOTTOM_UP"] = "BOTTOM_UP";
    return ForecastModelType;
}({});
var HierarchyType = /*#__PURE__*/ function(HierarchyType) {
    HierarchyType["ROLE"] = "ROLE";
    HierarchyType["TERRITORY"] = "TERRITORY";
    return HierarchyType;
}({});
var MetricType = /*#__PURE__*/ function(MetricType) {
    MetricType["REVENUE"] = "REVENUE";
    MetricType["QUANTITY"] = "QUANTITY";
    return MetricType;
}({});
let ForecastConfig = class ForecastConfig {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], ForecastConfig.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: ForecastModelType,
        default: "BOTTOM_UP"
    }),
    _ts_metadata("design:type", String)
], ForecastConfig.prototype, "modelType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: HierarchyType,
        default: "ROLE"
    }),
    _ts_metadata("design:type", String)
], ForecastConfig.prototype, "hierarchyType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: MetricType,
        default: "REVENUE"
    }),
    _ts_metadata("design:type", String)
], ForecastConfig.prototype, "metricType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'USD'
    }),
    _ts_metadata("design:type", String)
], ForecastConfig.prototype, "currency", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'simple-array',
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], ForecastConfig.prototype, "includedStages", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ForecastConfig.prototype, "createdAt", void 0);
ForecastConfig = _ts_decorate([
    (0, _typeorm.Entity)('forecast_config')
], ForecastConfig);

//# sourceMappingURL=forecast-config.entity.js.map