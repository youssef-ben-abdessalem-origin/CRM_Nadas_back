"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DealsService", {
    enumerable: true,
    get: function() {
        return DealsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _dealentity = require("./entities/deal.entity");
const _dealstageentity = require("./entities/deal-stage.entity");
const _dealreasonentity = require("./entities/deal-reason.entity");
const _automationsservice = require("../automations/automations.service");
const _contactentity = require("../contacts/entities/contact.entity");
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
let DealsService = class DealsService {
    async onModuleInit() {
        await this.seedDefaultData();
        await this.syncAllContacts();
    }
    /**
   * One-time synchronization to ensure all contacts have accurate deal stats.
   */ async syncAllContacts() {
        const contacts = await this.contactRepository.find();
        for (const contact of contacts){
            await this.recalculateContactStats(contact.id);
        }
    }
    async seedDefaultData() {
        const stageCount = await this.dealStageRepository.count();
        if (stageCount === 0) {
            const defaultStages = [
                {
                    name: 'Qualification',
                    color: '#6366f1',
                    order: 1,
                    isDefault: true
                },
                {
                    name: 'Discovery',
                    color: '#8b5cf6',
                    order: 2
                },
                {
                    name: 'Proposal',
                    color: '#f59e0b',
                    order: 3
                },
                {
                    name: 'Negotiation',
                    color: '#3b82f6',
                    order: 4
                },
                {
                    name: 'Closed Won',
                    color: '#22c55e',
                    order: 5
                },
                {
                    name: 'Closed Lost',
                    color: '#ef4444',
                    order: 6
                }
            ];
            for (const stage of defaultStages){
                await this.dealStageRepository.save(stage);
            }
        }
        const reasonCount = await this.dealReasonRepository.count();
        if (reasonCount === 0) {
            const defaultReasons = [
                {
                    name: 'Price',
                    color: '#f59e0b',
                    order: 1,
                    type: 'lost',
                    isDefault: true
                },
                {
                    name: 'Competition',
                    color: '#ef4444',
                    order: 2,
                    type: 'lost'
                },
                {
                    name: 'No Budget',
                    color: '#dc2626',
                    order: 3,
                    type: 'lost'
                },
                {
                    name: 'No Decision',
                    color: '#6b7280',
                    order: 4,
                    type: 'lost'
                },
                {
                    name: 'Bad Fit',
                    color: '#a855f7',
                    order: 5,
                    type: 'lost'
                },
                {
                    name: 'Timeline',
                    color: '#3b82f6',
                    order: 6,
                    type: 'lost'
                },
                {
                    name: 'Won - Best Value',
                    color: '#22c55e',
                    order: 1,
                    type: 'win'
                },
                {
                    name: 'Won - Best Product',
                    color: '#22c55e',
                    order: 2,
                    type: 'win'
                },
                {
                    name: 'Won - Relationship',
                    color: '#22c55e',
                    order: 3,
                    type: 'win'
                },
                {
                    name: 'Won - Timing',
                    color: '#22c55e',
                    order: 4,
                    type: 'win'
                }
            ];
            for (const reason of defaultReasons){
                await this.dealReasonRepository.save(reason);
            }
        }
    }
    async findAll() {
        return this.dealRepository.find({
            relations: [
                'stage',
                'reason',
                'campaign'
            ]
        });
    }
    async findByContact(contactId) {
        return this.dealRepository.find({
            where: {
                contactId
            },
            relations: [
                'stage',
                'reason',
                'campaign'
            ],
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async findByAccount(accountId) {
        return this.dealRepository.find({
            where: {
                accountId
            },
            relations: [
                'stage',
                'reason',
                'campaign'
            ],
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async findByLead(leadId) {
        return this.dealRepository.find({
            where: {
                leadId
            },
            relations: [
                'stage',
                'reason',
                'campaign'
            ],
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async findOne(id) {
        const deal = await this.dealRepository.findOne({
            where: {
                id
            },
            relations: [
                'stage',
                'reason',
                'campaign'
            ]
        });
        if (!deal) throw new _common.NotFoundException('Deal not found');
        return deal;
    }
    async create(data, actorUserId) {
        const deal = this.dealRepository.create({
            ...data,
            daysInStage: 0
        });
        const saved = await this.dealRepository.save(deal);
        const hydrated = await this.findOne(saved.id);
        await this.automationsService.processEvent('deal', 'created', hydrated, actorUserId);
        if (hydrated.contactId) {
            await this.recalculateContactStats(hydrated.contactId);
        }
        return hydrated;
    }
    async update(id, data, actorUserId) {
        const deal = await this.findOne(id);
        // Clear relations if their ID columns are being updated to avoid persistence conflicts
        if (data.dealStageId !== undefined && deal.stage && deal.stage.id !== data.dealStageId) {
            deal.stage = null;
        }
        if (data.dealReasonId !== undefined && deal.reason && deal.reason.id !== data.dealReasonId) {
            deal.reason = null;
        }
        if (data.ownerId !== undefined && deal.owner && deal.owner.id !== data.ownerId) {
            deal.owner = null;
        }
        if (data.leadId !== undefined && deal.lead && deal.lead.id !== data.leadId) {
            deal.lead = null;
        }
        if (data.accountId !== undefined && deal.account && deal.account.id !== data.accountId) {
            deal.account = null;
        }
        if (data.contactId !== undefined && deal.contactEntity && deal.contactEntity.id !== data.contactId) {
            deal.contactEntity = null;
        }
        Object.assign(deal, data);
        await this.dealRepository.save(deal);
        const updated = await this.findOne(id);
        await this.automationsService.processEvent('deal', 'updated', updated, actorUserId);
        if (updated.contactId) {
            await this.recalculateContactStats(updated.contactId);
        }
        // If the contact was changed, update the old one too
        if (deal.contactId && deal.contactId !== updated.contactId) {
            await this.recalculateContactStats(deal.contactId);
        }
        return updated;
    }
    async delete(id) {
        const deal = await this.findOne(id);
        const contactId = deal.contactId;
        await this.dealRepository.remove(deal);
        if (contactId) {
            await this.recalculateContactStats(contactId);
        }
    }
    // DealStage CRUD
    async getStages() {
        return this.dealStageRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async createStage(name, color) {
        const maxOrder = await this.dealStageRepository.createQueryBuilder('stage').select('MAX(stage.order)', 'max').getRawOne();
        return this.dealStageRepository.save({
            name,
            color,
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async updateStage(id, data) {
        const stage = await this.dealStageRepository.findOne({
            where: {
                id
            }
        });
        if (!stage) throw new _common.NotFoundException('Stage not found');
        Object.assign(stage, data);
        return this.dealStageRepository.save(stage);
    }
    async deleteStage(id) {
        const stage = await this.dealStageRepository.findOne({
            where: {
                id
            }
        });
        if (!stage) throw new _common.NotFoundException('Stage not found');
        await this.dealStageRepository.remove(stage);
    }
    // DealReason CRUD
    async getReasons(type) {
        const where = type ? {
            isActive: true,
            type
        } : {
            isActive: true
        };
        return this.dealReasonRepository.find({
            where,
            order: {
                order: 'ASC'
            }
        });
    }
    async createReason(name, color, type) {
        const maxOrder = await this.dealReasonRepository.createQueryBuilder('reason').select('MAX(reason.order)', 'max').getRawOne();
        return this.dealReasonRepository.save({
            name,
            color,
            type: type || 'lost',
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async updateReason(id, data) {
        const reason = await this.dealReasonRepository.findOne({
            where: {
                id
            }
        });
        if (!reason) throw new _common.NotFoundException('Reason not found');
        Object.assign(reason, data);
        return this.dealReasonRepository.save(reason);
    }
    async deleteReason(id) {
        const reason = await this.dealReasonRepository.findOne({
            where: {
                id
            }
        });
        if (!reason) throw new _common.NotFoundException('Reason not found');
        await this.dealReasonRepository.remove(reason);
    }
    /**
   * Recalculates statistics for a contact based on their deals.
   */ async recalculateContactStats(contactId) {
        const deals = await this.dealRepository.find({
            where: {
                contactId
            },
            relations: [
                'stage'
            ]
        });
        const dealsTotal = deals.length;
        const dealsWon = deals.filter((d)=>d.stage?.name?.toLowerCase().includes('won')).length;
        const revenueTotal = deals.filter((d)=>d.stage?.name?.toLowerCase().includes('won')).reduce((sum, d)=>sum + Number(d.value || 0), 0);
        await this.contactRepository.update(contactId, {
            dealsTotal,
            dealsWon,
            revenueTotal
        });
    }
    constructor(dealRepository, dealStageRepository, dealReasonRepository, contactRepository, automationsService){
        this.dealRepository = dealRepository;
        this.dealStageRepository = dealStageRepository;
        this.dealReasonRepository = dealReasonRepository;
        this.contactRepository = contactRepository;
        this.automationsService = automationsService;
    }
};
DealsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_dealentity.Deal)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_dealstageentity.DealStage)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_dealreasonentity.DealReason)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_contactentity.Contact)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _automationsservice.AutomationsService === "undefined" ? Object : _automationsservice.AutomationsService
    ])
], DealsService);

//# sourceMappingURL=deals.service.js.map