"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProductsModule", {
    enumerable: true,
    get: function() {
        return ProductsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _productsservice = require("./products.service");
const _productscontroller = require("./products.controller");
const _productentity = require("./entities/product.entity");
const _productcategoryentity = require("./entities/product-category.entity");
const _productunitentity = require("./entities/product-unit.entity");
const _productpricingmodelentity = require("./entities/product-pricing-model.entity");
const _productvariantentity = require("./entities/product-variant.entity");
const _pricebookentity = require("./entities/price-book.entity");
const _pricebookitementity = require("./entities/price-book-item.entity");
const _brandentity = require("./entities/brand.entity");
const _inventoryentity = require("./entities/inventory.entity");
const _productmediaentity = require("./entities/product-media.entity");
const _productattributeentity = require("./entities/product-attribute.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ProductsModule = class ProductsModule {
};
ProductsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _productentity.Product,
                _productcategoryentity.ProductCategory,
                _productunitentity.ProductUnit,
                _productpricingmodelentity.ProductPricingModel,
                _productvariantentity.ProductVariant,
                _pricebookentity.PriceBook,
                _pricebookitementity.PriceBookItem,
                _brandentity.Brand,
                _inventoryentity.Inventory,
                _productmediaentity.ProductMedia,
                _productattributeentity.ProductAttribute
            ])
        ],
        providers: [
            _productsservice.ProductsService
        ],
        controllers: [
            _productscontroller.ProductsController
        ],
        exports: [
            _productsservice.ProductsService
        ]
    })
], ProductsModule);

//# sourceMappingURL=products.module.js.map