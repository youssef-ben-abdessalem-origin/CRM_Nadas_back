"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ContactStatus", {
    enumerable: true,
    get: function() {
        return ContactStatus;
    }
});
const _typeorm = require("typeorm");
const _contactentity = require("./contact.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ContactStatus = class ContactStatus {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], ContactStatus.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], ContactStatus.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ContactStatus.prototype, "color", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], ContactStatus.prototype, "order", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], ContactStatus.prototype, "isActive", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], ContactStatus.prototype, "isDefault", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamp',
        default: ()=>'CURRENT_TIMESTAMP'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ContactStatus.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_contactentity.Contact, (contact)=>contact.contactStatus),
    _ts_metadata("design:type", Array)
], ContactStatus.prototype, "contacts", void 0);
ContactStatus = _ts_decorate([
    (0, _typeorm.Entity)('contact_statuses')
], ContactStatus);

//# sourceMappingURL=contact-status.entity.js.map