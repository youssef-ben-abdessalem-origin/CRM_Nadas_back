"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccountsService", {
    enumerable: true,
    get: function() {
        return AccountsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _accountentity = require("./entities/account.entity");
const _accounttypeentity = require("./entities/account-type.entity");
const _accountstatusentity = require("./entities/account-status.entity");
const _accounttierentity = require("./entities/account-tier.entity");
const _contactentity = require("../contacts/entities/contact.entity");
const _contactstatusentity = require("../contacts/entities/contact-status.entity");
const _contacttierentity = require("../contacts/entities/contact-tier.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AccountsService = class AccountsService {
    async onModuleInit() {
        await this.seedDefaultData();
    }
    async seedDefaultData() {
        const typeCount = await this.accountTypeRepository.count();
        if (typeCount === 0) {
            const defaultTypes = [
                {
                    name: 'Customer',
                    color: '#22c55e',
                    order: 1,
                    isDefault: true
                },
                {
                    name: 'Partner',
                    color: '#3b82f6',
                    order: 2
                },
                {
                    name: 'Prospect',
                    color: '#f59e0b',
                    order: 3
                },
                {
                    name: 'Competitor',
                    color: '#ef4444',
                    order: 4
                }
            ];
            for (const type of defaultTypes){
                await this.accountTypeRepository.save(type);
            }
        }
        const statusCount = await this.accountStatusRepository.count();
        if (statusCount === 0) {
            const defaultStatuses = [
                {
                    name: 'Active',
                    color: '#22c55e',
                    order: 1,
                    isDefault: true
                },
                {
                    name: 'Inactive',
                    color: '#6b7280',
                    order: 2
                },
                {
                    name: 'Churned',
                    color: '#ef4444',
                    order: 3
                }
            ];
            for (const status of defaultStatuses){
                await this.accountStatusRepository.save(status);
            }
        }
        const tierCount = await this.accountTierRepository.count();
        if (tierCount === 0) {
            const defaultTiers = [
                {
                    name: 'Enterprise',
                    color: '#8b5cf6',
                    order: 1
                },
                {
                    name: 'Mid-Market',
                    color: '#3b82f6',
                    order: 2
                },
                {
                    name: 'SMB',
                    color: '#6b7280',
                    order: 3
                }
            ];
            for (const tier of defaultTiers){
                await this.accountTierRepository.save(tier);
            }
        }
    }
    async findAll() {
        return this.accountRepository.find({
            relations: [
                'type',
                'status',
                'tier'
            ]
        });
    }
    async findOne(id) {
        const account = await this.accountRepository.findOne({
            where: {
                id
            },
            relations: [
                'type',
                'status',
                'tier'
            ]
        });
        if (!account) throw new _common.NotFoundException('Account not found');
        return account;
    }
    async create(data) {
        console.log('=== Creating Account ===');
        console.log('Owner from data:', data.owner);
        const account = this.accountRepository.create({
            ...data,
            created: new Date().toISOString().split('T')[0],
            lastActivity: 'Just now',
            avatar: data.name?.substring(0, 2).toUpperCase() || 'XX'
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
    async createContactFromOwner(owner, account) {
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
        const defaultStatus = await this.contactStatusRepository.findOne({
            where: {
                isDefault: true
            }
        });
        const tiers = await this.contactTierRepository.find({
            order: {
                order: 'ASC'
            },
            take: 1
        });
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
            avatar: name.split(' ').map((n)=>n[0]).join('').toUpperCase().substring(0, 2)
        });
        const saved = await this.contactRepository.save(contact);
        console.log('Contact created successfully with ID:', saved.id);
    }
    async update(id, data) {
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
    async delete(id) {
        const account = await this.findOne(id);
        await this.accountRepository.remove(account);
    }
    // AccountType CRUD
    async getTypes() {
        return this.accountTypeRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async createType(name, color) {
        const maxOrder = await this.accountTypeRepository.createQueryBuilder('type').select('MAX(type.order)', 'max').getRawOne();
        return this.accountTypeRepository.save({
            name,
            color,
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async updateType(id, data) {
        const type = await this.accountTypeRepository.findOne({
            where: {
                id
            }
        });
        if (!type) throw new _common.NotFoundException('Type not found');
        Object.assign(type, data);
        return this.accountTypeRepository.save(type);
    }
    async deleteType(id) {
        const type = await this.accountTypeRepository.findOne({
            where: {
                id
            }
        });
        if (!type) throw new _common.NotFoundException('Type not found');
        await this.accountTypeRepository.remove(type);
    }
    // AccountStatus CRUD
    async getStatuses() {
        return this.accountStatusRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async createStatus(name, color) {
        const maxOrder = await this.accountStatusRepository.createQueryBuilder('status').select('MAX(status.order)', 'max').getRawOne();
        return this.accountStatusRepository.save({
            name,
            color,
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async updateStatus(id, data) {
        const status = await this.accountStatusRepository.findOne({
            where: {
                id
            }
        });
        if (!status) throw new _common.NotFoundException('Status not found');
        Object.assign(status, data);
        return this.accountStatusRepository.save(status);
    }
    async deleteStatus(id) {
        const status = await this.accountStatusRepository.findOne({
            where: {
                id
            }
        });
        if (!status) throw new _common.NotFoundException('Status not found');
        await this.accountStatusRepository.remove(status);
    }
    // AccountTier CRUD
    async getTiers() {
        return this.accountTierRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async createTier(name, color) {
        const maxOrder = await this.accountTierRepository.createQueryBuilder('tier').select('MAX(tier.order)', 'max').getRawOne();
        return this.accountTierRepository.save({
            name,
            color,
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async updateTier(id, data) {
        const tier = await this.accountTierRepository.findOne({
            where: {
                id
            }
        });
        if (!tier) throw new _common.NotFoundException('Tier not found');
        Object.assign(tier, data);
        return this.accountTierRepository.save(tier);
    }
    async deleteTier(id) {
        const tier = await this.accountTierRepository.findOne({
            where: {
                id
            }
        });
        if (!tier) throw new _common.NotFoundException('Tier not found');
        await this.accountTierRepository.remove(tier);
    }
    constructor(accountRepository, accountTypeRepository, accountStatusRepository, accountTierRepository, contactRepository, contactStatusRepository, contactTierRepository){
        this.accountRepository = accountRepository;
        this.accountTypeRepository = accountTypeRepository;
        this.accountStatusRepository = accountStatusRepository;
        this.accountTierRepository = accountTierRepository;
        this.contactRepository = contactRepository;
        this.contactStatusRepository = contactStatusRepository;
        this.contactTierRepository = contactTierRepository;
    }
};
AccountsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_accountentity.Account)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_accounttypeentity.AccountType)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_accountstatusentity.AccountStatus)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_accounttierentity.AccountTier)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_contactentity.Contact)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_contactstatusentity.ContactStatus)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_contacttierentity.ContactTier)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], AccountsService);

//# sourceMappingURL=accounts.service.js.map