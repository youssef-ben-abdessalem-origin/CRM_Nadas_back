import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vendors')
@UseGuards(JwtAuthGuard)
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get('categories')
  getCategories() {
    return this.vendorsService.getCategories();
  }

  @Post('categories')
  createCategory(@Body() data: any) {
    return this.vendorsService.createCategory(data);
  }

  @Put('categories/:id')
  updateCategory(@Param('id') id: string, @Body() data: any) {
    return this.vendorsService.updateCategory(+id, data);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.vendorsService.deleteCategory(+id);
  }

  @Get()
  findAll(@Query('search') search?: string, @Query('category') category?: string) {
    return this.vendorsService.findAll(search, category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.vendorsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.vendorsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorsService.remove(id);
  }
}
