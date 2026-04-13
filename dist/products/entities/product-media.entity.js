"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProductMedia", {
    enumerable: true,
    get: function() {
        return ProductMedia;
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
let ProductMedia = class ProductMedia {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ProductMedia.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        name: 'product_id'
    }),
    _ts_metadata("design:type", String)
], ProductMedia.prototype, "productId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('Product', 'media', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'product_id'
    }),
    _ts_metadata("design:type", Object)
], ProductMedia.prototype, "product", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], ProductMedia.prototype, "url", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ProductMedia.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], ProductMedia.prototype, "isPrimary", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProductMedia.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProductMedia.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ProductMedia.prototype, "deletedAt", void 0);
ProductMedia = _ts_decorate([
    (0, _typeorm.Entity)('product_media')
], ProductMedia);

//# sourceMappingURL=product-media.entity.js.map