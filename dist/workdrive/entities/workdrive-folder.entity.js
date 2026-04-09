"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkDriveFolder", {
    enumerable: true,
    get: function() {
        return WorkDriveFolder;
    }
});
const _typeorm = require("typeorm");
const _workdriveteamentity = require("./workdrive-team.entity");
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
let WorkDriveFolder = class WorkDriveFolder {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], WorkDriveFolder.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], WorkDriveFolder.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], WorkDriveFolder.prototype, "isTeamFolder", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], WorkDriveFolder.prototype, "parentId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>WorkDriveFolder, (folder)=>folder.children),
    _ts_metadata("design:type", Object)
], WorkDriveFolder.prototype, "parent", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>WorkDriveFolder, (folder)=>folder.parent),
    _ts_metadata("design:type", Array)
], WorkDriveFolder.prototype, "children", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_workdriveteamentity.WorkDriveTeam),
    _ts_metadata("design:type", typeof _workdriveteamentity.WorkDriveTeam === "undefined" ? Object : _workdriveteamentity.WorkDriveTeam)
], WorkDriveFolder.prototype, "team", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], WorkDriveFolder.prototype, "teamId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], WorkDriveFolder.prototype, "owner", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], WorkDriveFolder.prototype, "ownerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkDriveFolder.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkDriveFolder.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkDriveFolder.prototype, "updatedAt", void 0);
WorkDriveFolder = _ts_decorate([
    (0, _typeorm.Entity)('workdrive_folders')
], WorkDriveFolder);

//# sourceMappingURL=workdrive-folder.entity.js.map