import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

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
