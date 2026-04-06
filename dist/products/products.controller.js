"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProductsController", {
    enumerable: true,
    get: function() {
        return ProductsController;
    }
});
const _common = require("@nestjs/common");
const _express = require("express");
const _productsservice = require("./products.service");
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
let ProductsController = class ProductsController {
    findAll() {
        return this.productsService.findAll();
    }
    findAllPaginated(page, limit, search, categoryId) {
        return this.productsService.findAllPaginated(page ? parseInt(page) : 1, limit ? parseInt(limit) : 5, search, categoryId ? parseInt(categoryId) : undefined);
    }
    // Categories
    getCategories() {
        return this.productsService.getCategories();
    }
    createCategory(name) {
        return this.productsService.createCategory(name);
    }
    updateCategory(id, data) {
        return this.productsService.updateCategory(Number.parseInt(id), data);
    }
    deleteCategory(id) {
        return this.productsService.deleteCategory(Number.parseInt(id));
    }
    // Units
    getUnits() {
        return this.productsService.getUnits();
    }
    createUnit(name) {
        return this.productsService.createUnit(name);
    }
    updateUnit(id, data) {
        return this.productsService.updateUnit(Number.parseInt(id), data);
    }
    deleteUnit(id) {
        return this.productsService.deleteUnit(Number.parseInt(id));
    }
    // Pricing Models
    getPricingModels() {
        return this.productsService.getPricingModels();
    }
    createPricingModel(name) {
        return this.productsService.createPricingModel(name);
    }
    updatePricingModel(id, data) {
        return this.productsService.updatePricingModel(Number.parseInt(id), data);
    }
    deletePricingModel(id) {
        return this.productsService.deletePricingModel(Number.parseInt(id));
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    create(data) {
        return this.productsService.create(data);
    }
    update(id, data, req) {
        const user = req.user;
        if (data.status !== undefined) {
            // Only ADMIN or MANAGER can set status
            if (!user || !user.role || user.role === 'USER') {
                throw new _common.ForbiddenException('Not allowed to change product status');
            }
        }
        return this.productsService.update(id, data);
    }
    delete(id) {
        return this.productsService.delete(id);
    }
    constructor(productsService){
        this.productsService = productsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ProductsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('paginated'),
    _ts_param(0, (0, _common.Query)('page')),
    _ts_param(1, (0, _common.Query)('limit')),
    _ts_param(2, (0, _common.Query)('search')),
    _ts_param(3, (0, _common.Query)('categoryId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "findAllPaginated", null);
_ts_decorate([
    (0, _common.Get)('categories'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "getCategories", null);
_ts_decorate([
    (0, _common.Post)('categories'),
    _ts_param(0, (0, _common.Body)('name')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "createCategory", null);
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
], ProductsController.prototype, "updateCategory", null);
_ts_decorate([
    (0, _common.Delete)('categories/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteCategory", null);
_ts_decorate([
    (0, _common.Get)('units'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "getUnits", null);
_ts_decorate([
    (0, _common.Post)('units'),
    _ts_param(0, (0, _common.Body)('name')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "createUnit", null);
_ts_decorate([
    (0, _common.Put)('units/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "updateUnit", null);
_ts_decorate([
    (0, _common.Delete)('units/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteUnit", null);
_ts_decorate([
    (0, _common.Get)('pricing-models'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "getPricingModels", null);
_ts_decorate([
    (0, _common.Post)('pricing-models'),
    _ts_param(0, (0, _common.Body)('name')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "createPricingModel", null);
_ts_decorate([
    Reflect.metadata('design:type', Function),
    (0, _common.Put)('pricing-models/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "updatePricingModel", null);
_ts_decorate([
    (0, _common.Delete)('pricing-models/:id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ProductsController.prototype, "deletePricingModel", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ProductsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ProductsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof Partial === "undefined" ? Object : Partial,
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ProductsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ProductsController.prototype, "delete", null);
ProductsController = _ts_decorate([
    (0, _common.Controller)('products'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _productsservice.ProductsService === "undefined" ? Object : _productsservice.ProductsService
    ])
], ProductsController);

//# sourceMappingURL=products.controller.js.map