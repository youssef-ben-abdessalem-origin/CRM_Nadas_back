import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { ContactStatus } from './entities/contact-status.entity';
import { ContactTier } from './entities/contact-tier.entity';

@Injectable()
export class ContactsService implements OnModuleInit {
  constructor(
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
    const statusCount = await this.contactStatusRepository.count();
    if (statusCount === 0) {
      const defaultStatuses = [
        { name: 'Active', color: '#22c55e', order: 1, isDefault: true },
        { name: 'Inactive', color: '#6b7280', order: 2 },
        { name: 'Churned', color: '#ef4444', order: 3 },
      ];
      for (const status of defaultStatuses) {
        await this.contactStatusRepository.save(status);
      }
    }

    const tierCount = await this.contactTierRepository.count();
    if (tierCount === 0) {
      const defaultTiers = [
        { name: 'Enterprise', color: '#8b5cf6', order: 1 },
        { name: 'Professional', color: '#3b82f6', order: 2 },
        { name: 'Starter', color: '#6b7280', order: 3 },
      ];
      for (const tier of defaultTiers) {
        await this.contactTierRepository.save(tier);
      }
    }
  }

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async create(data: Partial<Contact>): Promise<Contact> {
    if (data.email) {
      const existing = await this.contactRepository.findOne({ where: { email: data.email } });
      if (existing) {
        throw new Error(`A contact with email "${data.email}" already exists (ID: ${existing.id})`);
      }
    }
    const initials = data.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'XX';
    const contact = this.contactRepository.create({
      ...data,
      lastContact: 'Just now',
      created: new Date().toISOString().split('T')[0],
      avatar: initials,
    });
    return await this.contactRepository.save(contact);
  }

  async update(id: number, data: Partial<Contact>): Promise<Contact> {
    const contact = await this.findOne(id);
    Object.assign(contact, data);
    return await this.contactRepository.save(contact);
  }

  async delete(id: number): Promise<void> {
    const contact = await this.findOne(id);
    await this.contactRepository.remove(contact);
  }

  async bulkDelete(ids: number[]): Promise<void> {
    await this.contactRepository.delete(ids);
  }

  async bulkUpdate(ids: number[], updates: Partial<Contact>): Promise<Contact[]> {
    await this.contactRepository.update(ids, updates);
    return this.contactRepository.findByIds(ids);
  }

  // ContactStatus CRUD
  async getStatuses(): Promise<ContactStatus[]> {
    return this.contactStatusRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async createStatus(name: string, color?: string): Promise<ContactStatus> {
    const maxOrder = await this.contactStatusRepository
      .createQueryBuilder('status')
      .select('MAX(status.order)', 'max')
      .getRawOne();
    return this.contactStatusRepository.save({ 
      name, 
      color, 
      order: (maxOrder?.max || 0) + 1, 
      isActive: true 
    });
  }

  async updateStatus(id: number, data: Partial<ContactStatus>): Promise<ContactStatus> {
    const status = await this.contactStatusRepository.findOne({ where: { id } });
    if (!status) throw new NotFoundException('Status not found');
    Object.assign(status, data);
    return this.contactStatusRepository.save(status);
  }

  async deleteStatus(id: number): Promise<void> {
    const status = await this.contactStatusRepository.findOne({ where: { id } });
    if (!status) throw new NotFoundException('Status not found');
    await this.contactStatusRepository.remove(status);
  }

  // ContactTier CRUD
  async getTiers(): Promise<ContactTier[]> {
    return this.contactTierRepository.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  async createTier(name: string, color?: string): Promise<ContactTier> {
    const maxOrder = await this.contactTierRepository
      .createQueryBuilder('tier')
      .select('MAX(tier.order)', 'max')
      .getRawOne();
    return this.contactTierRepository.save({ 
      name, 
      color, 
      order: (maxOrder?.max || 0) + 1, 
      isActive: true 
    });
  }

  async updateTier(id: number, data: Partial<ContactTier>): Promise<ContactTier> {
    const tier = await this.contactTierRepository.findOne({ where: { id } });
    if (!tier) throw new NotFoundException('Tier not found');
    Object.assign(tier, data);
    return this.contactTierRepository.save(tier);
  }

  async deleteTier(id: number): Promise<void> {
    const tier = await this.contactTierRepository.findOne({ where: { id } });
    if (!tier) throw new NotFoundException('Tier not found');
    await this.contactTierRepository.remove(tier);
  }
}
