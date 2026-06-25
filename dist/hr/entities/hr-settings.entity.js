"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HrSettings", {
    enumerable: true,
    get: function() {
        return HrSettings;
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
let HrSettings = class HrSettings {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], HrSettings.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 4,
        scale: 2,
        default: 1.25
    }),
    _ts_metadata("design:type", Number)
], HrSettings.prototype, "overtimeWeekdayRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 4,
        scale: 2,
        default: 1.50
    }),
    _ts_metadata("design:type", Number)
], HrSettings.prototype, "overtimeNightRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 4,
        scale: 2,
        default: 2.00
    }),
    _ts_metadata("design:type", Number)
], HrSettings.prototype, "overtimeRestDayRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "int",
        default: 21
    }),
    _ts_metadata("design:type", Number)
], HrSettings.prototype, "nightStartHour", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "int",
        default: 5
    }),
    _ts_metadata("design:type", Number)
], HrSettings.prototype, "nightEndHour", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar",
        length: 20,
        default: "carry_forward",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], HrSettings.prototype, "leaveYearEndPolicy", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "decimal",
        precision: 10,
        scale: 3,
        default: 0,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], HrSettings.prototype, "leaveCashOutRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "int",
        default: 30,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], HrSettings.prototype, "maxCarryForwardDays", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], HrSettings.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], HrSettings.prototype, "updatedAt", void 0);
HrSettings = _ts_decorate([
    (0, _typeorm.Entity)("hr_settings")
], HrSettings);

//# sourceMappingURL=hr-settings.entity.js.map