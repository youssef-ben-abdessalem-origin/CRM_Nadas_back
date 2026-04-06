"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ContactsService", {
    enumerable: true,
    get: function() {
        return ContactsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _contactentity = require("./entities/contact.entity");
const _contactstatusentity = require("./entities/contact-status.entity");
const _contacttierentity = require("./entities/contact-tier.entity");
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
let ContactsService = class ContactsService {
    async onModuleInit() {
        await this.seedDefaultData();
    }
    async seedDefaultData() {
        const statusCount = await this.contactStatusRepository.count();
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
                await this.contactStatusRepository.save(status);
            }
        }
        const tierCount = await this.contactTierRepository.count();
        if (tierCount === 0) {
            const defaultTiers = [
                {
                    name: 'Enterprise',
                    color: '#8b5cf6',
                    order: 1
                },
                {
                    name: 'Professional',
                    color: '#3b82f6',
                    order: 2
                },
                {
                    name: 'Starter',
                    color: '#6b7280',
                    order: 3
                }
            ];
            for (const tier of defaultTiers){
                await this.contactTierRepository.save(tier);
            }
        }
    }
    async findAll() {
        return this.contactRepository.find();
    }
    async findOne(id) {
        const contact = await this.contactRepository.findOne({
            where: {
                id
            }
        });
        if (!contact) throw new _common.NotFoundException('Contact not found');
        return contact;
    }
    async create(data) {
        if (data.email) {
            const existing = await this.contactRepository.findOne({
                where: {
                    email: data.email
                }
            });
            if (existing) {
                throw new Error(`A contact with email "${data.email}" already exists (ID: ${existing.id})`);
            }
        }
        const initials = data.name?.split(' ').map((n)=>n[0]).join('').toUpperCase() || 'XX';
        const contact = this.contactRepository.create({
            ...data,
            lastContact: 'Just now',
            created: new Date().toISOString().split('T')[0],
            avatar: initials
        });
        return (await this.contactRepository.save(contact))[0];
    }
    async update(id, data) {
        const contact = await this.findOne(id);
        Object.assign(contact, data);
        return (await this.contactRepository.save(contact))[0];
    }
    async delete(id) {
        const contact = await this.findOne(id);
        await this.contactRepository.remove(contact);
    }
    async bulkDelete(ids) {
        await this.contactRepository.delete(ids);
    }
    async bulkUpdate(ids, updates) {
        await this.contactRepository.update(ids, updates);
        return this.contactRepository.findByIds(ids);
    }
    // ContactStatus CRUD
    async getStatuses() {
        return this.contactStatusRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async createStatus(name, color) {
        const maxOrder = await this.contactStatusRepository.createQueryBuilder('status').select('MAX(status.order)', 'max').getRawOne();
        return this.contactStatusRepository.save({
            name,
            color,
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async updateStatus(id, data) {
        const status = await this.contactStatusRepository.findOne({
            where: {
                id
            }
        });
        if (!status) throw new _common.NotFoundException('Status not found');
        Object.assign(status, data);
        return this.contactStatusRepository.save(status);
    }
    async deleteStatus(id) {
        const status = await this.contactStatusRepository.findOne({
            where: {
                id
            }
        });
        if (!status) throw new _common.NotFoundException('Status not found');
        await this.contactStatusRepository.remove(status);
    }
    // ContactTier CRUD
    async getTiers() {
        return this.contactTierRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async createTier(name, color) {
        const maxOrder = await this.contactTierRepository.createQueryBuilder('tier').select('MAX(tier.order)', 'max').getRawOne();
        return this.contactTierRepository.save({
            name,
            color,
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async updateTier(id, data) {
        const tier = await this.contactTierRepository.findOne({
            where: {
                id
            }
        });
        if (!tier) throw new _common.NotFoundException('Tier not found');
        Object.assign(tier, data);
        return this.contactTierRepository.save(tier);
    }
    async deleteTier(id) {
        const tier = await this.contactTierRepository.findOne({
            where: {
                id
            }
        });
        if (!tier) throw new _common.NotFoundException('Tier not found');
        await this.contactTierRepository.remove(tier);
    }
    constructor(contactRepository, contactStatusRepository, contactTierRepository){
        this.contactRepository = contactRepository;
        this.contactStatusRepository = contactStatusRepository;
        this.contactTierRepository = contactTierRepository;
    }
};
ContactsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_contactentity.Contact)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_contactstatusentity.ContactStatus)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_contacttierentity.ContactTier)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ContactsService);

//# sourceMappingURL=contacts.service.js.map