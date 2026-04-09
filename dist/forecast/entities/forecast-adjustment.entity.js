"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForecastAdjustment", {
    enumerable: true,
    get: function() {
        return ForecastAdjustment;
    }
});
const _typeorm = require("typeorm");
const _userentity = require("../../users/entities/user.entity");
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
let ForecastAdjustment = class ForecastAdjustment {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], ForecastAdjustment.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User),
    (0, _typeorm.JoinColumn)({
        name: 'userId'
    }),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], ForecastAdjustment.prototype, "user", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], ForecastAdjustment.prototype, "userId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_forecastperiodentity.ForecastPeriod),
    (0, _typeorm.JoinColumn)({
        name: 'periodId'
    }),
    _ts_metadata("design:type", typeof _forecastperiodentity.ForecastPeriod === "undefined" ? Object : _forecastperiodentity.ForecastPeriod)
], ForecastAdjustment.prototype, "period", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], ForecastAdjustment.prototype, "periodId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ForecastAdjustment.prototype, "commitOverride", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 15,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ForecastAdjustment.prototype, "bestCaseOverride", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ForecastAdjustment.prototype, "note", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User),
    (0, _typeorm.JoinColumn)({
        name: 'createdById'
    }),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], ForecastAdjustment.prototype, "createdBy", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], ForecastAdjustment.prototype, "createdById", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ForecastAdjustment.prototype, "createdAt", void 0);
ForecastAdjustment = _ts_decorate([
    (0, _typeorm.Entity)('forecast_adjustments')
], ForecastAdjustment);

//# sourceMappingURL=forecast-adjustment.entity.js.map