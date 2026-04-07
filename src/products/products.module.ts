import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductUnit } from './entities/product-unit.entity';
import { ProductPricingModel } from './entities/product-pricing-model.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { PriceBook } from './entities/price-book.entity';
import { PriceBookItem } from './entities/price-book-item.entity';
import { Brand } from './entities/brand.entity';
import { Inventory } from './entities/inventory.entity';
import { ProductMedia } from './entities/product-media.entity';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductType } from './entities/product-type.entity';
import { TaxClass } from './entities/tax-class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductCategory,
      ProductUnit,
      ProductPricingModel,
      ProductVariant,
      PriceBook,
      PriceBookItem,
      Brand,
      Inventory,
      ProductMedia,
      ProductAttribute,
      ProductType,
      TaxClass,
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
