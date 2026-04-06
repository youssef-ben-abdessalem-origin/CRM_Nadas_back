import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DataInitializer implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminExists = await this.userRepository.findOne({ where: { email: 'admin@nexus.com' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = this.userRepository.create({
        name: 'Admin User',
        email: 'admin@nexus.com',
        password: hashedPassword,
        role: Role.ADMIN,
        enabled: true,
      });
      await this.userRepository.save(admin);
      console.log('Default admin user created: admin@nexus.com / admin123');
    }
  }
}