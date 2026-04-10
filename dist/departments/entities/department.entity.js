"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Department", {
    enumerable: true,
    get: function() {
        return Department;
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
let Department = class Department {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Department.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], Department.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "text",
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Department.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User, {
        nullable: true,
        eager: true
    }),
    (0, _typeorm.JoinColumn)({
        name: "representativeId"
    }),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], Department.prototype, "representative", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Department.prototype, "representativeId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_userentity.User, {
        eager: true
    }),
    (0, _typeorm.JoinTable)({
        name: "department_members",
        joinColumn: {
            name: "departmentId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "userId",
            referencedColumnName: "id"
        }
    }),
    _ts_metadata("design:type", Array)
], Department.prototype, "members", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Department.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Department.prototype, "updatedAt", void 0);
Department = _ts_decorate([
    (0, _typeorm.Entity)("departments")
], Department);

//# sourceMappingURL=department.entity.js.map