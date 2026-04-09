"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkDriveModule", {
    enumerable: true,
    get: function() {
        return WorkDriveModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workdriveservice = require("./workdrive.service");
const _workdrivecontroller = require("./workdrive.controller");
const _workdriveteamentity = require("./entities/workdrive-team.entity");
const _workdrivefolderentity = require("./entities/workdrive-folder.entity");
const _workdrivefileentity = require("./entities/workdrive-file.entity");
const _workdrivepermissionentity = require("./entities/workdrive-permission.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkDriveModule = class WorkDriveModule {
};
WorkDriveModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workdriveteamentity.WorkDriveTeam,
                _workdrivefolderentity.WorkDriveFolder,
                _workdrivefileentity.WorkDriveFile,
                _workdrivepermissionentity.WorkDrivePermission
            ])
        ],
        controllers: [
            _workdrivecontroller.WorkDriveController
        ],
        providers: [
            _workdriveservice.WorkDriveService
        ],
        exports: [
            _workdriveservice.WorkDriveService
        ]
    })
], WorkDriveModule);

//# sourceMappingURL=workdrive.module.js.map