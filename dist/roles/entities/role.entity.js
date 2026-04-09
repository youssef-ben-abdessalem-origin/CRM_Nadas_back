"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Role", {
    enumerable: true,
    get: function() {
        return Role;
    }
});
const _typeorm = require("typeorm");
const _permissionentity = require("../../permissions/entities/permission.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Role = class Role {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], Role.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], Role.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Role.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: '#3b82f6'
    }),
    _ts_metadata("design:type", String)
], Role.prototype, "color", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], Role.prototype, "isSystem", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_permissionentity.Permission, {
        eager: true
    }),
    (0, _typeorm.JoinTable)({
        name: 'role_permissions',
        joinColumn: {
            name: 'roleId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permissionId',
            referencedColumnName: 'id'
        }
    }),
    _ts_metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Role.prototype, "createdAt", void 0);
Role = _ts_decorate([
    (0, _typeorm.Entity)('roles')
], Role);

//# sourceMappingURL=role.entity.js.map