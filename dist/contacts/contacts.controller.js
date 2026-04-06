"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ContactsController", {
    enumerable: true,
    get: function() {
        return ContactsController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _contactsservice = require("./contacts.service");
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
const createContactExample = {
    name: "John Doe",
    email: "john.doe@acme.com",
    phone: "+1 555-123-4567",
    company: "Acme Corp",
    title: "CEO",
    accountId: 1,
    contactStatusId: 1,
    contactTierId: 1,
    location: "San Francisco, CA",
    industry: "Technology",
    website: "https://acme.com",
    notes: "Key decision maker",
    dealValue: 50000
};
let ContactsController = class ContactsController {
    findAll() {
        return this.contactsService.findAll();
    }
    getStatuses() {
        return this.contactsService.getStatuses();
    }
    createStatus(body) {
        return this.contactsService.createStatus(body.name, body.color);
    }
    updateStatus(id, body) {
        return this.contactsService.updateStatus(+id, body);
    }
    deleteStatus(id) {
        return this.contactsService.deleteStatus(+id);
    }
    getTiers() {
        return this.contactsService.getTiers();
    }
    createTier(body) {
        return this.contactsService.createTier(body.name, body.color);
    }
    updateTier(id, body) {
        return this.contactsService.updateTier(+id, body);
    }
    deleteTier(id) {
        return this.contactsService.deleteTier(+id);
    }
    findOne(id) {
        return this.contactsService.findOne(+id);
    }
    create(data) {
        return this.contactsService.create(data);
    }
    update(id, data) {
        return this.contactsService.update(+id, data);
    }
    delete(id) {
        return this.contactsService.delete(+id);
    }
    constructor(contactsService){
        this.contactsService = contactsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('statuses'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all contact statuses'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "getStatuses", null);
_ts_decorate([
    (0, _common.Post)('statuses'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create contact status'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "createStatus", null);
_ts_decorate([
    (0, _common.Put)('statuses/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update contact status'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "updateStatus", null);
_ts_decorate([
    (0, _common.Delete)('statuses/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete contact status'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "deleteStatus", null);
_ts_decorate([
    (0, _common.Get)('tiers'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all contact tiers'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "getTiers", null);
_ts_decorate([
    (0, _common.Post)('tiers'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create contact tier'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "createTier", null);
_ts_decorate([
    (0, _common.Put)('tiers/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update contact tier'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "updateTier", null);
_ts_decorate([
    (0, _common.Delete)('tiers/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete contact tier'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "deleteTier", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiBody)({
        type: Object,
        description: 'Contact data',
        examples: {
            example: {
                value: createContactExample
            }
        }
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ContactsController.prototype, "delete", null);
ContactsController = _ts_decorate([
    (0, _swagger.ApiTags)('Contacts'),
    (0, _common.Controller)('contacts'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _contactsservice.ContactsService === "undefined" ? Object : _contactsservice.ContactsService
    ])
], ContactsController);

//# sourceMappingURL=contacts.controller.js.map