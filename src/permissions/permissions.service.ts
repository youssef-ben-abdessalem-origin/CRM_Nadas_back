import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find({ order: { module: 'ASC', name: 'ASC' } });
  }

  async findByModule(module: string): Promise<Permission[]> {
    return this.permissionRepository.find({ where: { module } });
  }

  // Permissions are typically seeded, not created via API, but I'll add a helper
  async upsert(data: { name: string; code: string; module: string }): Promise<Permission> {
    const existing = await this.permissionRepository.findOne({ where: { code: data.code } });
    const permission = existing || this.permissionRepository.create(data);
    
    permission.name = data.name;
    permission.module = data.module;
    
    return this.permissionRepository.save(permission);
  }
}
