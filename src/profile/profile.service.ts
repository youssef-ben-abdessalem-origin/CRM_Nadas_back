import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  getDefaultCurrency(user: any): string {
    return user?.currency ?? 'USD';
  }
}
