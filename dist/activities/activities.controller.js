"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActivitiesController", {
    enumerable: true,
    get: function() {
        return ActivitiesController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _passport = require("@nestjs/passport");
const _activitiesservice = require("./activities.service");
const _activityentity = require("./entities/activity.entity");
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
let ActivitiesController = class ActivitiesController {
    getTypes() {
        return this.activitiesService.getAllTypes();
    }
    findAll() {
        return this.activitiesService.findAll();
    }
    findByEntity(entityType, entityId) {
        return this.activitiesService.findByEntity(entityType, parseInt(entityId));
    }
    create(data) {
        return this.activitiesService.create({
            ...data,
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined
        });
    }
    update(id, data) {
        return this.activitiesService.update(+id, data);
    }
    complete(id) {
        return this.activitiesService.complete(+id);
    }
    reassign(id, assignedToId) {
        return this.activitiesService.reassign(+id, assignedToId);
    }
    delete(id) {
        return this.activitiesService.delete(+id);
    }
    constructor(activitiesService){
        this.activitiesService = activitiesService;
    }
};
_ts_decorate([
    (0, _common.Get)('types'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all activity types'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ActivitiesController.prototype, "getTypes", null);
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all activities'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ActivitiesController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('entity'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get activities by entity'
    }),
    (0, _swagger.ApiQuery)({
        name: 'entityType',
        enum: _activityentity.ActivityEntityType
    }),
    (0, _swagger.ApiQuery)({
        name: 'entityId',
        type: Number
    }),
    _ts_param(0, (0, _common.Query)('entityType')),
    _ts_param(1, (0, _common.Query)('entityId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _activityentity.ActivityEntityType === "undefined" ? Object : _activityentity.ActivityEntityType,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ActivitiesController.prototype, "findByEntity", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create activity'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ActivitiesController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update activity'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ActivitiesController.prototype, "update", null);
_ts_decorate([
    (0, _common.Put)(':id/complete'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Complete activity'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ActivitiesController.prototype, "complete", null);
_ts_decorate([
    (0, _common.Put)(':id/reassign'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Reassign activity to another user'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)('assignedToId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], ActivitiesController.prototype, "reassign", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete activity'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ActivitiesController.prototype, "delete", null);
ActivitiesController = _ts_decorate([
    (0, _swagger.ApiTags)('Activities'),
    (0, _common.Controller)('activities'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _activitiesservice.ActivitiesService === "undefined" ? Object : _activitiesservice.ActivitiesService
    ])
], ActivitiesController);

//# sourceMappingURL=activities.controller.js.map