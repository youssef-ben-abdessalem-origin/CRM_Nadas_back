import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { AccountType } from './entities/account-type.entity';
import { AccountStatus } from './entities/account-status.entity';
import { AccountTier } from './entities/account-tier.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { ContactStatus } from '../contacts/entities/contact-status.entity';
import { ContactTier } from '../contacts/entities/contact-tier.entity';

@Injectable()
export class AccountsService implements OnModuleInit {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(AccountType)
    private accountTypeRepository: Repository<AccountType>,
    @InjectRepository(AccountStatus)
    private accountStatusRepository: Repository<AccountStatus>,
    @InjectRepository(AccountTier)
    private accountTierRepository: Repository<AccountTier>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(ContactStatus)
    private contactStatusRepository: Repository<ContactStatus>,
    @InjectRepository(ContactTier)
    private contactTierRepository: Repository<ContactTier>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultData();
  }

  private async seedDefaultData() {
    const typeCount = await this.accountTypeRepository.count();
    if (typeCount === 0) {
      const defaultTypes = [
        { name: 'Customer', color: '#22c55e', order: 1, isDefault: true },
        { name: 'Partner', color: '#3b82f6', order: 2 },
        { name: 'Prospect', color: '#f59e0b', order: 3 },
        { name: 'Competitor', color: '#ef4444', order: 4 },
      ];
      for (const type of defaultTypes) {
        await this.accountTypeRepository.save(type);
      }
    }

    const statusCount = await this.accountStatusRepository.count();
    if (statusCount === 0) {
      const defaultStatuses = [
        { name: 'Active', color: '#22c55e', order: 1, isDefault: true },
        { name: 'Inactive', color: '#6b7280', order: 2 },
        { name: 'Churned', color: '#ef4444', order: 3 },
      ];
      for (const status of defaultStatuses) {
        await this.accountStatusRepository.save(status);
      }
    }

    const tierCount = await this.accountTierRepository.count();
    if (tierCount === 0) {
      const defaultTiers = [
        { name: 'Enterprise', color: '#8b5cf6', order: 1 },
        { name: 'Mid-Market', color: '#3b82f6', order: 2 },
        { name: 'SMB', color: '#6b7280', order: 3 },
      ];
      for (const tier of defaultTiers) {
        await this.accountTierRepository.save(tier);
      }
    }
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find({ relations: ['type', 'status', 'tier'] });
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id }, relations: ['type', 'status', 'tier'] });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  async create(data: Partial<Account>): Promise<Account> {
    console.log('=== Creating Account ===');
    console.log('Owner from data:', data.owner);
    
    const account = this.accountRepository.create({
      ...data,
      created: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      avatar: data.name?.substring(0, 2).toUpperCase() || 'XX',
    });
    const savedAccount = await this.accountRepository.save(account);
    console.log('Account saved, owner:', savedAccount.owner);

    // Auto-create contact if owner is provided
    if (savedAccount.owner) {
      console.log('>>> Creating contact for owner:', savedAccount.owner);
      await this.createContactFromOwner(savedAccount.owner, savedAccount);
    } else {
      console.log('No owner on saved account, skipping contact creation');
    }

    return savedAccount;
  }

  private async createContactFromOwner(owner: string, account: Account): Promise<void> {
    let name = owner;
    let email = account.email || '';

    // Parse "Name <email>" format
    const emailMatch = owner.match(/^(.+?)\s*<(.+?)>$/);
    if (emailMatch) {
      name = emailMatch[1].trim();
      email = emailMatch[2].trim();
    } else if (owner.includes('@')) {
      email = owner;
      name = owner.split('@')[0];
    }

    console.log('Creating contact - name:', name, 'email:', email);

    // Get default status and tier - use query builder for ordering
    const defaultStatus = await this.contactStatusRepository.findOne({ where: { isDefault: true } });
    const tiers = await this.contactTierRepository.find({ order: { order: 'ASC' }, take: 1 });
    const defaultTier = tiers[0];
    console.log('Default status:', defaultStatus, 'Default tier:', defaultTier);

    // Create contact with just accountId (not the full object)
    const contact = this.contactRepository.create({
      name,
      email,
      phone: account.phone,
      company: account.name,
      accountId: account.id,
      contactStatusId: defaultStatus?.id || 1,
      contactTierId: defaultTier?.id || 1,
      location: account.location,
      industry: account.industry,
      website: account.website,
      created: new Date().toISOString().split('T')[0],
      lastContact: 'Just now',
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
    });

    const saved = await this.contactRepository.save(contact);
    console.log('Contact created successfully with ID:', saved.id);
  }

  async update(id: number, data: Partial<Account>): Promise<Account> {
    const account = await this.findOne(id);
    const hadOwner = !!account.owner;
    const hasNewOwner = data.owner && data.owner.trim();
    
    Object.assign(account, data);
    const savedAccount = await this.accountRepository.save(account);

    // Auto-create contact if owner is newly added
    if (hasNewOwner && !hadOwner) {
      console.log('New owner added, creating contact...');
      await this.createContactFromOwner(savedAccount.owner, savedAccount);
    }

    return savedAccount;
  }

  async delete(id: number): Promise<void> {
    const account = await this.findOne(id);
    await this.accountRepository.remove(account);
  }

  async bulkDelete(ids: number[]): Promise<void> {
    await this.accountRepository.delete(ids);
  }

  async bulkUpdate(ids: number[], updates: Partial<Account>): Promise<Account[]> {
    await this.accountRepository.update(ids, updates);
    return this.accountRepository.findByIds(ids);
  }

  // AccountType CRUD
  async getTypes(): Promise<AccountType[]> {
    return this.accountTypeRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async createType(name: string, color?: string): Promise<AccountType> {
    const maxOrder = await this.accountTypeRepository
      .createQueryBuilder('type')
      .select('MAX(type.order)', 'max')
      .getRawOne();
    return this.accountTypeRepository.save({ 
      name, 
      color, 
      order: (maxOrder?.max || 0) + 1, 
      isActive: true 
    });
  }

  async updateType(id: number, data: Partial<AccountType>): Promise<AccountType> {
    const type = await this.accountTypeRepository.findOne({ where: { id } });
    if (!type) throw new NotFoundException('Type not found');
    Object.assign(type, data);
    return this.accountTypeRepository.save(type);
  }

  async deleteType(id: number): Promise<void> {
    const type = await this.accountTypeRepository.findOne({ where: { id } });
    if (!type) throw new NotFoundException('Type not found');
    await this.accountTypeRepository.remove(type);
  }

  // AccountStatus CRUD
  async getStatuses(): Promise<AccountStatus[]> {
    return this.accountStatusRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async createStatus(name: string, color?: string): Promise<AccountStatus> {
    const maxOrder = await this.accountStatusRepository
      .createQueryBuilder('status')
      .select('MAX(status.order)', 'max')
      .getRawOne();
    return this.accountStatusRepository.save({ 
      name, 
      color, 
      order: (maxOrder?.max || 0) + 1, 
      isActive: true 
    });
  }

  async updateStatus(id: number, data: Partial<AccountStatus>): Promise<AccountStatus> {
    const status = await this.accountStatusRepository.findOne({ where: { id } });
    if (!status) throw new NotFoundException('Status not found');
    Object.assign(status, data);
    return this.accountStatusRepository.save(status);
  }

  async deleteStatus(id: number): Promise<void> {
    const status = await this.accountStatusRepository.findOne({ where: { id } });
    if (!status) throw new NotFoundException('Status not found');
    await this.accountStatusRepository.remove(status);
  }

  // AccountTier CRUD
  async getTiers(): Promise<AccountTier[]> {
    return this.accountTierRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async createTier(name: string, color?: string): Promise<AccountTier> {
    const maxOrder = await this.accountTierRepository
      .createQueryBuilder('tier')
      .select('MAX(tier.order)', 'max')
      .getRawOne();
    return this.accountTierRepository.save({ 
      name, 
      color, 
      order: (maxOrder?.max || 0) + 1, 
      isActive: true 
    });
  }

  async updateTier(id: number, data: Partial<AccountTier>): Promise<AccountTier> {
    const tier = await this.accountTierRepository.findOne({ where: { id } });
    if (!tier) throw new NotFoundException('Tier not found');
    Object.assign(tier, data);
    return this.accountTierRepository.save(tier);
  }

  async deleteTier(id: number): Promise<void> {
    const tier = await this.accountTierRepository.findOne({ where: { id } });
    if (!tier) throw new NotFoundException('Tier not found');
    await this.accountTierRepository.remove(tier);
  }
}
