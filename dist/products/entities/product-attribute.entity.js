"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProductAttribute", {
    enumerable: true,
    get: function() {
        return ProductAttribute;
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
let ProductAttribute = class ProductAttribute {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ProductAttribute.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        name: 'product_id'
    }),
    _ts_metadata("design:type", String)
], ProductAttribute.prototype, "productId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('Product', 'attributes', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'product_id'
    }),
    _ts_metadata("design:type", Object)
], ProductAttribute.prototype, "product", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 100
    }),
    _ts_metadata("design:type", String)
], ProductAttribute.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ProductAttribute.prototype, "value", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProductAttribute.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProductAttribute.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProductAttribute.prototype, "deletedAt", void 0);
ProductAttribute = _ts_decorate([
    (0, _typeorm.Entity)('product_attributes')
], ProductAttribute);

//# sourceMappingURL=product-attribute.entity.js.map