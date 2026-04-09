import { Injectable, NotFoundException, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const modules = [
      { name: 'leads', perms: ['view', 'create', 'update', 'delete', 'export'] },
      { name: 'deals', perms: ['view', 'create', 'update', 'delete', 'export'] },
      { name: 'accounts', perms: ['view', 'create', 'update', 'delete'] },
      { name: 'contacts', perms: ['view', 'create', 'update', 'delete'] },
      { name: 'products', perms: ['view', 'create', 'update', 'delete'] },
      { name: 'team', perms: ['view', 'manage_roles', 'manage_perms'] },
    ];

    const allPerms: Permission[] = [];
    for (const m of modules) {
      for (const p of m.perms) {
        let perm = await this.permissionRepository.findOne({ where: { code: `${m.name}.${p}` } });
        if (!perm) {
          perm = await this.permissionRepository.save(
            this.permissionRepository.create({
              code: `${m.name}.${p}`,
              name: `${p.replace('_', ' ')} ${m.name}`,
              module: m.name,
            }),
          );
        }
        allPerms.push(perm);
      }
    }

    const defaultRoles = [
      { name: 'ADMIN', desc: 'Full system access', color: '#ef4444', perms: allPerms },
      { name: 'MANAGER', desc: 'Can manage most data but no settings', color: '#3b82f6', perms: allPerms.filter(p => !p.code.includes('team.manage')) },
      { name: 'USER', desc: 'Limited access to own data', color: '#10b981', perms: allPerms.filter(p => p.code.includes('.view')) },
    ];

    for (const dr of defaultRoles) {
      let role = await this.roleRepository.findOne({ where: { name: dr.name } });
      if (!role) {
        role = this.roleRepository.create({
          name: dr.name,
          description: dr.desc,
          color: dr.color,
          isSystem: true,
          permissions: dr.perms,
        });
        await this.roleRepository.save(role);
      }
    }

    // Seed default admin user
    const adminEmail = 'admin@nexus.crm';
    const adminUser = await this.userRepository.findOne({ where: { email: adminEmail } });
    if (!adminUser) {
      const adminRole = await this.roleRepository.findOne({ where: { name: 'ADMIN' } });
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      await this.userRepository.save(
        this.userRepository.create({
          name: 'System Admin',
          email: adminEmail,
          password: hashedPassword,
          role: adminRole,
          enabled: true,
        }),
      );
    }
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } as any });
    if (!role) throw new NotFoundException(`Role with ID ${id} not found`);
    return role;
  }

  async getRolePermissions(id: string): Promise<Permission[]> {
    const role = await this.findOne(id);
    return role.permissions;
  }

  async create(data: { name: string; description?: string; color?: string; permissionIds?: number[] }): Promise<Role> {
    if (!data.name) throw new BadRequestException('Role name is required');
    const existing = await this.roleRepository.findOne({ where: { name: data.name } });
    if (existing) throw new BadRequestException('Role already exists');

    const role = this.roleRepository.create({
      name: data.name,
      description: data.description,
      color: data.color,
      isSystem: false,
    });

    if (data.permissionIds && data.permissionIds.length > 0) {
      role.permissions = await this.permissionRepository.find({
        where: { id: In(data.permissionIds) }
      });
    }

    return this.roleRepository.save(role);
  }

  async update(id: string, data: { name?: string; description?: string; color?: string; permissionIds?: number[] }): Promise<Role> {
    const role = await this.findOne(id);
    
    if (data.name) role.name = data.name;
    if (data.description) role.description = data.description;
    if (data.color) role.color = data.color;

    if (data.permissionIds) {
      role.permissions = await this.permissionRepository.find({
        where: { id: In(data.permissionIds) }
      });
    }

    return this.roleRepository.save(role);
  }

  async delete(id: string): Promise<void> {
    const role = await this.findOne(id);
    if (role.isSystem) throw new BadRequestException('Cannot delete system roles');
    await this.roleRepository.remove(role);
  }
}
