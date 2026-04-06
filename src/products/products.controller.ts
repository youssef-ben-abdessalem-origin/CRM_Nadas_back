import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, ForbiddenException, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('paginated')
  findAllPaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.productsService.findAllPaginated(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 5,
      search,
      categoryId ? parseInt(categoryId) : undefined,
    );
  }

  // Categories
  @Get('categories')
  getCategories() {
    return this.productsService.getCategories();
  }

  @Post('categories')
  createCategory(@Body('name') name: string) {
    return this.productsService.createCategory(name);
  }

  @Put('categories/:id')
  updateCategory(@Param('id') id: string, @Body() data: any) {
    return this.productsService.updateCategory(Number.parseInt(id), data);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.productsService.deleteCategory(Number.parseInt(id));
  }

  // Units
  @Get('units')
  getUnits() {
    return this.productsService.getUnits();
  }

  @Post('units')
  createUnit(@Body('name') name: string) {
    return this.productsService.createUnit(name);
  }

  @Put('units/:id')
  updateUnit(@Param('id') id: string, @Body() data: any) {
    return this.productsService.updateUnit(Number.parseInt(id), data);
  }

  @Delete('units/:id')
  deleteUnit(@Param('id') id: string) {
    return this.productsService.deleteUnit(Number.parseInt(id));
  }

  // Pricing Models
  @Get('pricing-models')
  getPricingModels() {
    return this.productsService.getPricingModels();
  }

  @Post('pricing-models')
  createPricingModel(@Body('name') name: string) {
    return this.productsService.createPricingModel(name);
  }

  @Reflect.metadata('design:type', Function)
  @Put('pricing-models/:id')
  updatePricingModel(@Param('id') id: string, @Body() data: any) {
    return this.productsService.updatePricingModel(Number.parseInt(id), data);
  }

  @Delete('pricing-models/:id')
  deletePricingModel(@Param('id') id: string) {
    return this.productsService.deletePricingModel(Number.parseInt(id));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Product>): Promise<Product> {
    return this.productsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Product>,
    @Req() req: Request,
  ): Promise<Product> {
    const user = (req as any).user;
    if (data.status !== undefined) {
      // Only ADMIN or MANAGER can set status
      if (!user || !user.role || user.role === 'USER') {
        throw new ForbiddenException('Not allowed to change product status');
      }
    }
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.delete(id);
  }
}
