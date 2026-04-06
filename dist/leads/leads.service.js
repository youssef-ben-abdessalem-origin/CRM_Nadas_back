"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LeadsService", {
    enumerable: true,
    get: function() {
        return LeadsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _leadentity = require("./entities/lead.entity");
const _leadsourceentity = require("./entities/lead-source.entity");
const _pipelinestageentity = require("./entities/pipeline-stage.entity");
const _leadscorecategoryentity = require("./entities/lead-score-category.entity");
const _leadpriorityentity = require("./entities/lead-priority.entity");
const _qualificationstageentity = require("./entities/qualification-stage.entity");
const _accountsservice = require("../accounts/accounts.service");
const _contactsservice = require("../contacts/contacts.service");
const _dealsservice = require("../deals/deals.service");
const _dealstageentity = require("../deals/entities/deal-stage.entity");
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
let LeadsService = class LeadsService {
    async onModuleInit() {
        await this.seedDefaultData();
    }
    async seedDefaultData() {
        const sourcesCount = await this.leadSourceRepository.count();
        if (sourcesCount === 0) {
            const defaultSources = [
                'Website',
                'LinkedIn',
                'Referral',
                'Cold Call',
                'Trade Show',
                'Google Ads',
                'Email Campaign'
            ];
            for (const name of defaultSources){
                await this.leadSourceRepository.save({
                    name,
                    isActive: true
                });
            }
        }
        const stagesCount = await this.pipelineStageRepository.count();
        if (stagesCount === 0) {
            const defaultStages = [
                {
                    name: 'New',
                    order: 1,
                    isDefault: true
                },
                {
                    name: 'Contacted',
                    order: 2
                },
                {
                    name: 'Qualified',
                    order: 3
                },
                {
                    name: 'Unqualified',
                    order: 4
                }
            ];
            for (const stage of defaultStages){
                await this.pipelineStageRepository.save(stage);
            }
        }
        const scoresCount = await this.scoreCategoryRepository.count();
        if (scoresCount === 0) {
            const defaultScores = [
                {
                    name: 'Hot',
                    color: '#ef4444',
                    order: 1
                },
                {
                    name: 'Warm',
                    color: '#f59e0b',
                    order: 2
                },
                {
                    name: 'Cold',
                    color: '#3b82f6',
                    order: 3
                }
            ];
            for (const score of defaultScores){
                await this.scoreCategoryRepository.save(score);
            }
        }
        const prioritiesCount = await this.priorityRepository.count();
        if (prioritiesCount === 0) {
            const defaultPriorities = [
                {
                    name: 'Low',
                    color: '#6b7280',
                    order: 1
                },
                {
                    name: 'Medium',
                    color: '#3b82f6',
                    order: 2
                },
                {
                    name: 'High',
                    color: '#f59e0b',
                    order: 3
                },
                {
                    name: 'Urgent',
                    color: '#ef4444',
                    order: 4
                }
            ];
            for (const priority of defaultPriorities){
                await this.priorityRepository.save(priority);
            }
        }
        const qualificationsCount = await this.qualificationStageRepository.count();
        if (qualificationsCount === 0) {
            const defaultQualifications = [
                {
                    name: 'Not Qualified',
                    order: 1
                },
                {
                    name: 'In Progress',
                    order: 2
                },
                {
                    name: 'Qualified',
                    order: 3
                }
            ];
            for (const qual of defaultQualifications){
                await this.qualificationStageRepository.save(qual);
            }
        }
    }
    async findAll() {
        return this.leadRepository.find({
            relations: [
                'source',
                'stage',
                'scoreCategory',
                'priority',
                'qualificationStage',
                'assignedTo',
                'account'
            ]
        });
    }
    async findAllPaginated(page = 1, limit = 10, search, stageId) {
        const queryBuilder = this.leadRepository.createQueryBuilder('lead').leftJoinAndSelect('lead.assignedTo', 'assignedTo').leftJoinAndSelect('lead.source', 'source').leftJoinAndSelect('lead.stage', 'stage').leftJoinAndSelect('lead.scoreCategory', 'scoreCategory').leftJoinAndSelect('lead.priority', 'priority').leftJoinAndSelect('lead.qualificationStage', 'qualificationStage');
        if (search) {
            queryBuilder.andWhere('(lead.name ILIKE :search OR lead.email ILIKE :search OR lead.company ILIKE :search)', {
                search: `%${search}%`
            });
        }
        if (stageId) {
            queryBuilder.andWhere('lead.stageId = :stageId', {
                stageId
            });
        }
        const total = await queryBuilder.getCount();
        const data = await queryBuilder.orderBy('lead.created', 'DESC').skip((page - 1) * limit).take(limit).getMany();
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    async findOne(id) {
        const lead = await this.leadRepository.findOne({
            where: {
                id
            },
            relations: [
                'source',
                'stage',
                'scoreCategory',
                'priority',
                'qualificationStage',
                'assignedTo',
                'account'
            ]
        });
        if (!lead) throw new _common.NotFoundException('Lead not found');
        return lead;
    }
    async create(data) {
        if (data.email) {
            const existing = await this.leadRepository.findOne({
                where: {
                    email: data.email
                }
            });
            if (existing) {
                throw new Error(`A lead with email "${data.email}" already exists (ID: ${existing.id})`);
            }
        }
        const leadData = {
            ...data
        };
        leadData.created = new Date();
        leadData.lastActivity = 'Just now';
        if (leadData.priorityId) {
            const priority = await this.priorityRepository.findOne({
                where: {
                    id: leadData.priorityId
                }
            });
            if (!priority) throw new _common.NotFoundException('Priority not found');
        }
        if (leadData.stageId && !await this.pipelineStageRepository.findOne({
            where: {
                id: leadData.stageId
            }
        })) {
            throw new _common.NotFoundException('Stage not found');
        }
        // Handle account: link to existing or create new
        if (leadData.accountId) {
            // Link to existing account
            const account = await this.accountsService.findOne(leadData.accountId);
            leadData.accountId = account.id;
        } else if (leadData.company) {
            // Check if account with same name exists
            const existingAccounts = await this.accountsService.findAll();
            const existingAccount = existingAccounts.find((a)=>a.name.toLowerCase() === leadData.company.toLowerCase());
            if (existingAccount) {
                // Link to existing account
                leadData.accountId = existingAccount.id;
            } else {
                // Create new account
                const newAccount = await this.accountsService.create({
                    name: leadData.company,
                    website: leadData.website,
                    industry: leadData.industry,
                    location: leadData.location
                });
                leadData.accountId = Array.isArray(newAccount) ? newAccount[0].id : newAccount.id;
            }
        }
        const lead = this.leadRepository.create(leadData);
        return await this.leadRepository.save(lead);
    }
    async update(id, data) {
        const lead = await this.findOne(id);
        const wasWon = lead.stage?.name?.toLowerCase().includes('won');
        const isNowWon = data.stageId && (await this.pipelineStageRepository.findOne({
            where: {
                id: data.stageId
            }
        }))?.name?.toLowerCase().includes('won');
        await this.leadRepository.update(id, {
            ...data,
            lastActivity: 'Just now'
        });
        if (!wasWon && isNowWon) {
            const wonStage = await this.pipelineStageRepository.findOne({
                where: {
                    name: 'Closed Won'
                }
            });
            await this.dealsService.create({
                name: `${lead.name} - Deal`,
                company: lead.company,
                value: lead.value,
                contact: lead.email,
                leadId: lead.id,
                dealStageId: wonStage?.id,
                notes: `Created from lead: ${lead.name}. ${lead.notes || ''}`
            });
        }
        return this.findOne(id);
    }
    async delete(id) {
        const lead = await this.findOne(id);
        await this.leadRepository.remove(lead);
    }
    async bulkDelete(ids) {
        await this.leadRepository.delete(ids);
    }
    async bulkUpdate(ids, updates) {
        await this.leadRepository.update(ids, updates);
        return this.leadRepository.findByIds(ids);
    }
    async getSources() {
        return this.leadSourceRepository.find({
            where: {
                isActive: true
            }
        });
    }
    async getStages() {
        return this.pipelineStageRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async getScores() {
        return this.scoreCategoryRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async getPriorities() {
        return this.priorityRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async getQualifications() {
        return this.qualificationStageRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async createSource(name) {
        return this.leadSourceRepository.save({
            name,
            isActive: true
        });
    }
    async createStage(name, order) {
        const maxOrder = await this.pipelineStageRepository.createQueryBuilder('stage').select('MAX(stage.order)', 'max').getRawOne();
        return this.pipelineStageRepository.save({
            name,
            order: order ?? (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async createScore(name, color) {
        const maxOrder = await this.scoreCategoryRepository.createQueryBuilder('score').select('MAX(score.order)', 'max').getRawOne();
        return this.scoreCategoryRepository.save({
            name,
            color,
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async createPriority(name, color) {
        const maxOrder = await this.priorityRepository.createQueryBuilder('priority').select('MAX(priority.order)', 'max').getRawOne();
        return this.priorityRepository.save({
            name,
            color,
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async createQualification(name) {
        const maxOrder = await this.qualificationStageRepository.createQueryBuilder('qual').select('MAX(qual.order)', 'max').getRawOne();
        return this.qualificationStageRepository.save({
            name,
            order: (maxOrder?.max || 0) + 1,
            isActive: true
        });
    }
    async updateSource(id, data) {
        const source = await this.leadSourceRepository.findOne({
            where: {
                id
            }
        });
        if (!source) throw new _common.NotFoundException('Source not found');
        Object.assign(source, data);
        return this.leadSourceRepository.save(source);
    }
    async deleteSource(id) {
        const source = await this.leadSourceRepository.findOne({
            where: {
                id
            }
        });
        if (!source) throw new _common.NotFoundException('Source not found');
        await this.leadSourceRepository.remove(source);
    }
    async updateStage(id, data) {
        const stage = await this.pipelineStageRepository.findOne({
            where: {
                id
            }
        });
        if (!stage) throw new _common.NotFoundException('Stage not found');
        Object.assign(stage, data);
        return this.pipelineStageRepository.save(stage);
    }
    async deleteStage(id) {
        const stage = await this.pipelineStageRepository.findOne({
            where: {
                id
            }
        });
        if (!stage) throw new _common.NotFoundException('Stage not found');
        await this.pipelineStageRepository.remove(stage);
    }
    async updateScore(id, data) {
        const score = await this.scoreCategoryRepository.findOne({
            where: {
                id
            }
        });
        if (!score) throw new _common.NotFoundException('Score not found');
        Object.assign(score, data);
        return this.scoreCategoryRepository.save(score);
    }
    async deleteScore(id) {
        const score = await this.scoreCategoryRepository.findOne({
            where: {
                id
            }
        });
        if (!score) throw new _common.NotFoundException('Score not found');
        await this.scoreCategoryRepository.remove(score);
    }
    async updatePriority(id, data) {
        const priority = await this.priorityRepository.findOne({
            where: {
                id
            }
        });
        if (!priority) throw new _common.NotFoundException('Priority not found');
        Object.assign(priority, data);
        return this.priorityRepository.save(priority);
    }
    async deletePriority(id) {
        const priority = await this.priorityRepository.findOne({
            where: {
                id
            }
        });
        if (!priority) throw new _common.NotFoundException('Priority not found');
        await this.priorityRepository.remove(priority);
    }
    async updateQualification(id, data) {
        const qualification = await this.qualificationStageRepository.findOne({
            where: {
                id
            }
        });
        if (!qualification) throw new _common.NotFoundException('Qualification not found');
        Object.assign(qualification, data);
        return this.qualificationStageRepository.save(qualification);
    }
    async deleteQualification(id) {
        const qualification = await this.qualificationStageRepository.findOne({
            where: {
                id
            }
        });
        if (!qualification) throw new _common.NotFoundException('Qualification not found');
        await this.qualificationStageRepository.remove(qualification);
    }
    async getAllSources(includeInactive = false) {
        return this.leadSourceRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            }
        });
    }
    async getAllStages(includeInactive = false) {
        return this.pipelineStageRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async getAllScores(includeInactive = false) {
        return this.scoreCategoryRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async getAllPriorities(includeInactive = false) {
        return this.priorityRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async getAllQualifications(includeInactive = false) {
        return this.qualificationStageRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async convert(id) {
        const lead = await this.findOne(id);
        if (lead.isConverted) {
            throw new Error('Lead is already converted');
        }
        // Find or create Account from company name
        let accountId;
        if (lead.company) {
            const existingAccount = await this.accountsService.findAll().then((accounts)=>accounts.find((a)=>a.name.toLowerCase() === lead.company.toLowerCase()));
            if (existingAccount) {
                accountId = existingAccount.id;
            } else {
                const account = await this.accountsService.create({
                    name: lead.company,
                    website: lead.website,
                    industry: lead.industry,
                    location: lead.location
                });
                accountId = Array.isArray(account) ? account[0].id : account.id;
            }
        } else {
            // Create a generic account if no company
            const account = await this.accountsService.create({
                name: lead.name + "'s Company",
                industry: lead.industry,
                location: lead.location
            });
            accountId = Array.isArray(account) ? account[0].id : account.id;
        }
        // Get default contact status and tier
        const defaultStatus = await this.contactStatusRepository.findOne({
            where: {
                isDefault: true
            }
        });
        const defaultTier = await this.contactTierRepository.find({
            order: {
                order: 'ASC'
            },
            take: 1
        }).then((tiers)=>tiers[0]);
        // Create Contact linked to Account
        const contact = await this.contactsService.create({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            title: lead.title,
            company: lead.company,
            account: {
                id: accountId
            },
            contactStatusId: defaultStatus?.id,
            contactTierId: defaultTier?.id,
            dealValue: lead.value || 0,
            industry: lead.industry,
            location: lead.location,
            website: lead.website,
            notes: lead.notes
        });
        const contactId = Array.isArray(contact) ? contact[0].id : contact.id;
        // Mark lead as converted
        lead.isConverted = true;
        lead.convertedAt = new Date();
        lead.convertedAccountId = accountId;
        lead.convertedContactId = contactId;
        await this.leadRepository.save(lead);
        return {
            lead: lead,
            accountId: accountId,
            contactId: contactId
        };
    }
    async convertToDeal(id) {
        const lead = await this.findOne(id);
        if (lead.isConverted) {
            throw new Error('Lead is already converted');
        }
        // Get default deal stage
        const defaultStage = await this.dealStageRepository.findOne({
            where: {
                isDefault: true
            }
        });
        // Create a deal from the lead
        const deal = await this.dealsService.create({
            name: `${lead.name} - Deal`,
            company: lead.company,
            value: lead.value || 0,
            contact: lead.email,
            leadId: lead.id,
            dealStageId: defaultStage?.id,
            notes: `Created from lead: ${lead.name}. ${lead.notes || ''}`
        });
        // Mark lead as converted
        lead.isConverted = true;
        lead.convertedAt = new Date();
        await this.leadRepository.save(lead);
        return {
            dealId: deal.id
        };
    }
    constructor(leadRepository, leadSourceRepository, pipelineStageRepository, scoreCategoryRepository, priorityRepository, qualificationStageRepository, contactStatusRepository, contactTierRepository, dealStageRepository, accountsService, contactsService, dealsService){
        this.leadRepository = leadRepository;
        this.leadSourceRepository = leadSourceRepository;
        this.pipelineStageRepository = pipelineStageRepository;
        this.scoreCategoryRepository = scoreCategoryRepository;
        this.priorityRepository = priorityRepository;
        this.qualificationStageRepository = qualificationStageRepository;
        this.contactStatusRepository = contactStatusRepository;
        this.contactTierRepository = contactTierRepository;
        this.dealStageRepository = dealStageRepository;
        this.accountsService = accountsService;
        this.contactsService = contactsService;
        this.dealsService = dealsService;
    }
};
LeadsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_leadentity.Lead)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_leadsourceentity.LeadSource)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_pipelinestageentity.PipelineStage)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_leadscorecategoryentity.LeadScoreCategory)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_leadpriorityentity.LeadPriority)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_qualificationstageentity.QualificationStage)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_contactstatusentity.ContactStatus)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_contacttierentity.ContactTier)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_dealstageentity.DealStage)),
    _ts_param(9, (0, _common.Inject)((0, _common.forwardRef)(()=>_accountsservice.AccountsService))),
    _ts_param(10, (0, _common.Inject)((0, _common.forwardRef)(()=>_contactsservice.ContactsService))),
    _ts_param(11, (0, _common.Inject)((0, _common.forwardRef)(()=>_dealsservice.DealsService))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _accountsservice.AccountsService === "undefined" ? Object : _accountsservice.AccountsService,
        typeof _contactsservice.ContactsService === "undefined" ? Object : _contactsservice.ContactsService,
        typeof _dealsservice.DealsService === "undefined" ? Object : _dealsservice.DealsService
    ])
], LeadsService);

//# sourceMappingURL=leads.service.js.map