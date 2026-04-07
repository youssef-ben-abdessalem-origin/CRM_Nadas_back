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
    get ProductVariant () {
        return ProductVariant;
    },
    get VariantStatus () {
        return VariantStatus;
    }
});
const _typeorm = require("typeorm");
const _productentity = require("./product.entity");
const _pricebookitementity = require("./price-book-item.entity");
const _inventoryentity = require("./inventory.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var VariantStatus = /*#__PURE__*/ function(VariantStatus) {
    VariantStatus["ACTIVE"] = "active";
    VariantStatus["INACTIVE"] = "inactive";
    return VariantStatus;
}({});
let ProductVariant = class ProductVariant {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ProductVariant.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        name: 'product_id'
    }),
    _ts_metadata("design:type", String)
], ProductVariant.prototype, "productId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_productentity.Product, (product)=>product.variants, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'product_id'
    }),
    _ts_metadata("design:type", typeof _productentity.Product === "undefined" ? Object : _productentity.Product)
], ProductVariant.prototype, "product", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_pricebookitementity.PriceBookItem, (price)=>price.productVariant),
    _ts_metadata("design:type", Array)
], ProductVariant.prototype, "prices", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_inventoryentity.Inventory, (inventory)=>inventory.variant),
    _ts_metadata("design:type", Array)
], ProductVariant.prototype, "inventory", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ProductVariant.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], ProductVariant.prototype, "sku", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ProductVariant.prototype, "price", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ProductVariant.prototype, "cost", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ProductVariant.prototype, "attributes", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], ProductVariant.prototype, "isDefault", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        default: "active"
    }),
    _ts_metadata("design:type", String)
], ProductVariant.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProductVariant.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProductVariant.prototype, "updatedAt", void 0);
ProductVariant = _ts_decorate([
    (0, _typeorm.Entity)('product_variants')
], ProductVariant);

//# sourceMappingURL=product-variant.entity.js.map