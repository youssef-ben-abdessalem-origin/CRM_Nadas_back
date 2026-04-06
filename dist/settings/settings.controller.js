"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SettingsController", {
    enumerable: true,
    get: function() {
        return SettingsController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _settingsservice = require("./settings.service");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let SettingsController = class SettingsController {
    getCurrencies() {
        return this.settingsService.getCurrencies();
    }
    createCurrency(body) {
        return this.settingsService.createCurrency(body);
    }
    updateCurrency(id, body) {
        return this.settingsService.updateCurrency(+id, body);
    }
    deleteCurrency(id) {
        return this.settingsService.deleteCurrency(+id);
    }
    getCountries() {
        return this.settingsService.getCountries();
    }
    createCountry(body) {
        return this.settingsService.createCountry(body);
    }
    updateCountry(id, body) {
        return this.settingsService.updateCountry(+id, body);
    }
    deleteCountry(id) {
        return this.settingsService.deleteCountry(+id);
    }
    getIndustries() {
        return this.settingsService.getIndustries();
    }
    createIndustry(body) {
        return this.settingsService.createIndustry(body);
    }
    updateIndustry(id, body) {
        return this.settingsService.updateIndustry(+id, body);
    }
    deleteIndustry(id) {
        return this.settingsService.deleteIndustry(+id);
    }
    getTags() {
        return this.settingsService.getTags();
    }
    createTag(body) {
        return this.settingsService.createTag(body);
    }
    updateTag(id, body) {
        return this.settingsService.updateTag(+id, body);
    }
    deleteTag(id) {
        return this.settingsService.deleteTag(+id);
    }
    getActivityTypes() {
        return this.settingsService.getActivityTypes();
    }
    createActivityType(body) {
        return this.settingsService.createActivityType(body);
    }
    updateActivityType(id, body) {
        return this.settingsService.updateActivityType(+id, body);
    }
    deleteActivityType(id) {
        return this.settingsService.deleteActivityType(+id);
    }
    getEmailTemplates() {
        return this.settingsService.getEmailTemplates();
    }
    createEmailTemplate(body) {
        return this.settingsService.createEmailTemplate(body);
    }
    updateEmailTemplate(id, body) {
        return this.settingsService.updateEmailTemplate(+id, body);
    }
    deleteEmailTemplate(id) {
        return this.settingsService.deleteEmailTemplate(+id);
    }
    getNotifications(userId) {
        return this.settingsService.getNotifications(userId ? +userId : undefined);
    }
    getUnreadNotificationCount(userId) {
        return this.settingsService.getUnreadNotificationCount(+userId);
    }
    createNotification(body) {
        return this.settingsService.createNotification(body);
    }
    markNotificationAsRead(id) {
        return this.settingsService.markNotificationAsRead(+id);
    }
    markAllNotificationsAsRead(userId) {
        return this.settingsService.markAllNotificationsAsRead(+userId);
    }
    deleteNotification(id) {
        return this.settingsService.deleteNotification(+id);
    }
    getAuditLogs(entityType, entityId) {
        return this.settingsService.getAuditLogs(entityType, entityId ? +entityId : undefined);
    }
    createAuditLog(body) {
        return this.settingsService.createAuditLog(body);
    }
    constructor(settingsService){
        this.settingsService = settingsService;
    }
};
_ts_decorate([
    (0, _common.Get)('currencies'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all currencies'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "getCurrencies", null);
_ts_decorate([
    (0, _common.Post)('currencies'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create currency'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "createCurrency", null);
_ts_decorate([
    (0, _common.Put)('currencies/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update currency'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "updateCurrency", null);
_ts_decorate([
    (0, _common.Delete)('currencies/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete currency'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "deleteCurrency", null);
_ts_decorate([
    (0, _common.Get)('countries'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all countries'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "getCountries", null);
_ts_decorate([
    (0, _common.Post)('countries'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create country'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "createCountry", null);
_ts_decorate([
    (0, _common.Put)('countries/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update country'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "updateCountry", null);
_ts_decorate([
    (0, _common.Delete)('countries/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete country'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "deleteCountry", null);
_ts_decorate([
    (0, _common.Get)('industries'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all industries'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "getIndustries", null);
_ts_decorate([
    (0, _common.Post)('industries'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create industry'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "createIndustry", null);
_ts_decorate([
    (0, _common.Put)('industries/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update industry'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "updateIndustry", null);
_ts_decorate([
    (0, _common.Delete)('industries/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete industry'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "deleteIndustry", null);
_ts_decorate([
    (0, _common.Get)('tags'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all tags'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "getTags", null);
_ts_decorate([
    (0, _common.Post)('tags'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create tag'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "createTag", null);
_ts_decorate([
    (0, _common.Put)('tags/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update tag'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "updateTag", null);
_ts_decorate([
    (0, _common.Delete)('tags/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete tag'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "deleteTag", null);
_ts_decorate([
    (0, _common.Get)('activity-types'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all activity types'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "getActivityTypes", null);
_ts_decorate([
    (0, _common.Post)('activity-types'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create activity type'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "createActivityType", null);
_ts_decorate([
    (0, _common.Put)('activity-types/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update activity type'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "updateActivityType", null);
_ts_decorate([
    (0, _common.Delete)('activity-types/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete activity type'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "deleteActivityType", null);
_ts_decorate([
    (0, _common.Get)('email-templates'),
    (0, _swagger.ApiOperation)({
        summary: 'Get all email templates'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "getEmailTemplates", null);
_ts_decorate([
    (0, _common.Post)('email-templates'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create email template'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "createEmailTemplate", null);
_ts_decorate([
    (0, _common.Put)('email-templates/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update email template'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "updateEmailTemplate", null);
_ts_decorate([
    (0, _common.Delete)('email-templates/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete email template'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "deleteEmailTemplate", null);
_ts_decorate([
    (0, _common.Get)('notifications'),
    (0, _swagger.ApiOperation)({
        summary: 'Get notifications'
    }),
    _ts_param(0, (0, _common.Query)('userId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "getNotifications", null);
_ts_decorate([
    (0, _common.Get)('notifications/unread-count'),
    (0, _swagger.ApiOperation)({
        summary: 'Get unread notification count'
    }),
    _ts_param(0, (0, _common.Query)('userId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "getUnreadNotificationCount", null);
_ts_decorate([
    (0, _common.Post)('notifications'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create notification'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "createNotification", null);
_ts_decorate([
    (0, _common.Put)('notifications/:id/read'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Mark notification as read'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "markNotificationAsRead", null);
_ts_decorate([
    (0, _common.Put)('notifications/read-all'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Mark all notifications as read'
    }),
    _ts_param(0, (0, _common.Query)('userId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "markAllNotificationsAsRead", null);
_ts_decorate([
    (0, _common.Delete)('notifications/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete notification'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "deleteNotification", null);
_ts_decorate([
    (0, _common.Get)('audit-logs'),
    (0, _swagger.ApiOperation)({
        summary: 'Get audit logs'
    }),
    _ts_param(0, (0, _common.Query)('entityType')),
    _ts_param(1, (0, _common.Query)('entityId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "getAuditLogs", null);
_ts_decorate([
    (0, _common.Post)('audit-logs'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create audit log'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], SettingsController.prototype, "createAuditLog", null);
SettingsController = _ts_decorate([
    (0, _swagger.ApiTags)('Settings'),
    (0, _common.Controller)('settings'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _settingsservice.SettingsService === "undefined" ? Object : _settingsservice.SettingsService
    ])
], SettingsController);

//# sourceMappingURL=settings.controller.js.map