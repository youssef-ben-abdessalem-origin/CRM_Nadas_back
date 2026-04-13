"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VendorsService", {
    enumerable: true,
    get: function() {
        return VendorsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _vendorentity = require("./entities/vendor.entity");
const _vendorcategoryentity = require("./entities/vendor-category.entity");
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
let VendorsService = class VendorsService {
    async getCategories() {
        return this.categoryRepository.find();
    }
    async createCategory(data) {
        const category = this.categoryRepository.create(data);
        return this.categoryRepository.save(category);
    }
    async updateCategory(id, data) {
        const category = await this.categoryRepository.findOne({
            where: {
                id
            }
        });
        if (!category) throw new _common.NotFoundException('Category not found');
        Object.assign(category, data);
        return this.categoryRepository.save(category);
    }
    async deleteCategory(id) {
        const category = await this.categoryRepository.findOne({
            where: {
                id
            }
        });
        if (!category) throw new _common.NotFoundException('Category not found');
        await this.categoryRepository.remove(category);
    }
    async findAll(search, category) {
        const queryBuilder = this.vendorRepository.createQueryBuilder('vendor').leftJoinAndSelect('vendor.owner', 'owner');
        if (search) {
            queryBuilder.andWhere('(vendor.name ILIKE :search OR vendor.email ILIKE :search OR vendor.phone ILIKE :search)', {
                search: `%${search}%`
            });
        }
        if (category) {
            queryBuilder.andWhere('vendor.category = :category', {
                category
            });
        }
        return queryBuilder.orderBy('vendor.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const vendor = await this.vendorRepository.findOne({
            where: {
                id
            },
            relations: [
                'owner'
            ]
        });
        if (!vendor) throw new _common.NotFoundException('Vendor not found');
        return vendor;
    }
    async create(data) {
        const vendor = this.vendorRepository.create(data);
        return this.vendorRepository.save(vendor);
    }
    async update(id, data) {
        const vendor = await this.findOne(id);
        Object.assign(vendor, data);
        return this.vendorRepository.save(vendor);
    }
    async remove(id) {
        const vendor = await this.findOne(id);
        await this.vendorRepository.remove(vendor);
    }
    constructor(vendorRepository, categoryRepository){
        this.vendorRepository = vendorRepository;
        this.categoryRepository = categoryRepository;
    }
};
VendorsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_vendorentity.Vendor)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_vendorcategoryentity.VendorCategory)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], VendorsService);

//# sourceMappingURL=vendors.service.js.map