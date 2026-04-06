"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LeadPriority", {
    enumerable: true,
    get: function() {
        return LeadPriority;
    }
});
const _typeorm = require("typeorm");
const _leadentity = require("./lead.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LeadPriority = class LeadPriority {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], LeadPriority.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], LeadPriority.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LeadPriority.prototype, "color", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], LeadPriority.prototype, "order", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], LeadPriority.prototype, "isActive", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamp',
        default: ()=>'CURRENT_TIMESTAMP'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeadPriority.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_leadentity.Lead, (lead)=>lead.priority),
    _ts_metadata("design:type", Array)
], LeadPriority.prototype, "leads", void 0);
LeadPriority = _ts_decorate([
    (0, _typeorm.Entity)('lead_priorities')
], LeadPriority);

//# sourceMappingURL=lead-priority.entity.js.map