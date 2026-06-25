"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Shift", {
    enumerable: true,
    get: function() {
        return Shift;
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
let Shift = class Shift {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Shift.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], Shift.prototype, "code", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Shift.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar"
    }),
    _ts_metadata("design:type", String)
], Shift.prototype, "startTime", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar"
    }),
    _ts_metadata("design:type", String)
], Shift.prototype, "endTime", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "float",
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Shift.prototype, "breakDuration", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Shift.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Shift.prototype, "color", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], Shift.prototype, "flexible", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Shift.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Shift.prototype, "updatedAt", void 0);
Shift = _ts_decorate([
    (0, _typeorm.Entity)("shifts")
], Shift);

//# sourceMappingURL=shift.entity.js.map