import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role'] });
  }

  async create(data: { name: string; email: string; password?: string; roleId?: number; phone?: string; enabled?: boolean }): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email: data.email } });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password || 'password123', 10);
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      enabled: data.enabled ?? true,
    });

    if (data.roleId) {
      user.role = await this.roleRepository.findOne({ where: { id: data.roleId } });
    }

    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    if (!id || Number.isNaN(id)) {
      throw new NotFoundException('User not found');
    }
    const user = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: { name?: string; phone?: string; roleId?: number; enabled?: boolean }): Promise<User> {
    const user = await this.findOne(id);
    if (data.name) user.name = data.name;
    if (data.phone) user.phone = data.phone;
    if (data.enabled !== undefined) user.enabled = data.enabled;
    
    if (data.roleId) {
      user.role = await this.roleRepository.findOne({ where: { id: data.roleId } });
    }

    return this.userRepository.save(user);
  }

  async updateProfile(id: number, data: { name?: string; phone?: string; avatar?: string }): Promise<User> {
    const user = await this.findOne(id);
    if (data.name) user.name = data.name;
    if (data.phone) user.phone = data.phone;
    if (data.avatar) user.avatar = data.avatar;
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}