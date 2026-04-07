"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Inventory", {
    enumerable: true,
    get: function() {
        return Inventory;
    }
});
const _typeorm = require("typeorm");
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
let Inventory = class Inventory {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], Inventory.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        name: 'variant_id'
    }),
    _ts_metadata("design:type", String)
], Inventory.prototype, "variantId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_productvariantentity.ProductVariant, (variant)=>variant.inventory, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'variant_id'
    }),
    _ts_metadata("design:type", Object)
], Inventory.prototype, "variant", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Inventory.prototype, "quantityAvailable", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Inventory.prototype, "quantityReserved", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Inventory.prototype, "reorderLevel", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Inventory.prototype, "warehouseId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Inventory.prototype, "stockStatus", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Inventory.prototype, "updatedAt", void 0);
Inventory = _ts_decorate([
    (0, _typeorm.Entity)('inventory')
], Inventory);

//# sourceMappingURL=inventory.entity.js.map