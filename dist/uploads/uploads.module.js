"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UploadsModule", {
    enumerable: true,
    get: function() {
        return UploadsModule;
    }
});
const _common = require("@nestjs/common");
const _platformexpress = require("@nestjs/platform-express");
const _typeorm = require("@nestjs/typeorm");
const _cloudinarymodule = require("../cloudinary.module");
const _uploadscontroller = require("./uploads.controller");
const _uploadsservice = require("./uploads.service");
const _userentity = require("../users/entities/user.entity");
const _leadentity = require("../leads/entities/lead.entity");
const _campaignentity = require("../campaigns/entities/campaign.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UploadsModule = class UploadsModule {
};
UploadsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _cloudinarymodule.CloudinaryModule,
            _typeorm.TypeOrmModule.forFeature([
                _userentity.User,
                _leadentity.Lead,
                _campaignentity.Campaign
            ]),
            _platformexpress.MulterModule.register({
                limits: {
                    fileSize: 5 * 1024 * 1024
                }
            })
        ],
        controllers: [
            _uploadscontroller.UploadsController
        ],
        providers: [
            _uploadsservice.UploadsService
        ],
        exports: [
            _uploadsservice.UploadsService
        ]
    })
], UploadsModule);

//# sourceMappingURL=uploads.module.js.map