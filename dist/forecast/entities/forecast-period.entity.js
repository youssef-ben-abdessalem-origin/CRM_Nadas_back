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
    get ForecastPeriod () {
        return ForecastPeriod;
    },
    get PeriodStatus () {
        return PeriodStatus;
    },
    get PeriodType () {
        return PeriodType;
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
var PeriodType = /*#__PURE__*/ function(PeriodType) {
    PeriodType["MONTH"] = "MONTH";
    PeriodType["QUARTER"] = "QUARTER";
    return PeriodType;
}({});
var PeriodStatus = /*#__PURE__*/ function(PeriodStatus) {
    PeriodStatus["OPEN"] = "OPEN";
    PeriodStatus["LOCKED"] = "LOCKED";
    PeriodStatus["CLOSED"] = "CLOSED";
    return PeriodStatus;
}({});
let ForecastPeriod = class ForecastPeriod {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], ForecastPeriod.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], ForecastPeriod.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'date'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ForecastPeriod.prototype, "startDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'date'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ForecastPeriod.prototype, "endDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: PeriodType,
        default: "MONTH"
    }),
    _ts_metadata("design:type", String)
], ForecastPeriod.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: PeriodStatus,
        default: "OPEN"
    }),
    _ts_metadata("design:type", String)
], ForecastPeriod.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ForecastPeriod.prototype, "createdAt", void 0);
ForecastPeriod = _ts_decorate([
    (0, _typeorm.Entity)('forecast_periods')
], ForecastPeriod);

//# sourceMappingURL=forecast-period.entity.js.map