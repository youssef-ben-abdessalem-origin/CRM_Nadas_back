"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LeadScoreCategory", {
    enumerable: true,
    get: function() {
        return LeadScoreCategory;
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
let LeadScoreCategory = class LeadScoreCategory {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], LeadScoreCategory.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], LeadScoreCategory.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LeadScoreCategory.prototype, "color", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], LeadScoreCategory.prototype, "order", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], LeadScoreCategory.prototype, "isActive", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamp',
        default: ()=>'CURRENT_TIMESTAMP'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LeadScoreCategory.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_leadentity.Lead, (lead)=>lead.scoreCategory),
    _ts_metadata("design:type", Array)
], LeadScoreCategory.prototype, "leads", void 0);
LeadScoreCategory = _ts_decorate([
    (0, _typeorm.Entity)('lead_score_categories')
], LeadScoreCategory);

//# sourceMappingURL=lead-score-category.entity.js.map