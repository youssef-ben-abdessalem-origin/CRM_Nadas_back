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
    @Query('category') category?: string,
    @Query('status') status?: string,
  ) {
    return this.productsService.findAllPaginated(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 5,
      search,
      category,
      status,
    );
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
