import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductUnit } from './entities/product-unit.entity';
import { ProductPricingModel } from './entities/product-pricing-model.entity';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
    @InjectRepository(ProductUnit)
    private readonly unitRepository: Repository<ProductUnit>,
    @InjectRepository(ProductPricingModel)
    private readonly pricingModelRepository: Repository<ProductPricingModel>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultData();
  }

  private async seedDefaultData() {
    const categoryCount = await this.categoryRepository.count();
    if (categoryCount === 0) {
      const defaultCategories = ['Software', 'Hardware', 'Service', 'Subscription', 'Support', 'Training', 'Other'];
      for (const name of defaultCategories) {
        await this.categoryRepository.save({ name });
      }
    }

    const unitCount = await this.unitRepository.count();
    if (unitCount === 0) {
      const defaultUnits = ['unit', 'license', 'hour', 'day', 'month', 'year', 'user', 'project'];
      for (const name of defaultUnits) {
        await this.unitRepository.save({ name });
      }
    }

    const pricingModelCount = await this.pricingModelRepository.count();
    if (pricingModelCount === 0) {
      const defaultPricingModels = ['one-time', 'subscription', 'usage-based', 'tiered'];
      for (const name of defaultPricingModels) {
        await this.pricingModelRepository.save({ name });
      }
    }
  }

  // Category CRUD
  async getCategories() {
    return this.categoryRepository.find({ where: { isActive: true }, order: { name: 'ASC' } });
  }

  async createCategory(name: string) {
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  async updateCategory(id: number, data: Partial<ProductCategory>) {
    await this.categoryRepository.update(id, data);
    return this.categoryRepository.findOne({ where: { id } });
  }

  async deleteCategory(id: number) {
    await this.categoryRepository.delete(id);
  }

  // Unit CRUD
  async getUnits() {
    return this.unitRepository.find({ where: { isActive: true }, order: { name: 'ASC' } });
  }

  async createUnit(name: string) {
    const unit = this.unitRepository.create({ name });
    return this.unitRepository.save(unit);
  }

  async updateUnit(id: number, data: Partial<ProductUnit>) {
    await this.unitRepository.update(id, data);
    return this.unitRepository.findOne({ where: { id } });
  }

  async deleteUnit(id: number) {
    await this.unitRepository.delete(id);
  }

  // Pricing Model CRUD
  async getPricingModels() {
    return this.pricingModelRepository.find({ where: { isActive: true }, order: { name: 'ASC' } });
  }

  async createPricingModel(name: string) {
    const model = this.pricingModelRepository.create({ name });
    return this.pricingModelRepository.save(model);
  }

  async updatePricingModel(id: number, data: Partial<ProductPricingModel>) {
    await this.pricingModelRepository.update(id, data);
    return this.pricingModelRepository.findOne({ where: { id } });
  }

  async deletePricingModel(id: number) {
    await this.pricingModelRepository.delete(id);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findAllPaginated(page = 1, limit = 5, search?: string, categoryId?: number): Promise<{ data: Product[]; total: number; page: number; limit: number; totalPages: number }> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.sku ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    const [data, total] = await Promise.all([
      queryBuilder
        .orderBy('product.id', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getMany(),
      queryBuilder.getCount()
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
