import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
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

  @Patch('language')
  @UseGuards(JwtAuthGuard)
  async updateLanguage(@Req() req: Request, @Body('language') language: string) {
    const user: any = req.user;
    return this.profileService.updateLanguage(user.id, language);
  }
}
