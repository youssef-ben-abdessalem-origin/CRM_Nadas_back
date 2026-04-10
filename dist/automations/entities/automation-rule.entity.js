"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AutomationRule", {
    enumerable: true,
    get: function() {
        return AutomationRule;
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
let AutomationRule = class AutomationRule {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], AutomationRule.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], AutomationRule.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar"
    }),
    _ts_metadata("design:type", typeof AutomationEntityType === "undefined" ? Object : AutomationEntityType)
], AutomationRule.prototype, "entity", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "varchar"
    }),
    _ts_metadata("design:type", typeof AutomationEventType === "undefined" ? Object : AutomationEventType)
], AutomationRule.prototype, "event", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "jsonb",
        default: []
    }),
    _ts_metadata("design:type", Array)
], AutomationRule.prototype, "conditions", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "jsonb",
        default: []
    }),
    _ts_metadata("design:type", Array)
], AutomationRule.prototype, "actions", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], AutomationRule.prototype, "priority", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], AutomationRule.prototype, "isActive", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], AutomationRule.prototype, "stopIfMatched", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AutomationRule.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AutomationRule.prototype, "updatedAt", void 0);
AutomationRule = _ts_decorate([
    (0, _typeorm.Entity)("automation_rules")
], AutomationRule);

//# sourceMappingURL=automation-rule.entity.js.map