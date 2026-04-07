import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductUnit } from './entities/product-unit.entity';
import { ProductPricingModel } from './entities/product-pricing-model.entity';
import { ProductVariant, VariantStatus } from './entities/product-variant.entity';
import { PriceBook } from './entities/price-book.entity';
import { PriceBookItem } from './entities/price-book-item.entity';
import { Brand } from './entities/brand.entity';
import { Inventory } from './entities/inventory.entity';
import { ProductMedia } from './entities/product-media.entity';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductType } from './entities/product-type.entity';
import { TaxClass } from './entities/tax-class.entity';

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
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(ProductMedia)
    private readonly mediaRepository: Repository<ProductMedia>,
    @InjectRepository(ProductAttribute)
    private readonly attributeRepository: Repository<ProductAttribute>,
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
    @InjectRepository(TaxClass)
    private readonly taxClassRepository: Repository<TaxClass>,
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

    // Seed Product Types
    const typeCount = await this.productTypeRepository.count();
    if (typeCount === 0) {
      const defaultTypes = [
        { name: 'Physical Good', code: 'physical', description: 'Tangible products that require inventory tracking and shipping.' },
        { name: 'Professional Service', code: 'service', description: 'Internal or external services, maintenance, or consulting.' },
        { name: 'Digital Product', code: 'digital', description: 'Software, licenses, or downloadable assets.' }
      ];
      for (const type of defaultTypes) {
        await this.productTypeRepository.save(type);
      }
    }

    // Seed Tax Classes
    const taxCount = await this.taxClassRepository.count();
    if (taxCount === 0) {
      const defaultTaxClasses = [
        { name: 'Standard', rate: 21 },
        { name: 'Reduced', rate: 10 },
        { name: 'Exempt', rate: 0 }
      ];
      for (const tc of defaultTaxClasses) {
        await this.taxClassRepository.save(tc);
      }
    }
  }

  // Product Type Management
  async getProductTypes() {
    return this.productTypeRepository.find({ order: { name: 'ASC' } });
  }

  async createProductType(data: any) {
    const type = this.productTypeRepository.create(data);
    return this.productTypeRepository.save(type);
  }

  async updateProductType(id: string, data: any) {
    await this.productTypeRepository.update(id, data);
    return this.productTypeRepository.findOne({ where: { id } });
  }

  async deleteProductType(id: string) {
    await this.productTypeRepository.delete(id);
  }

  // Brand Management
  async getBrands() {
    return this.brandRepository.find({ order: { name: 'ASC' } });
  }

  async createBrand(name: string, logo?: string) {
    const brand = this.brandRepository.create({ name, logo });
    return this.brandRepository.save(brand);
  }

  async updateBrand(id: string, data: any) {
    await this.brandRepository.update(id, data);
    return this.brandRepository.findOne({ where: { id } });
  }

  async deleteBrand(id: string) {
    await this.brandRepository.delete(id);
  }

  // Tax Class Management
  async getTaxClasses() {
    return this.taxClassRepository.find({ order: { name: 'ASC' } });
  }

  async createTaxClass(data: any) {
    const tax = this.taxClassRepository.create(data);
    return this.taxClassRepository.save(tax);
  }

  async updateTaxClass(id: string, data: any) {
    await this.taxClassRepository.update(id, data);
    return this.taxClassRepository.findOne({ where: { id } });
  }

  async deleteTaxClass(id: string) {
    await this.taxClassRepository.delete(id);
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
      relations: ['category', 'brand', 'variants', 'media', 'attributes'],
    });
  }

  async setPrimaryPrice(variantId: string, priceId: string) {
    // Note: defaultPriceId removed from variant entity in new schema as per schema description, 
    // it says "price" and "cost" are now on the variant directly.
    // If we want to keep price books, we can still use them.
    return this.variantRepository.findOne({
      where: { id: variantId },
      relations: ['prices', 'prices.priceBook']
    });
  }

  async findAllPaginated(
    page = 1, 
    limit = 5, 
    search?: string, 
    categoryId?: string,
    status?: string,
    type?: string
  ): Promise<{ data: Product[]; total: number; page: number; limit: number; totalPages: number }> {
    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('variants.prices', 'prices')
      .leftJoinAndSelect('prices.priceBook', 'priceBook')
      .leftJoinAndSelect('product.media', 'media')
      .leftJoinAndSelect('product.attributes', 'attributes')
      .leftJoinAndSelect('variants.inventory', 'inventory');

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.slug ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (status) {
      queryBuilder.andWhere('product.status = :status', { status });
    }

    if (type) {
      queryBuilder.andWhere('product.type = :type', { type });
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
      where: { variantId: variantId, priceBookId: priceBookId }
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

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'brand', 'variants', 'variants.prices', 'variants.prices.priceBook', 'media', 'attributes', 'variants.inventory'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: any): Promise<Product> {
    const { variants, media, attributes, ...rest } = data;
    const productInstance = this.productRepository.create(rest as Partial<Product>);
    const savedProduct = await this.productRepository.save(productInstance);

    if (variants && Array.isArray(variants)) {
      for (const vData of variants) {
        const { inventory, prices, ...vRest } = vData;
        const variantInstance = this.variantRepository.create({ ...vRest, productId: savedProduct.id } as Partial<ProductVariant>);
        const savedVariant = await this.variantRepository.save(variantInstance);

        if (inventory && Array.isArray(inventory)) {
          for (const iData of inventory) {
            await this.inventoryRepository.save({ ...iData, variantId: savedVariant.id });
          }
        }

        if (prices && Array.isArray(prices)) {
          for (const pData of prices) {
            await this.priceBookItemRepository.save({
              ...pData,
              variantId: savedVariant.id,
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
        status: VariantStatus.ACTIVE,
        isDefault: true,
      });
      await this.variantRepository.save(defaultVariant);
    }

    if (media && Array.isArray(media)) {
      for (const mData of media) {
        await this.mediaRepository.save({ ...mData, productId: savedProduct.id });
      }
    }

    if (attributes && Array.isArray(attributes)) {
      for (const aData of attributes) {
        await this.attributeRepository.save({ ...aData, productId: savedProduct.id });
      }
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
    await this.productRepository.softRemove(product);
  }

  async archive(id: string): Promise<Product> {
    const product = await this.findOne(id);
    product.status = ProductStatus.ARCHIVED;
    return this.productRepository.save(product);
  }

  async duplicate(id: string): Promise<Product> {
    const original = await this.findOne(id);
    const { id: _, createdAt: __, updatedAt: ___, variants, media, attributes, ...rest } = original;
    
    const duplicatedProduct = this.productRepository.create({
      ...rest,
      name: `${original.name} (Copy)`,
      slug: `${original.slug}-copy-${Date.now()}`,
      status: ProductStatus.DRAFT,
    });
    
    const saved = await this.productRepository.save(duplicatedProduct);

    // Clone Media
    if (media) {
      for (const m of media) {
        const { id: ___, ...mRest } = m;
        await this.mediaRepository.save({ ...mRest, productId: saved.id });
      }
    }

    // Clone Attributes
    if (attributes) {
      for (const a of attributes) {
        const { id: ___, ...aRest } = a;
        await this.attributeRepository.save({ ...aRest, productId: saved.id });
      }
    }

    // Clone Variants
    if (variants) {
      for (const v of variants) {
        const { id: vId, prices, inventory, ...vRest } = v;
        const newVariant = await this.variantRepository.save({
          ...vRest,
          productId: saved.id,
          sku: `${v.sku}-COPY-${Date.now()}`
        });

        // Clone Prices
        if (prices) {
          for (const p of prices) {
            const { id: ___, ...pRest } = p;
            await this.priceBookItemRepository.save({ ...pRest, variantId: newVariant.id });
          }
        }

        // Clone Inventory
        if (inventory) {
          for (const i of inventory) {
             const { id: ___, ...iRest } = i;
             await this.inventoryRepository.save({ ...iRest, variantId: newVariant.id });
          }
        }
      }
    }

    return this.findOne(saved.id);
  }
}
