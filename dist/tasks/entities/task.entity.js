"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Task", {
    enumerable: true,
    get: function() {
        return Task;
    }
});
const _typeorm = require("typeorm");
const _userentity = require("../../users/entities/user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Task = class Task {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Task.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Task.prototype, "subject", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Task.prototype, "dueDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'Normal'
    }),
    _ts_metadata("design:type", String)
], Task.prototype, "priority", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'Pending'
    }),
    _ts_metadata("design:type", String)
], Task.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Task.prototype, "entityType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Task.prototype, "entityId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Task.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], Task.prototype, "hasReminder", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Task.prototype, "reminder", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], Task.prototype, "hasRepeat", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Task.prototype, "repeat", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'ownerId'
    }),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], Task.prototype, "owner", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Task.prototype, "ownerId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'createdById'
    }),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], Task.prototype, "createdBy", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Task.prototype, "createdById", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Task.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Task.prototype, "updatedAt", void 0);
Task = _ts_decorate([
    (0, _typeorm.Entity)('tasks')
], Task);

//# sourceMappingURL=task.entity.js.map