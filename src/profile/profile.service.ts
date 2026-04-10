import { Injectable, NotFoundException } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    private readonly settingsService: SettingsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getCurrencyInfo(user: any) {
    if (user?.currency) {
      const currencies = await this.settingsService.getCurrencies();
      const match = currencies.find(c => c.code === user.currency);
      if (match) return { currency: match.code, symbol: match.symbol, symbolArabic: match.symbolArabic, symbolEnglish: match.symbolEnglish };
      return { currency: user.currency, symbol: '$' };
    }

    const def = await this.settingsService.getDefaultCurrencyInfo();
    return { currency: def.code, symbol: def.symbol, symbolArabic: def.symbolArabic, symbolEnglish: def.symbolEnglish };
  }

  async updateLanguage(userId: number, language: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    
    user.language = language;
    return this.userRepository.save(user);
  }
}
