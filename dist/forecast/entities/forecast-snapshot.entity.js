"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForecastSnapshot", {
    enumerable: true,
    get: function() {
        return ForecastSnapshot;
    }
});
const _typeorm = require("typeorm");
const _forecastperiodentity = require("./forecast-period.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ForecastSnapshot = class ForecastSnapshot {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], ForecastSnapshot.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_forecastperiodentity.ForecastPeriod),
    (0, _typeorm.JoinColumn)({
        name: 'periodId'
    }),
    _ts_metadata("design:type", typeof _forecastperiodentity.ForecastPeriod === "undefined" ? Object : _forecastperiodentity.ForecastPeriod)
], ForecastSnapshot.prototype, "period", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], ForecastSnapshot.prototype, "periodId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'json'
    }),
    _ts_metadata("design:type", Object)
], ForecastSnapshot.prototype, "dataJson", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ForecastSnapshot.prototype, "createdAt", void 0);
ForecastSnapshot = _ts_decorate([
    (0, _typeorm.Entity)('forecast_snapshots')
], ForecastSnapshot);

//# sourceMappingURL=forecast-snapshot.entity.js.map