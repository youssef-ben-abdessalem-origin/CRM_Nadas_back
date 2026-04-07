import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string, phone?: string) {
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const userRole = await this.roleRepository.findOne({ where: { name: 'USER' } });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: userRole,
      enabled: true,
    });
    await this.userRepository.save(user);

    return this.generateTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyToken(refreshToken);
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getProfile(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.mapToUserResponse(user);
  }

  private async generateTokens(user: User) {
    const accessToken = await this.jwtService.generateToken({ 
      email: user.email, 
      sub: user.id, 
      role: user.role?.name || 'USER' 
    });
    const refreshToken = await this.jwtService.generateRefreshToken({ 
      email: user.email, 
      sub: user.id 
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      accessTokenExpiresIn: 900,
      refreshTokenExpiresIn: 604800,
      refreshToken,
      user: this.mapToUserResponse(user),
    };
  }

  private mapToUserResponse(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role?.name || 'USER',
      enabled: user.enabled,
      phone: user.phone,
      avatar: user.avatar,
      createdAt: user.createdAt?.toISOString(),
    };
  }
}