import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('currency')
  @UseGuards(JwtAuthGuard)
  getDefaultCurrency(@Req() req: Request) {
    const user: any = req.user;
    const currency = user?.currency ?? 'USD';
    const symbolMap: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      INR: '₹',
      CAD: '$',
      AUD: '$',
      CHF: 'CHF',
      CNY: '¥',
    };
    const symbol = symbolMap[currency] ?? '$';
    // also return a CurrencyBadge-like object for frontend convenience
    return { currency, symbol };
  }
}
