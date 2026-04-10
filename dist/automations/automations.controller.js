"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AutomationsController", {
    enumerable: true,
    get: function() {
        return AutomationsController;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _swagger = require("@nestjs/swagger");
const _automationsservice = require("./automations.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AutomationsController = class AutomationsController {
    findAll() {
        return this.automationsService.findAll();
    }
    create(data) {
        return this.automationsService.create(data);
    }
    test(data) {
        return this.automationsService.testRule(data);
    }
    update(id, data) {
        return this.automationsService.update(Number(id), data);
    }
    toggle(id) {
        return this.automationsService.toggle(Number(id));
    }
    delete(id) {
        return this.automationsService.delete(Number(id));
    }
    constructor(automationsService){
        this.automationsService = automationsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _swagger.ApiOperation)({
        summary: "Get all automation rules"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AutomationsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _swagger.ApiOperation)({
        summary: "Create automation rule"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AutomationsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Post)("test"),
    (0, _swagger.ApiOperation)({
        summary: "Test automation rules against a payload"
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], AutomationsController.prototype, "test", null);
_ts_decorate([
    (0, _common.Put)(":id"),
    (0, _swagger.ApiOperation)({
        summary: "Update automation rule"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AutomationsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Patch)(":id/toggle"),
    (0, _swagger.ApiOperation)({
        summary: "Toggle automation rule active state"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AutomationsController.prototype, "toggle", null);
_ts_decorate([
    (0, _common.Delete)(":id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete automation rule"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], AutomationsController.prototype, "delete", null);
AutomationsController = _ts_decorate([
    (0, _swagger.ApiTags)("Automations"),
    (0, _common.Controller)("automations"),
    (0, _common.UseGuards)((0, _passport.AuthGuard)("jwt")),
    (0, _swagger.ApiBearerAuth)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _automationsservice.AutomationsService === "undefined" ? Object : _automationsservice.AutomationsService
    ])
], AutomationsController);

//# sourceMappingURL=automations.controller.js.map