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
        const unitCount = await this.unitRepository.count();
        if (unitCount === 0) {
            const defaultUnits = [
                'unit',
                'license',
                'hour',
                'day',
                'month',
                'year',
                'user',
                'project'
            ];
            for (const name of defaultUnits){
                await this.unitRepository.save({
                    name
                });
            }
        }
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
    async createCategory(name) {
        const category = this.categoryRepository.create({
            name
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
    // Unit CRUD
    async getUnits() {
        return this.unitRepository.find({
            where: {
                isActive: true
            },
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
    async findAll() {
        return this.productRepository.find();
    }
    async findAllPaginated(page = 1, limit = 5, search, categoryId) {
        const queryBuilder = this.productRepository.createQueryBuilder('product');
        if (search) {
            queryBuilder.andWhere('(product.name ILIKE :search OR product.sku ILIKE :search OR product.description ILIKE :search)', {
                search: `%${search}%`
            });
        }
        if (categoryId) {
            queryBuilder.andWhere('product.categoryId = :categoryId', {
                categoryId
            });
        }
        const [data, total] = await Promise.all([
            queryBuilder.orderBy('product.id', 'DESC').skip((page - 1) * limit).take(limit).getMany(),
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
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: {
                id
            }
        });
        if (!product) throw new _common.NotFoundException('Product not found');
        return product;
    }
    async create(data) {
        const product = this.productRepository.create(data);
        return this.productRepository.save(product);
    }
    async update(id, data) {
        const product = await this.findOne(id);
        Object.assign(product, data);
        return this.productRepository.save(product);
    }
    async delete(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
    constructor(productRepository, categoryRepository, unitRepository){
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.unitRepository = unitRepository;
    }
};
ProductsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_productentity.Product)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_productcategoryentity.ProductCategory)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_productunitentity.ProductUnit)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ProductsService);

//# sourceMappingURL=products.service.js.map