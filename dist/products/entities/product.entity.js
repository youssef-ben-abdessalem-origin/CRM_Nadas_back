"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Product", {
    enumerable: true,
    get: function() {
        return Product;
    }
});
const _typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Product = class Product {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], Product.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Product.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "sku", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'Software'
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "categoryName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'active'
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'one-time'
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "pricingModel", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 12,
        scale: 2,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "unitPrice", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 12,
        scale: 2,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "cost", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "margin", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'USD'
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "currency", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "stock", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "reorderLevel", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "unitId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 'unit'
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "unitName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 5,
        scale: 2,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "taxRate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'simple-array',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Product.prototype, "tags", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "totalSold", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 14,
        scale: 2,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Product.prototype, "totalRevenue", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Product.prototype, "created", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Product.prototype, "lastUpdated", void 0);
Product = _ts_decorate([
    (0, _typeorm.Entity)('products')
], Product);

//# sourceMappingURL=product.entity.js.map