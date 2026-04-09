import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('currency')
  @UseGuards(JwtAuthGuard)
  async getDefaultCurrency(@Req() req: Request) {
    const user: any = req.user;
    return this.profileService.getCurrencyInfo(user);
  }
}
