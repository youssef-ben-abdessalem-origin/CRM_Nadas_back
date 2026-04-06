import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    if (!id || isNaN(id)) {
      throw new NotFoundException('User not found');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: { name?: string; phone?: string; role?: Role; enabled?: boolean }): Promise<User> {
    const user = await this.findOne(id);
    if (data.name) user.name = data.name;
    if (data.phone) user.phone = data.phone;
    if (data.role) user.role = data.role;
    if (data.enabled !== undefined) user.enabled = data.enabled;
    return this.userRepository.save(user);
  }

  async updateProfile(id: number, data: { name?: string; phone?: string; avatar?: string }): Promise<User> {
    const user = await this.findOne(id);
    if (data.name) user.name = data.name;
    if (data.phone) user.phone = data.phone;
    if (data.avatar) user.avatar = data.avatar;
    user.updatedAt = new Date();
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}