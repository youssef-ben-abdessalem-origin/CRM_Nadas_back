"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get Product () {
        return Product;
    },
    get ProductStatus () {
        return ProductStatus;
    },
    get ProductType () {
        return ProductType;
    }
});
const _typeorm = require("typeorm");
const _productcategoryentity = require("./product-category.entity");
const _brandentity = require("./brand.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var ProductType = /*#__PURE__*/ function(ProductType) {
    ProductType["SERVICE"] = "service";
    ProductType["PHYSICAL"] = "physical";
    ProductType["DIGITAL"] = "digital";
    return ProductType;
}({});
var ProductStatus = /*#__PURE__*/ function(ProductStatus) {
    ProductStatus["DRAFT"] = "draft";
    ProductStatus["ACTIVE"] = "active";
    ProductStatus["ARCHIVED"] = "archived";
    return ProductStatus;
}({});
let Product = class Product {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], Product.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Product.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true,
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "slug", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        default: 'physical'
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Product.prototype, "categoryId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_productcategoryentity.ProductCategory, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'categoryId'
    }),
    _ts_metadata("design:type", Object)
], Product.prototype, "category", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Product.prototype, "brandId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_brandentity.Brand, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'brandId'
    }),
    _ts_metadata("design:type", Object)
], Product.prototype, "brand", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        default: "draft"
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], Product.prototype, "isSellable", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], Product.prototype, "isPurchasable", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "billingType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "billingCycle", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "trialPeriodDays", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "setupFee", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "unitOfMeasure", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)('ProductVariant', 'product', {
        cascade: true
    }),
    _ts_metadata("design:type", Array)
], Product.prototype, "variants", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)('ProductMedia', 'product', {
        cascade: true
    }),
    _ts_metadata("design:type", Array)
], Product.prototype, "media", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)('ProductAttribute', 'product', {
        cascade: true
    }),
    _ts_metadata("design:type", Array)
], Product.prototype, "attributes", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Product.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Product.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Product.prototype, "deletedAt", void 0);
Product = _ts_decorate([
    (0, _typeorm.Entity)('products')
], Product);

//# sourceMappingURL=product.entity.js.map