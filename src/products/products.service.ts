import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductUnit } from './entities/product-unit.entity';
import { ProductPricingModel } from './entities/product-pricing-model.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { PriceBook } from './entities/price-book.entity';
import { PriceBookItem } from './entities/price-book-item.entity';
import { Brand } from './entities/brand.entity';

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
    @InjectRepository(ProductVariant)
    private readonly variantRepository: Repository<ProductVariant>,
    @InjectRepository(PriceBook)
    private readonly priceBookRepository: Repository<PriceBook>,
    @InjectRepository(PriceBookItem)
    private readonly priceBookItemRepository: Repository<PriceBookItem>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultData();
  }

  private async seedDefaultData() {
    // Seed PriceBook if none
    const priceBookCount = await this.priceBookRepository.count();
    if (priceBookCount === 0) {
      await this.priceBookRepository.save({
        name: 'Standard Price Book',
        currency: 'USD',
        isDefault: true,
      });
    }

    const categoryCount = await this.categoryRepository.count();
    if (categoryCount === 0) {
      const defaultCategories = ['Software', 'Hardware', 'Service', 'Subscription', 'Support', 'Training', 'Other'];
      for (const name of defaultCategories) {
        await this.categoryRepository.save({ name });
      }
    }

    // Seed Brands
    const brandCount = await this.brandRepository.count();
    if (brandCount === 0) {
      const defaultBrands = ['Nexus', 'CloudFlow', 'SafeGuard'];
      for (const name of defaultBrands) {
        await this.brandRepository.save({ name });
      }
    }

    // Seed Units
    const unitCount = await this.unitRepository.count();
    if (unitCount === 0) {
      const defaultUnits = ['Unidad', 'Caja', 'Litro', 'Kilogramo', 'Mes', 'Hora'];
      for (const name of defaultUnits) {
        await this.unitRepository.save({ name });
      }
    }

    // Seed Pricing Models
    const modelCount = await this.pricingModelRepository.count();
    if (modelCount === 0) {
      const defaultModels = ['One-Time', 'Recurring', 'Usage-Based', 'Tiered'];
      for (const name of defaultModels) {
        await this.pricingModelRepository.save({ name });
      }
    }
  }

  // Brand Management
  async getBrands() {
    return this.brandRepository.find({ order: { name: 'ASC' } });
  }

  // PriceBook Management
  async getPriceBooks() {
    return this.priceBookRepository.find({ order: { name: 'ASC' } });
  }

  async createPriceBook(data: any) {
    const pb = this.priceBookRepository.create(data as Partial<PriceBook>);
    return this.priceBookRepository.save(pb);
  }

  async updatePriceBook(id: string, data: any) {
    await this.priceBookRepository.update(id, data);
    return this.priceBookRepository.findOne({ where: { id } });
  }

  async deletePriceBook(id: string) {
    await this.priceBookRepository.delete(id);
  }

  // Unit management
  async getUnits() {
    return this.unitRepository.find({ order: { name: 'ASC' } });
  }

  async createUnit(name: string) {
    const unit = this.unitRepository.create({ name });
    return this.unitRepository.save(unit);
  }

  async updateUnit(id: string, data: any) {
    await this.unitRepository.update(id, data);
    return this.unitRepository.findOne({ where: { id } });
  }

  async deleteUnit(id: string) {
    await this.unitRepository.delete(id);
  }

  // Pricing Model management
  async getPricingModels() {
    return this.pricingModelRepository.find({ order: { name: 'ASC' } });
  }

  async createPricingModel(name: string) {
    const model = this.pricingModelRepository.create({ name });
    return this.pricingModelRepository.save(model);
  }

  async updatePricingModel(id: string, data: any) {
    await this.pricingModelRepository.update(id, data);
    return this.pricingModelRepository.findOne({ where: { id } });
  }

  async deletePricingModel(id: string) {
    await this.pricingModelRepository.delete(id);
  }

  // Category CRUD
  async getCategories() {
    return this.categoryRepository.find({ where: { isActive: true }, order: { name: 'ASC' } });
  }

  async createCategory(name: string, parentId?: string) {
    const category = this.categoryRepository.create({ name, parentId });
    return this.categoryRepository.save(category);
  }

  async updateCategory(id: string, data: Partial<ProductCategory>) {
    await this.categoryRepository.update(id, data);
    return this.categoryRepository.findOne({ where: { id } });
  }

  async deleteCategory(id: string) {
    await this.categoryRepository.delete(id);
  }

  // Product CRUD
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'brand', 'variants'],
    });
  }

  async setPrimaryPrice(variantId: string, priceId: string) {
    await this.variantRepository.update(variantId, { defaultPriceId: priceId });
    return this.variantRepository.findOne({
      where: { id: variantId },
      relations: ['prices', 'prices.priceBook', 'defaultPrice', 'defaultPrice.priceBook']
    });
  }

  async findAllPaginated(page = 1, limit = 5, search?: string, categoryId?: string): Promise<{ data: Product[]; total: number; page: number; limit: number; totalPages: number }> {
    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('variants.prices', 'prices')
      .leftJoinAndSelect('prices.priceBook', 'priceBook')
      .leftJoinAndSelect('variants.defaultPrice', 'defaultPrice')
      .leftJoinAndSelect('defaultPrice.priceBook', 'dpBook');

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.code ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    const [data, total] = await Promise.all([
      queryBuilder
        .orderBy('product.createdAt', 'DESC')
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

  // Variant Management
  async createVariant(data: any) {
    const variant = this.variantRepository.create(data as Partial<ProductVariant>);
    return this.variantRepository.save(variant);
  }

  async updateVariant(id: string, data: any) {
    await this.variantRepository.update(id, data);
    return this.variantRepository.findOne({ where: { id } });
  }

  async deleteVariant(id: string) {
    await this.variantRepository.delete(id);
  }

  // Price Book Item (Pricing) management
  async upsertPrice(variantId: string, priceBookId: string, price: number) {
    let priceItem = await this.priceBookItemRepository.findOne({
      where: { productVariantId: variantId, priceBookId: priceBookId }
    });

    if (priceItem) {
      priceItem.price = price;
    } else {
      priceItem = this.priceBookItemRepository.create({
        productVariantId: variantId,
        priceBookId: priceBookId,
        price: price
      });
    }

    return this.priceBookItemRepository.save(priceItem);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'brand', 'variants', 'variants.prices', 'variants.prices.priceBook'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: any): Promise<Product> {
    const { variants, ...rest } = data;
    const productInstance = this.productRepository.create(rest as Partial<Product>);
    const savedProduct = await this.productRepository.save(productInstance);

    if (variants && Array.isArray(variants)) {
      for (const vData of variants) {
        const variantInstance = this.variantRepository.create({ ...vData, productId: savedProduct.id } as Partial<ProductVariant>);
        const savedVariant = await this.variantRepository.save(variantInstance);

        if (vData.prices && Array.isArray(vData.prices)) {
          for (const pData of vData.prices) {
            await this.priceBookItemRepository.save({
              ...pData,
              productVariantId: savedVariant.id,
            });
          }
        }
      }
    } else {
      // Create a default variant if none provided
      const defaultVariant = this.variantRepository.create({
        productId: savedProduct.id,
        name: 'Default',
        sku: `${savedProduct.code}-DEF`,
        isDefault: true,
      });
      await this.variantRepository.save(defaultVariant);
    }

    return this.findOne(savedProduct.id);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return this.productRepository.save(product);
  }

  async delete(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
