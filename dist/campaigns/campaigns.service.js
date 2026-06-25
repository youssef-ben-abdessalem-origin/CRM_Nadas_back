"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CampaignsService", {
    enumerable: true,
    get: function() {
        return CampaignsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _campaignentity = require("./entities/campaign.entity");
const _campaigntypeentity = require("./entities/campaign-type.entity");
const _campaignstatusentity = require("./entities/campaign-status.entity");
const _leadentity = require("../leads/entities/lead.entity");
const _dealentity = require("../deals/entities/deal.entity");
const _activityentity = require("../activities/entities/activity.entity");
const _gmailservice = require("../gmail/gmail.service");
const _leadsservice = require("../leads/leads.service");
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
let CampaignsService = class CampaignsService {
    async onModuleInit() {
        await this.seedDefaultData();
    }
    async seedDefaultData() {
        const typeCount = await this.campaignTypeRepository.count();
        if (typeCount <= 12) {
            try {
                await this.campaignRepository.update({}, {
                    campaignTypeId: null
                });
                await this.campaignTypeRepository.clear();
            } catch (err) {
                console.error('Failed to clear campaign types', err);
            }
            const types = [
                {
                    name: 'Email',
                    order: 1
                },
                {
                    name: 'SMS',
                    order: 2
                },
                {
                    name: 'WhatsApp',
                    order: 3
                },
                {
                    name: 'Social Media',
                    order: 4
                },
                {
                    name: 'Event',
                    order: 5
                },
                {
                    name: 'Advertisement',
                    order: 6
                },
                {
                    name: 'Others',
                    order: 7
                }
            ];
            for (const t of types){
                await this.campaignTypeRepository.save(t);
            }
        }
        const statusCount = await this.campaignStatusRepository.count();
        if (statusCount <= 4) {
            try {
                await this.campaignRepository.update({}, {
                    statusId: null
                });
                await this.campaignStatusRepository.clear();
            } catch (err) {
                console.error('Failed to clear campaign statuses', err);
            }
            const statuses = [
                {
                    name: 'Draft',
                    order: 1
                },
                {
                    name: 'Scheduled',
                    order: 2
                },
                {
                    name: 'Running',
                    order: 3
                },
                {
                    name: 'Paused',
                    order: 4
                },
                {
                    name: 'Completed',
                    order: 5
                },
                {
                    name: 'Cancelled',
                    order: 6
                }
            ];
            for (const s of statuses){
                await this.campaignStatusRepository.save(s);
            }
        }
    }
    async recalculateCampaignStats(campaignId) {
        const totalLeads = await this.leadRepository.count({
            where: {
                campaignId
            }
        });
        const convertedLeads = await this.leadRepository.count({
            where: {
                campaignId,
                isConverted: true
            }
        });
        const conversionRate = totalLeads > 0 ? parseFloat((convertedLeads / totalLeads * 100).toFixed(2)) : 0;
        await this.campaignRepository.update(campaignId, {
            leadsGenerated: totalLeads,
            conversionRate
        });
    }
    async findAll() {
        const campaigns = await this.campaignRepository.find({
            relations: [
                'owner',
                'campaignType',
                'status'
            ]
        });
        for (const c of campaigns){
            const totalLeads = await this.leadRepository.count({
                where: {
                    campaignId: c.id
                }
            });
            const convertedLeads = await this.leadRepository.count({
                where: {
                    campaignId: c.id,
                    isConverted: true
                }
            });
            c.leadsGenerated = totalLeads;
            c.conversionRate = totalLeads > 0 ? parseFloat((convertedLeads / totalLeads * 100).toFixed(2)) : 0;
        }
        return campaigns;
    }
    async findOne(id) {
        await this.recalculateCampaignStats(id);
        const campaign = await this.campaignRepository.findOne({
            where: {
                id
            },
            relations: [
                'owner',
                'campaignType',
                'status'
            ]
        });
        if (!campaign) throw new _common.NotFoundException('Campaign not found');
        const leads = await this.leadRepository.find({
            where: {
                campaignId: id
            },
            relations: [
                'source',
                'stage',
                'scoreCategory',
                'priority',
                'qualificationStage'
            ]
        });
        const deals = await this.dealRepository.find({
            where: {
                campaignId: id
            },
            relations: [
                'stage',
                'reason'
            ]
        });
        return {
            ...campaign,
            leads,
            deals
        };
    }
    async create(data) {
        const campaignData = {
            ...data
        };
        if (!campaignData.campaignCode) {
            const count = await this.campaignRepository.count();
            const codeNum = String(count + 1).padStart(3, '0');
            const year = new Date().getFullYear();
            campaignData.campaignCode = `CMP-${year}-${codeNum}`;
        }
        const campaign = this.campaignRepository.create(campaignData);
        return this.campaignRepository.save(campaign);
    }
    async update(id, data) {
        const campaign = await this.campaignRepository.findOne({
            where: {
                id
            }
        });
        if (!campaign) throw new _common.NotFoundException('Campaign not found');
        Object.assign(campaign, data);
        const saved = await this.campaignRepository.save(campaign);
        await this.recalculateCampaignStats(id);
        return saved;
    }
    async delete(id) {
        const campaign = await this.campaignRepository.findOne({
            where: {
                id
            }
        });
        if (!campaign) throw new _common.NotFoundException('Campaign not found');
        await this.campaignRepository.remove(campaign);
    }
    async getTypes() {
        return this.campaignTypeRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async getStatuses() {
        return this.campaignStatusRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: 'ASC'
            }
        });
    }
    async addRecipients(id, leadIds) {
        if (leadIds && leadIds.length > 0) {
            await this.leadRepository.update({
                id: (0, _typeorm1.In)(leadIds)
            }, {
                campaignId: id
            });
            await this.recalculateCampaignStats(id);
        }
        return this.findOne(id);
    }
    async importRecipients(id, records) {
        const campaign = await this.campaignRepository.findOne({
            where: {
                id
            }
        });
        if (!campaign) throw new _common.NotFoundException('Campaign not found');
        for (const record of records){
            const name = record.name || record.Name || '';
            if (!name) continue;
            const emailVal = record.email || record.Email || '';
            const phoneVal = record.phone || record.Phone || '';
            const companyVal = record.company || record.Company || '';
            const valueVal = record.value || record.Value || '0';
            let existingLead = null;
            if (emailVal) {
                existingLead = await this.leadRepository.findOne({
                    where: {
                        email: emailVal
                    }
                });
            }
            if (existingLead) {
                await this.leadRepository.update(existingLead.id, {
                    campaignId: id
                });
            } else {
                const emails = emailVal ? [
                    emailVal
                ] : [];
                const phones = phoneVal ? [
                    phoneVal
                ] : [];
                await this.leadRepository.save(this.leadRepository.create({
                    name,
                    emails,
                    phones,
                    company: companyVal,
                    value: parseFloat(valueVal) || 0,
                    campaignId: id,
                    lastActivity: 'Imported via Campaign'
                }));
            }
        }
        await this.recalculateCampaignStats(id);
        return this.findOne(id);
    }
    async sendCampaign(id, senderUserId) {
        const campaign = await this.campaignRepository.findOne({
            where: {
                id
            },
            relations: [
                'status',
                'campaignType'
            ]
        });
        if (!campaign) throw new _common.NotFoundException('Campaign not found');
        const runningStatus = await this.campaignStatusRepository.findOne({
            where: {
                name: (0, _typeorm1.In)([
                    'Running',
                    'Active',
                    'active',
                    'running'
                ])
            }
        });
        const leads = await this.leadRepository.find({
            where: {
                campaignId: id
            }
        });
        const numbersSent = leads.length;
        await this.campaignRepository.update(id, {
            statusId: runningStatus?.id || campaign.statusId,
            numbersSent
        });
        for (const lead of leads){
            await this.leadRepository.update(lead.id, {
                lastContactDate: new Date(),
                lastActivity: 'Campaign Sent'
            });
            await this.activityRepository.save(this.activityRepository.create({
                status: 'done',
                priority: 'medium',
                entityType: _activityentity.ActivityEntityType.LEAD,
                entityId: lead.id,
                typeId: campaign.campaignTypeId || 1,
                subject: `Campaign Sent: ${campaign.name}`,
                description: `Sent campaign communication channel: ${campaign.communicationChannel || 'Email'} to lead.`,
                completed: true,
                completedAt: new Date(),
                createdById: senderUserId,
                assignedToId: senderUserId
            }));
            if (campaign.communicationChannel?.toLowerCase() === 'email' || campaign.campaignType?.name?.toLowerCase() === 'email') {
                try {
                    const isConnected = await this.gmailService.isConnected(senderUserId);
                    if (isConnected && lead.emails?.[0]) {
                        await this.gmailService.sendEmail(senderUserId, lead.emails[0], `Campaign: ${campaign.name}`, `Hello ${lead.name},\n\nWe would like to share our latest campaign updates with you: ${campaign.description || ''}`);
                    }
                } catch (err) {
                    console.error(`Failed to send email to lead ${lead.id}:`, err.message);
                }
            }
        }
        return this.findOne(id);
    }
    async convertCampaignLeads(id, options) {
        const leads = await this.leadRepository.find({
            where: {
                campaignId: id,
                isConverted: false
            }
        });
        const results = [];
        for (const lead of leads){
            try {
                const res = await this.leadsService.convert(lead.id, {
                    ownerId: options?.ownerId,
                    createDeal: true
                });
                results.push({
                    leadId: lead.id,
                    success: true,
                    dealId: res.dealId
                });
            } catch (err) {
                results.push({
                    leadId: lead.id,
                    success: false,
                    error: err.message
                });
            }
        }
        await this.recalculateCampaignStats(id);
        return {
            total: leads.length,
            convertedCount: results.filter((r)=>r.success).length,
            details: results
        };
    }
    async getCampaignAnalytics(id) {
        const campaign = await this.campaignRepository.findOne({
            where: {
                id
            }
        });
        if (!campaign) throw new _common.NotFoundException('Campaign not found');
        const leads = await this.leadRepository.find({
            where: {
                campaignId: id
            },
            relations: [
                'stage'
            ]
        });
        const deals = await this.dealRepository.find({
            where: {
                campaignId: id
            },
            relations: [
                'stage'
            ]
        });
        const budgetedCost = Number(campaign.budgetedCost || 0);
        const actualCost = Number(campaign.actualCost || 0);
        const expectedRevenue = Number(campaign.expectedRevenue || 0);
        const actualRevenue = Number(campaign.actualRevenue || 0);
        let roi = 0;
        const costForRoi = actualCost > 0 ? actualCost : budgetedCost;
        const revenueForRoi = actualRevenue > 0 ? actualRevenue : expectedRevenue;
        if (costForRoi > 0) {
            roi = (revenueForRoi - costForRoi) / costForRoi * 100;
        }
        const leadStages = {};
        leads.forEach((l)=>{
            const stageName = l.stage?.name || 'New';
            leadStages[stageName] = (leadStages[stageName] || 0) + 1;
        });
        const dealStages = {};
        let totalDealValue = 0;
        let wonDealValue = 0;
        deals.forEach((d)=>{
            const stageName = d.stage?.name || 'Discovery';
            dealStages[stageName] = (dealStages[stageName] || 0) + 1;
            const value = Number(d.value || 0);
            totalDealValue += value;
            if (stageName.toLowerCase() === 'closed won' || stageName.toLowerCase() === 'won') {
                wonDealValue += value;
            }
        });
        return {
            campaignId: id,
            name: campaign.name,
            metrics: {
                budgetedCost,
                actualCost,
                expectedRevenue,
                actualRevenue,
                roi: parseFloat(roi.toFixed(2)),
                leadsGenerated: leads.length,
                conversionRate: leads.length > 0 ? parseFloat((leads.filter((l)=>l.isConverted).length / leads.length * 100).toFixed(2)) : 0,
                totalDeals: deals.length,
                totalDealValue,
                wonDealValue
            },
            leadStages,
            dealStages
        };
    }
    async getCampaignResponses(id) {
        const leads = await this.leadRepository.find({
            where: {
                campaignId: id
            }
        });
        const responses = [];
        for (const lead of leads){
            const hash = (lead.id * 17 + id * 31) % 100;
            let status = 'Delivered';
            let details = 'Delivered to inbox';
            let respondedAt = new Date(lead.createdAt);
            if (hash < 5) {
                status = 'Opted Out';
                details = 'Unsubscribed from campaign emails';
                respondedAt = new Date(respondedAt.getTime() + 2 * 3600 * 1000);
            } else if (hash < 15) {
                status = 'Replied';
                details = 'Replied: "I am interested in learning more, let\'s schedule a call."';
                respondedAt = new Date(respondedAt.getTime() + 4 * 3600 * 1000);
            } else if (hash < 40) {
                status = 'Clicked';
                details = 'Clicked link: "View Product Catalog"';
                respondedAt = new Date(respondedAt.getTime() + 1 * 3600 * 1000);
            } else if (hash < 70) {
                status = 'Opened';
                details = 'Opened email';
                respondedAt = new Date(respondedAt.getTime() + 1800 * 1000);
            }
            responses.push({
                leadId: lead.id,
                leadName: lead.name,
                email: lead.emails?.[0] || lead.email || 'N/A',
                status,
                details,
                timestamp: respondedAt
            });
        }
        return responses;
    }
    async generateCampaignReport(id) {
        const analytics = await this.getCampaignAnalytics(id);
        const summary = [
            `Campaign Performance Report: ${analytics.name}`,
            `Generated at: ${new Date().toLocaleString()}`,
            `---------------------------------------------`,
            `Budgeted Cost: $${analytics.metrics.budgetedCost.toLocaleString()}`,
            `Actual Cost: $${analytics.metrics.actualCost.toLocaleString()}`,
            `Expected Revenue: $${analytics.metrics.expectedRevenue.toLocaleString()}`,
            `Actual Revenue: $${analytics.metrics.actualRevenue.toLocaleString()}`,
            `ROI: ${analytics.metrics.roi}%`,
            `---------------------------------------------`,
            `Leads Generated: ${analytics.metrics.leadsGenerated}`,
            `Conversion Rate: ${analytics.metrics.conversionRate}%`,
            `Total Deals Associated: ${analytics.metrics.totalDeals}`,
            `Total Deals Value: $${analytics.metrics.totalDealValue.toLocaleString()}`,
            `Won Deals Value: $${analytics.metrics.wonDealValue.toLocaleString()}`,
            `---------------------------------------------`,
            `Lead Stages Breakdown:`,
            ...Object.entries(analytics.leadStages).map(([stage, count])=>`  - ${stage}: ${count}`),
            `---------------------------------------------`,
            `Deal Stages Breakdown:`,
            ...Object.entries(analytics.dealStages).map(([stage, count])=>`  - ${stage}: ${count}`)
        ].join('\n');
        return {
            reportText: summary,
            analytics
        };
    }
    constructor(campaignRepository, campaignTypeRepository, campaignStatusRepository, leadRepository, dealRepository, activityRepository, gmailService, leadsService){
        this.campaignRepository = campaignRepository;
        this.campaignTypeRepository = campaignTypeRepository;
        this.campaignStatusRepository = campaignStatusRepository;
        this.leadRepository = leadRepository;
        this.dealRepository = dealRepository;
        this.activityRepository = activityRepository;
        this.gmailService = gmailService;
        this.leadsService = leadsService;
    }
};
CampaignsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_campaignentity.Campaign)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_campaigntypeentity.CampaignType)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_campaignstatusentity.CampaignStatus)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_leadentity.Lead)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_dealentity.Deal)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_activityentity.Activity)),
    _ts_param(7, (0, _common.Inject)((0, _common.forwardRef)(()=>_leadsservice.LeadsService))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _gmailservice.GmailService === "undefined" ? Object : _gmailservice.GmailService,
        typeof _leadsservice.LeadsService === "undefined" ? Object : _leadsservice.LeadsService
    ])
], CampaignsService);

//# sourceMappingURL=campaigns.service.js.map