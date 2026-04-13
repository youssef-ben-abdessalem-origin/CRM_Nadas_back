"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VendorsController", {
    enumerable: true,
    get: function() {
        return VendorsController;
    }
});
const _common = require("@nestjs/common");
const _vendorsservice = require("./vendors.service");
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
let VendorsController = class VendorsController {
    getCategories() {
        return this.vendorsService.getCategories();
    }
    createCategory(data) {
        return this.vendorsService.createCategory(data);
    }
    updateCategory(id, data) {
        return this.vendorsService.updateCategory(+id, data);
    }
    deleteCategory(id) {
        return this.vendorsService.deleteCategory(+id);
    }
    findAll(search, category) {
        return this.vendorsService.findAll(search, category);
    }
    findOne(id) {
        return this.vendorsService.findOne(id);
    }
    create(data) {
        return this.vendorsService.create(data);
    }
    update(id, data) {
        return this.vendorsService.update(id, data);
    }
    remove(id) {
        return this.vendorsService.remove(id);
    }
    constructor(vendorsService){
        this.vendorsService = vendorsService;
    }
};
_ts_decorate([
    (0, _common.Get)('categories'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], VendorsController.prototype, "getCategories", null);
_ts_decorate([
    (0, _common.Post)('categories'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], VendorsController.prototype, "createCategory", null);
_ts_decorate([
    (0, _common.Put)('categories/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], VendorsController.prototype, "updateCategory", null);
_ts_decorate([
    (0, _common.Delete)('categories/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], VendorsController.prototype, "deleteCategory", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)('search')),
    _ts_param(1, (0, _common.Query)('category')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], VendorsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], VendorsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], VendorsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], VendorsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], VendorsController.prototype, "remove", null);
VendorsController = _ts_decorate([
    (0, _common.Controller)('vendors'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _vendorsservice.VendorsService === "undefined" ? Object : _vendorsservice.VendorsService
    ])
], VendorsController);

//# sourceMappingURL=vendors.controller.js.map