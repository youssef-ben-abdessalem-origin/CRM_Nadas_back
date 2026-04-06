"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QualificationStage", {
    enumerable: true,
    get: function() {
        return QualificationStage;
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
let QualificationStage = class QualificationStage {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], QualificationStage.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], QualificationStage.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], QualificationStage.prototype, "order", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], QualificationStage.prototype, "isActive", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], QualificationStage.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamp',
        default: ()=>'CURRENT_TIMESTAMP'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], QualificationStage.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_leadentity.Lead, (lead)=>lead.qualificationStage),
    _ts_metadata("design:type", Array)
], QualificationStage.prototype, "leads", void 0);
QualificationStage = _ts_decorate([
    (0, _typeorm.Entity)('qualification_stages')
], QualificationStage);

//# sourceMappingURL=qualification-stage.entity.js.map