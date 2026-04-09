"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForecastController", {
    enumerable: true,
    get: function() {
        return ForecastController;
    }
});
const _common = require("@nestjs/common");
const _forecastservice = require("./forecast.service");
const _forecaststagemappingentity = require("./entities/forecast-stage-mapping.entity");
const _jwtauthguard = require("../auth/jwt-auth.guard");
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
let ForecastController = class ForecastController {
    getDashboard(periodId, userId) {
        return this.forecastService.getDashboard(periodId, userId);
    }
    getMyForecast(req, periodId) {
        return this.forecastService.getMyForecast(req.user.id, periodId);
    }
    setAdjustment(data, req) {
        return this.forecastService.setAdjustment(data.userId, data.periodId, {
            ...data,
            createdById: req.user.id
        });
    }
    getContributions(userId, periodId, category) {
        return this.forecastService.getContributions(userId, periodId, category);
    }
    // Management Endpoints
    getPeriods() {
        return this.forecastService.getPeriods();
    }
    createPeriod(data) {
        return this.forecastService.createPeriod(data);
    }
    updatePeriod(id, data) {
        return this.forecastService.updatePeriod(Number(id), data);
    }
    getTargets(periodId) {
        return this.forecastService.getTargets(periodId);
    }
    setTarget(data, req) {
        return this.forecastService.setTarget({
            ...data,
            assignedById: req.user.id
        });
    }
    getMappings() {
        return this.forecastService.getMappings();
    }
    updateMapping(id, data) {
        return this.forecastService.updateMapping(Number(id), data.category);
    }
    constructor(forecastService){
        this.forecastService = forecastService;
    }
};
_ts_decorate([
    (0, _common.Get)('dashboard'),
    _ts_param(0, (0, _common.Query)('periodId')),
    _ts_param(1, (0, _common.Query)('userId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "getDashboard", null);
_ts_decorate([
    (0, _common.Get)('my'),
    _ts_param(0, (0, _common.Request)()),
    _ts_param(1, (0, _common.Query)('periodId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0,
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "getMyForecast", null);
_ts_decorate([
    (0, _common.Post)('adjust'),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "setAdjustment", null);
_ts_decorate([
    (0, _common.Get)('contributions'),
    _ts_param(0, (0, _common.Query)('userId')),
    _ts_param(1, (0, _common.Query)('periodId')),
    _ts_param(2, (0, _common.Query)('category')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        typeof _forecaststagemappingentity.ForecastCategory === "undefined" ? Object : _forecaststagemappingentity.ForecastCategory
    ]),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "getContributions", null);
_ts_decorate([
    (0, _common.Get)('periods'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "getPeriods", null);
_ts_decorate([
    (0, _common.Post)('periods'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "createPeriod", null);
_ts_decorate([
    (0, _common.Put)('periods/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "updatePeriod", null);
_ts_decorate([
    (0, _common.Get)('targets'),
    _ts_param(0, (0, _common.Query)('periodId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "getTargets", null);
_ts_decorate([
    (0, _common.Post)('targets'),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "setTarget", null);
_ts_decorate([
    (0, _common.Get)('mappings'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "getMappings", null);
_ts_decorate([
    (0, _common.Put)('mappings/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ForecastController.prototype, "updateMapping", null);
ForecastController = _ts_decorate([
    (0, _common.Controller)('forecast'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _forecastservice.ForecastService === "undefined" ? Object : _forecastservice.ForecastService
    ])
], ForecastController);

//# sourceMappingURL=forecast.controller.js.map