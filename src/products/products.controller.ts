import { Controller, Get, Post, Put, Delete, Body, Param, Req, Query, ParseUUIDPipe } from '@nestjs/common';
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
      categoryId,
    );
  }

  // Brands
  @Get('brands')
  getBrands() {
    return this.productsService.getBrands();
  }

  // Price Books
  @Get('price-books')
  getPriceBooks() {
    return this.productsService.getPriceBooks();
  }

  // Categories
  @Get('categories')
  getCategories() {
    return this.productsService.getCategories();
  }

  @Post('categories')
  createCategory(@Body('name') name: string, @Body('parentId') parentId?: string) {
    return this.productsService.createCategory(name, parentId);
  }

  @Put('categories/:id')
  updateCategory(@Param('id', ParseUUIDPipe) id: string, @Body() data: any) {
    return this.productsService.updateCategory(id, data);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteCategory(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() data: any): Promise<Product> {
    return this.productsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: Partial<Product>
  ): Promise<Product> {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productsService.delete(id);
  }
}
