import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
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
    @Query('status') status?: string,
    @Query('type') type?: string,
  ) {
    return this.productsService.findAllPaginated(
      page ? Number.parseInt(page) : 1,
      limit ? Number.parseInt(limit) : 5,
      search,
      categoryId,
      status,
      type,
    );
  }

  // Brands
  @Get('brands')
  getBrands() {
    return this.productsService.getBrands();
  }

  @Post('brands')
  createBrand(@Body('name') name: string, @Body('logo') logo?: string) {
    return this.productsService.createBrand(name, logo);
  }

  @Put('brands/:id')
  updateBrand(@Param('id', ParseUUIDPipe) id: string, @Body() data: any) {
    return this.productsService.updateBrand(id, data);
  }

  @Delete('brands/:id')
  deleteBrand(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteBrand(id);
  }

  // Tax Classes
  @Get('tax-classes')
  getTaxClasses() {
    return this.productsService.getTaxClasses();
  }

  @Post('tax-classes')
  createTaxClass(@Body() data: any) {
    return this.productsService.createTaxClass(data);
  }

  @Put('tax-classes/:id')
  updateTaxClass(@Param('id', ParseUUIDPipe) id: string, @Body() data: any) {
    return this.productsService.updateTaxClass(id, data);
  }

  @Delete('tax-classes/:id')
  deleteTaxClass(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteTaxClass(id);
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
  updateUnit(@Param('id', ParseUUIDPipe) id: string, @Body() data: any) {
    return this.productsService.updateUnit(id, data);
  }

  @Delete('units/:id')
  deleteUnit(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteUnit(id);
  }


  // Product Types
  @Get('types')
  getProductTypes() {
    return this.productsService.getProductTypes();
  }

  @Post('types')
  createProductType(@Body() data: any) {
    return this.productsService.createProductType(data);
  }

  @Put('types/:id')
  updateProductType(@Param('id', ParseUUIDPipe) id: string, @Body() data: any) {
    return this.productsService.updateProductType(id, data);
  }

  @Delete('types/:id')
  deleteProductType(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProductType(id);
  }
  @Get('pricing-models')
  getPricingModels() {
    return this.productsService.getPricingModels();
  }

  @Post('pricing-models')
  createPricingModel(@Body('name') name: string) {
    return this.productsService.createPricingModel(name);
  }

  @Put('pricing-models/:id')
  updatePricingModel(@Param('id', ParseUUIDPipe) id: string, @Body() data: any) {
    return this.productsService.updatePricingModel(id, data);
  }

  @Delete('pricing-models/:id')
  deletePricingModel(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deletePricingModel(id);
  }

  // Price Books
  @Get('price-books')
  getPriceBooks() {
    return this.productsService.getPriceBooks();
  }

  @Post('price-books')
  createPriceBook(@Body() data: any) {
    return this.productsService.createPriceBook(data);
  }

  @Put('price-books/:id')
  updatePriceBook(@Param('id', ParseUUIDPipe) id: string, @Body() data: any) {
    return this.productsService.updatePriceBook(id, data);
  }

  @Delete('price-books/:id')
  deletePriceBook(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deletePriceBook(id);
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

  // Variants
  @Post('variants')
  createVariant(@Body() data: any) {
    return this.productsService.createVariant(data);
  }

  @Put('variants/:id')
  updateVariant(@Param('id', ParseUUIDPipe) id: string, @Body() data: any) {
    return this.productsService.updateVariant(id, data);
  }

  @Delete('variants/:id')
  deleteVariant(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteVariant(id);
  }

  // Set individual variant pricing
  @Post('variants/:id/pricing')
  upsertPrice(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('priceBookId', ParseUUIDPipe) pbId: string,
    @Body('price') price: number
  ) {
    return this.productsService.upsertPrice(id, pbId, price);
  }

  @Post('variants/:variantId/primary/:priceId')
  setPrimaryPrice(
    @Param('variantId', ParseUUIDPipe) vId: string,
    @Param('priceId', ParseUUIDPipe) pId: string
  ) {
    return this.productsService.setPrimaryPrice(vId, pId);
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

  @Post(':id/archive')
  archive(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.archive(id);
  }

  @Post(':id/duplicate')
  duplicate(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.duplicate(id);
  }
}
