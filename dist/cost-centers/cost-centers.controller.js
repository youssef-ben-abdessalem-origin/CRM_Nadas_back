"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CostCentersController", {
    enumerable: true,
    get: function() {
        return CostCentersController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _passport = require("@nestjs/passport");
const _costcentersservice = require("./cost-centers.service");
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
let CostCentersController = class CostCentersController {
    findAll() {
        return this.costCentersService.findAll();
    }
    create(data) {
        return this.costCentersService.create(data);
    }
    update(id, data) {
        return this.costCentersService.update(Number(id), data);
    }
    delete(id) {
        return this.costCentersService.delete(Number(id));
    }
    constructor(costCentersService){
        this.costCentersService = costCentersService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _swagger.ApiOperation)({
        summary: "Get all cost centers"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], CostCentersController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _swagger.ApiOperation)({
        summary: "Create cost center"
    }),
    (0, _swagger.ApiBody)({
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    example: "Administration Tunis"
                },
                description: {
                    type: "string",
                    example: "Shared admin overhead center"
                },
                departmentId: {
                    type: "number",
                    example: 3
                },
                managerId: {
                    type: "number",
                    example: 12
                },
                status: {
                    type: "string",
                    example: "Active"
                }
            },
            required: [
                "name"
            ]
        }
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], CostCentersController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(":id"),
    (0, _swagger.ApiOperation)({
        summary: "Update cost center"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], CostCentersController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(":id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete cost center"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], CostCentersController.prototype, "delete", null);
CostCentersController = _ts_decorate([
    (0, _swagger.ApiTags)("Cost Centers"),
    (0, _common.Controller)("cost-centers"),
    (0, _common.UseGuards)((0, _passport.AuthGuard)("jwt")),
    (0, _swagger.ApiBearerAuth)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _costcentersservice.CostCentersService === "undefined" ? Object : _costcentersservice.CostCentersService
    ])
], CostCentersController);

//# sourceMappingURL=cost-centers.controller.js.map