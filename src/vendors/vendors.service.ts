import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { VendorCategory } from './entities/vendor-category.entity';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(VendorCategory)
    private readonly categoryRepository: Repository<VendorCategory>,
  ) {}

  async getCategories(): Promise<VendorCategory[]> {
    return this.categoryRepository.find();
  }

  async createCategory(data: Partial<VendorCategory>): Promise<VendorCategory> {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  async updateCategory(id: number, data: Partial<VendorCategory>): Promise<VendorCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    Object.assign(category, data);
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    await this.categoryRepository.remove(category);
  }

  async findAll(search?: string, category?: string): Promise<Vendor[]> {
    const queryBuilder = this.vendorRepository.createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.owner', 'owner');

    if (search) {
      queryBuilder.andWhere(
        '(vendor.name ILIKE :search OR vendor.email ILIKE :search OR vendor.phone ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (category) {
      queryBuilder.andWhere('vendor.category = :category', { category });
    }

    return queryBuilder.orderBy('vendor.createdAt', 'DESC').getMany();
  }

  async findOne(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async create(data: any): Promise<Vendor> {
    const vendor = this.vendorRepository.create(data);
    return this.vendorRepository.save(vendor);
  }

  async update(id: string, data: any): Promise<Vendor> {
    const vendor = await this.findOne(id);
    Object.assign(vendor, data);
    return this.vendorRepository.save(vendor);
  }

  async remove(id: string): Promise<void> {
    const vendor = await this.findOne(id);
    await this.vendorRepository.remove(vendor);
  }
}
