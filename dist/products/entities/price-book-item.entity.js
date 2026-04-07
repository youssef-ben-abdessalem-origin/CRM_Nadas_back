"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PriceBookItem", {
    enumerable: true,
    get: function() {
        return PriceBookItem;
    }
});
const _typeorm = require("typeorm");
const _pricebookentity = require("./price-book.entity");
const _productvariantentity = require("./product-variant.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PriceBookItem = class PriceBookItem {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], PriceBookItem.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        name: 'price_book_id'
    }),
    _ts_metadata("design:type", String)
], PriceBookItem.prototype, "priceBookId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_pricebookentity.PriceBook, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'price_book_id'
    }),
    _ts_metadata("design:type", typeof _pricebookentity.PriceBook === "undefined" ? Object : _pricebookentity.PriceBook)
], PriceBookItem.prototype, "priceBook", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        name: 'variant_id'
    }),
    _ts_metadata("design:type", String)
], PriceBookItem.prototype, "variantId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_productvariantentity.ProductVariant, (variant)=>variant.prices, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'variant_id'
    }),
    _ts_metadata("design:type", Object)
], PriceBookItem.prototype, "productVariant", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'numeric',
        precision: 12,
        scale: 2
    }),
    _ts_metadata("design:type", Number)
], PriceBookItem.prototype, "price", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'numeric',
        precision: 5,
        scale: 2,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], PriceBookItem.prototype, "discount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 1
    }),
    _ts_metadata("design:type", Number)
], PriceBookItem.prototype, "minQty", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PriceBookItem.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PriceBookItem.prototype, "updatedAt", void 0);
PriceBookItem = _ts_decorate([
    (0, _typeorm.Entity)('price_book_items')
], PriceBookItem);

//# sourceMappingURL=price-book-item.entity.js.map