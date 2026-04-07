"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProductsService", {
    enumerable: true,
    get: function() {
        return ProductsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
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
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ProductsService = class ProductsService {
    async onModuleInit() {
        await this.seedDefaultData();
    }
    async seedDefaultData() {
        // Seed PriceBook if none
        const priceBookCount = await this.priceBookRepository.count();
        if (priceBookCount === 0) {
            await this.priceBookRepository.save({
                name: 'Standard Price Book',
                currency: 'USD',
                isDefault: true
            });
        }
        const categoryCount = await this.categoryRepository.count();
        if (categoryCount === 0) {
            const defaultCategories = [
                'Software',
                'Hardware',
                'Service',
                'Subscription',
                'Support',
                'Training',
                'Other'
            ];
            for (const name of defaultCategories){
                await this.categoryRepository.save({
                    name
                });
            }
        }
        // Seed Brands
        const brandCount = await this.brandRepository.count();
        if (brandCount === 0) {
            const defaultBrands = [
                'Nexus',
                'CloudFlow',
                'SafeGuard'
            ];
            for (const name of defaultBrands){
                await this.brandRepository.save({
                    name
                });
            }
        }
        // Seed Units
        const unitCount = await this.unitRepository.count();
        if (unitCount === 0) {
            const defaultUnits = [
                'Unidad',
                'Caja',
                'Litro',
                'Kilogramo',
                'Mes',
                'Hora'
            ];
            for (const name of defaultUnits){
                await this.unitRepository.save({
                    name
                });
            }
        }
        // Seed Pricing Models
        const modelCount = await this.pricingModelRepository.count();
        if (modelCount === 0) {
            const defaultModels = [
                'One-Time',
                'Recurring',
                'Usage-Based',
                'Tiered'
            ];
            for (const name of defaultModels){
                await this.pricingModelRepository.save({
                    name
                });
            }
        }
    }
    // Brand Management
    async getBrands() {
        return this.brandRepository.find({
            order: {
                name: 'ASC'
            }
        });
    }
    // PriceBook Management
    async getPriceBooks() {
        return this.priceBookRepository.find({
            order: {
                name: 'ASC'
            }
        });
    }
    async createPriceBook(data) {
        const pb = this.priceBookRepository.create(data);
        return this.priceBookRepository.save(pb);
    }
    async updatePriceBook(id, data) {
        await this.priceBookRepository.update(id, data);
        return this.priceBookRepository.findOne({
            where: {
                id
            }
        });
    }
    async deletePriceBook(id) {
        await this.priceBookRepository.delete(id);
    }
    // Unit management
    async getUnits() {
        return this.unitRepository.find({
            order: {
                name: 'ASC'
            }
        });
    }
    async createUnit(name) {
        const unit = this.unitRepository.create({
            name
        });
        return this.unitRepository.save(unit);
    }
    async updateUnit(id, data) {
        await this.unitRepository.update(id, data);
        return this.unitRepository.findOne({
            where: {
                id
            }
        });
    }
    async deleteUnit(id) {
        await this.unitRepository.delete(id);
    }
    // Pricing Model management
    async getPricingModels() {
        return this.pricingModelRepository.find({
            order: {
                name: 'ASC'
            }
        });
    }
    async createPricingModel(name) {
        const model = this.pricingModelRepository.create({
            name
        });
        return this.pricingModelRepository.save(model);
    }
    async updatePricingModel(id, data) {
        await this.pricingModelRepository.update(id, data);
        return this.pricingModelRepository.findOne({
            where: {
                id
            }
        });
    }
    async deletePricingModel(id) {
        await this.pricingModelRepository.delete(id);
    }
    // Category CRUD
    async getCategories() {
        return this.categoryRepository.find({
            where: {
                isActive: true
            },
            order: {
                name: 'ASC'
            }
        });
    }
    async createCategory(name, parentId) {
        const category = this.categoryRepository.create({
            name,
            parentId
        });
        return this.categoryRepository.save(category);
    }
    async updateCategory(id, data) {
        await this.categoryRepository.update(id, data);
        return this.categoryRepository.findOne({
            where: {
                id
            }
        });
    }
    async deleteCategory(id) {
        await this.categoryRepository.delete(id);
    }
    // Product CRUD
    async findAll() {
        return this.productRepository.find({
            relations: [
                'category',
                'brand',
                'variants',
                'media',
                'attributes'
            ]
        });
    }
    async setPrimaryPrice(variantId, priceId) {
        // Note: defaultPriceId removed from variant entity in new schema as per schema description, 
        // it says "price" and "cost" are now on the variant directly.
        // If we want to keep price books, we can still use them.
        return this.variantRepository.findOne({
            where: {
                id: variantId
            },
            relations: [
                'prices',
                'prices.priceBook'
            ]
        });
    }
    async findAllPaginated(page = 1, limit = 5, search, categoryId) {
        const queryBuilder = this.productRepository.createQueryBuilder('product').leftJoinAndSelect('product.category', 'category').leftJoinAndSelect('product.brand', 'brand').leftJoinAndSelect('product.variants', 'variants').leftJoinAndSelect('variants.prices', 'prices').leftJoinAndSelect('prices.priceBook', 'priceBook').leftJoinAndSelect('product.media', 'media').leftJoinAndSelect('product.attributes', 'attributes').leftJoinAndSelect('variants.inventory', 'inventory');
        if (search) {
            queryBuilder.andWhere('(product.name ILIKE :search OR product.slug ILIKE :search OR product.description ILIKE :search)', {
                search: `%${search}%`
            });
        }
        if (categoryId) {
            queryBuilder.andWhere('product.categoryId = :categoryId', {
                categoryId
            });
        }
        const [data, total] = await Promise.all([
            queryBuilder.orderBy('product.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    // Variant Management
    async createVariant(data) {
        const variant = this.variantRepository.create(data);
        return this.variantRepository.save(variant);
    }
    async updateVariant(id, data) {
        await this.variantRepository.update(id, data);
        return this.variantRepository.findOne({
            where: {
                id
            }
        });
    }
    async deleteVariant(id) {
        await this.variantRepository.delete(id);
    }
    // Price Book Item (Pricing) management
    async upsertPrice(variantId, priceBookId, price) {
        let priceItem = await this.priceBookItemRepository.findOne({
            where: {
                variantId: variantId,
                priceBookId: priceBookId
            }
        });
        if (priceItem) {
            priceItem.price = price;
        } else {
            priceItem = this.priceBookItemRepository.create({
                variantId: variantId,
                priceBookId: priceBookId,
                price: price
            });
        }
        return this.priceBookItemRepository.save(priceItem);
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: {
                id
            },
            relations: [
                'category',
                'brand',
                'variants',
                'variants.prices',
                'variants.prices.priceBook',
                'media',
                'attributes',
                'variants.inventory'
            ]
        });
        if (!product) throw new _common.NotFoundException('Product not found');
        return product;
    }
    async create(data) {
        const { variants, media, attributes, ...rest } = data;
        const productInstance = this.productRepository.create(rest);
        const savedProduct = await this.productRepository.save(productInstance);
        if (variants && Array.isArray(variants)) {
            for (const vData of variants){
                const { inventory, prices, ...vRest } = vData;
                const variantInstance = this.variantRepository.create({
                    ...vRest,
                    productId: savedProduct.id
                });
                const savedVariant = await this.variantRepository.save(variantInstance);
                if (inventory && Array.isArray(inventory)) {
                    for (const iData of inventory){
                        await this.inventoryRepository.save({
                            ...iData,
                            variantId: savedVariant.id
                        });
                    }
                }
                if (prices && Array.isArray(prices)) {
                    for (const pData of prices){
                        await this.priceBookItemRepository.save({
                            ...pData,
                            variantId: savedVariant.id
                        });
                    }
                }
            }
        } else {
            // Create a default variant if none provided
            const defaultVariant = this.variantRepository.create({
                productId: savedProduct.id,
                name: 'Default',
                sku: `${savedProduct.slug || savedProduct.id}-DEF`,
                status: _productvariantentity.VariantStatus.ACTIVE,
                isDefault: true
            });
            await this.variantRepository.save(defaultVariant);
        }
        if (media && Array.isArray(media)) {
            for (const mData of media){
                await this.mediaRepository.save({
                    ...mData,
                    productId: savedProduct.id
                });
            }
        }
        if (attributes && Array.isArray(attributes)) {
            for (const aData of attributes){
                await this.attributeRepository.save({
                    ...aData,
                    productId: savedProduct.id
                });
            }
        }
        return this.findOne(savedProduct.id);
    }
    async update(id, data) {
        const product = await this.findOne(id);
        Object.assign(product, data);
        return this.productRepository.save(product);
    }
    async delete(id) {
        const product = await this.findOne(id);
        await this.productRepository.softRemove(product);
    }
    constructor(productRepository, categoryRepository, unitRepository, pricingModelRepository, variantRepository, priceBookRepository, priceBookItemRepository, brandRepository, inventoryRepository, mediaRepository, attributeRepository){
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.unitRepository = unitRepository;
        this.pricingModelRepository = pricingModelRepository;
        this.variantRepository = variantRepository;
        this.priceBookRepository = priceBookRepository;
        this.priceBookItemRepository = priceBookItemRepository;
        this.brandRepository = brandRepository;
        this.inventoryRepository = inventoryRepository;
        this.mediaRepository = mediaRepository;
        this.attributeRepository = attributeRepository;
    }
};
ProductsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_productentity.Product)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_productcategoryentity.ProductCategory)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_productunitentity.ProductUnit)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_productpricingmodelentity.ProductPricingModel)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_productvariantentity.ProductVariant)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_pricebookentity.PriceBook)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_pricebookitementity.PriceBookItem)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_brandentity.Brand)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_inventoryentity.Inventory)),
    _ts_param(9, (0, _typeorm.InjectRepository)(_productmediaentity.ProductMedia)),
    _ts_param(10, (0, _typeorm.InjectRepository)(_productattributeentity.ProductAttribute)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ProductsService);

//# sourceMappingURL=products.service.js.map