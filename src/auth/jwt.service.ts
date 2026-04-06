import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private jwtService: NestJwtService) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}