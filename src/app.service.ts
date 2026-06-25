import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DataInitializer implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const adminExists = await this.userRepository.findOne({ where: { email: 'admin@nexus.com' } });
    if (!adminExists) {
      const adminRole = await this.roleRepository.findOne({ where: { name: 'ADMIN' } });
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = this.userRepository.create({
        name: 'Admin User',
        email: 'admin@nexus.com',
        password: hashedPassword,
        role: adminRole || undefined,
        enabled: true,
      });
      await this.userRepository.save(admin);
      console.log('Default admin user created: admin@nexus.com / admin123');
    }
  }
}