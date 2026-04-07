"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionsController", {
    enumerable: true,
    get: function() {
        return PermissionsController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _permissionsservice = require("./permissions.service");
const _passport = require("@nestjs/passport");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PermissionsController = class PermissionsController {
    findAll() {
        return this.permissionsService.findAll();
    }
    constructor(permissionsService){
        this.permissionsService = permissionsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all available permissions'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], PermissionsController.prototype, "findAll", null);
PermissionsController = _ts_decorate([
    (0, _swagger.ApiTags)('Permissions'),
    (0, _common.Controller)('permissions'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], PermissionsController);

//# sourceMappingURL=permissions.controller.js.map