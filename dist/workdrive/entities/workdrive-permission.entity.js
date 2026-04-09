"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get WorkDrivePermission () {
        return WorkDrivePermission;
    },
    get WorkDriveRole () {
        return WorkDriveRole;
    }
});
const _typeorm = require("typeorm");
const _workdrivefolderentity = require("./workdrive-folder.entity");
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
var WorkDriveRole = /*#__PURE__*/ function(WorkDriveRole) {
    WorkDriveRole["ADMIN"] = "ADMIN";
    WorkDriveRole["ORGANIZER"] = "ORGANIZER";
    WorkDriveRole["EDITOR"] = "EDITOR";
    WorkDriveRole["COMMENTER"] = "COMMENTER";
    WorkDriveRole["VIEWER"] = "VIEWER";
    return WorkDriveRole;
}({});
let WorkDrivePermission = class WorkDrivePermission {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], WorkDrivePermission.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_workdrivefolderentity.WorkDriveFolder),
    _ts_metadata("design:type", typeof _workdrivefolderentity.WorkDriveFolder === "undefined" ? Object : _workdrivefolderentity.WorkDriveFolder)
], WorkDrivePermission.prototype, "folder", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], WorkDrivePermission.prototype, "folderId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], WorkDrivePermission.prototype, "user", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], WorkDrivePermission.prototype, "userId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: WorkDriveRole,
        default: "VIEWER"
    }),
    _ts_metadata("design:type", String)
], WorkDrivePermission.prototype, "role", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkDrivePermission.prototype, "createdAt", void 0);
WorkDrivePermission = _ts_decorate([
    (0, _typeorm.Entity)('workdrive_permissions')
], WorkDrivePermission);

//# sourceMappingURL=workdrive-permission.entity.js.map