import { Injectable } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class ProfileService {
  constructor(private readonly settingsService: SettingsService) {}

  async getCurrencyInfo(user: any) {
    if (user?.currency) {
      // If user has a specific currency set, we should ideally fetch its symbol too
      // but for now let's at least try to match it against our currencies list
      const currencies = await this.settingsService.getCurrencies();
      const match = currencies.find(c => c.code === user.currency);
      if (match) return { currency: match.code, symbol: match.symbol };
      return { currency: user.currency, symbol: '$' };
    }

    // Default system currency
    const def = await this.settingsService.getDefaultCurrencyInfo();
    return { currency: def.code, symbol: def.symbol };
  }
}
