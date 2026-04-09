"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkDriveFile", {
    enumerable: true,
    get: function() {
        return WorkDriveFile;
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
let WorkDriveFile = class WorkDriveFile {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], WorkDriveFile.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], WorkDriveFile.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], WorkDriveFile.prototype, "size", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], WorkDriveFile.prototype, "mimeType", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], WorkDriveFile.prototype, "url", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_workdrivefolderentity.WorkDriveFolder),
    _ts_metadata("design:type", typeof _workdrivefolderentity.WorkDriveFolder === "undefined" ? Object : _workdrivefolderentity.WorkDriveFolder)
], WorkDriveFile.prototype, "folder", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], WorkDriveFile.prototype, "folderId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], WorkDriveFile.prototype, "owner", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Number)
], WorkDriveFile.prototype, "ownerId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkDriveFile.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkDriveFile.prototype, "updatedAt", void 0);
WorkDriveFile = _ts_decorate([
    (0, _typeorm.Entity)('workdrive_files')
], WorkDriveFile);

//# sourceMappingURL=workdrive-file.entity.js.map