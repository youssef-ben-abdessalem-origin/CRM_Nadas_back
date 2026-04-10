"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DepartmentsController", {
    enumerable: true,
    get: function() {
        return DepartmentsController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _passport = require("@nestjs/passport");
const _departmentsservice = require("./departments.service");
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
let DepartmentsController = class DepartmentsController {
    findAll() {
        return this.departmentsService.findAll();
    }
    ping() {
        return {
            status: "alive"
        };
    }
    create(data) {
        return this.departmentsService.create(data);
    }
    update(id, data) {
        return this.departmentsService.update(Number(id), data);
    }
    delete(id) {
        return this.departmentsService.delete(Number(id));
    }
    constructor(departmentsService){
        this.departmentsService = departmentsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _swagger.ApiOperation)({
        summary: "Get all departments"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DepartmentsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)("ping"),
    (0, _swagger.ApiOperation)({
        summary: "Diagnostic route"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], DepartmentsController.prototype, "ping", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _swagger.ApiOperation)({
        summary: "Create department"
    }),
    (0, _swagger.ApiBody)({
        description: "Create a department with one representative and members",
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    example: "Sales Operations"
                },
                description: {
                    type: "string",
                    example: "Manages pipeline quality and process."
                },
                representativeId: {
                    type: "number",
                    example: 3
                },
                memberIds: {
                    type: "array",
                    items: {
                        type: "number"
                    },
                    example: [
                        3,
                        5,
                        8
                    ]
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
], DepartmentsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(":id"),
    (0, _swagger.ApiOperation)({
        summary: "Update department"
    }),
    (0, _swagger.ApiBody)({
        description: "Update department info and assignments",
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    example: "Sales Operations - EMEA"
                },
                description: {
                    type: "string",
                    example: "Updated ownership scope."
                },
                representativeId: {
                    type: "number",
                    example: 5
                },
                memberIds: {
                    type: "array",
                    items: {
                        type: "number"
                    },
                    example: [
                        5,
                        8,
                        11
                    ]
                }
            }
        }
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DepartmentsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(":id"),
    (0, _swagger.ApiOperation)({
        summary: "Delete department"
    }),
    _ts_param(0, (0, _common.Param)("id")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], DepartmentsController.prototype, "delete", null);
DepartmentsController = _ts_decorate([
    (0, _swagger.ApiTags)("Departments"),
    (0, _common.Controller)("departments"),
    (0, _common.UseGuards)((0, _passport.AuthGuard)("jwt")),
    (0, _swagger.ApiBearerAuth)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _departmentsservice.DepartmentsService === "undefined" ? Object : _departmentsservice.DepartmentsService
    ])
], DepartmentsController);

//# sourceMappingURL=departments.controller.js.map