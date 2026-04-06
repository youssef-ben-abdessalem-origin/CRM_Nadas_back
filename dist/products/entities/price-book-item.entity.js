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
    get PriceBookBillingPeriod () {
        return PriceBookBillingPeriod;
    },
    get PriceBookBillingType () {
        return PriceBookBillingType;
    },
    get PriceBookItem () {
        return PriceBookItem;
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
var PriceBookBillingType = /*#__PURE__*/ function(PriceBookBillingType) {
    PriceBookBillingType["ONE_TIME"] = "ONE_TIME";
    PriceBookBillingType["RECURRING"] = "RECURRING";
    return PriceBookBillingType;
}({});
var PriceBookBillingPeriod = /*#__PURE__*/ function(PriceBookBillingPeriod) {
    PriceBookBillingPeriod["NONE"] = "NONE";
    PriceBookBillingPeriod["MONTHLY"] = "MONTHLY";
    PriceBookBillingPeriod["YEARLY"] = "YEARLY";
    PriceBookBillingPeriod["WEEKLY"] = "WEEKLY";
    return PriceBookBillingPeriod;
}({});
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
    (0, _typeorm.ManyToOne)('PriceBook', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'price_book_id'
    }),
    _ts_metadata("design:type", Object)
], PriceBookItem.prototype, "priceBook", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        name: 'product_variant_id'
    }),
    _ts_metadata("design:type", String)
], PriceBookItem.prototype, "productVariantId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('ProductVariant', (variant)=>variant.prices, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'product_variant_id'
    }),
    _ts_metadata("design:type", Object)
], PriceBookItem.prototype, "productVariant", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 12,
        scale: 2
    }),
    _ts_metadata("design:type", Number)
], PriceBookItem.prototype, "price", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: PriceBookBillingType,
        default: "ONE_TIME"
    }),
    _ts_metadata("design:type", String)
], PriceBookItem.prototype, "billingType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: PriceBookBillingPeriod,
        default: "NONE"
    }),
    _ts_metadata("design:type", String)
], PriceBookItem.prototype, "billingPeriod", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], PriceBookItem.prototype, "discountAllowed", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamp',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PriceBookItem.prototype, "validFrom", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamp',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PriceBookItem.prototype, "validTo", void 0);
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