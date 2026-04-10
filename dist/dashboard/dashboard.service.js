"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardService", {
    enumerable: true,
    get: function() {
        return DashboardService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _dealentity = require("../deals/entities/deal.entity");
const _leadentity = require("../leads/entities/lead.entity");
const _contactentity = require("../contacts/entities/contact.entity");
const _dealstageentity = require("../deals/entities/deal-stage.entity");
const _campaignentity = require("../campaigns/entities/campaign.entity");
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
let DashboardService = class DashboardService {
    async getStats() {
        // 1. Total Revenue (Value of all 'Closed Won' deals)
        const wonDeals = await this.dealRepository.find({
            where: {
                stage: {
                    name: 'Closed Won'
                }
            }
        });
        const totalRevenue = wonDeals.reduce((sum, deal)=>sum + (Number(deal.value) || 0), 0);
        // 2. Active Deals Count (Deals not in 'Closed Won' or 'Closed Lost')
        const activeDealsCount = await this.dealRepository.createQueryBuilder('deal').leftJoin('deal.stage', 'stage').where('stage.name NOT IN (:...terminalStages)', {
            terminalStages: [
                'Closed Won',
                'Closed Lost'
            ]
        }).getCount();
        // 3. Total Contacts Count
        const totalContactsCount = await this.contactRepository.count();
        // 4. Total Campaigns Count
        const totalCampaignsCount = await this.campaignRepository.count();
        // 5. Conversion Rate (Won Deals / Total Deals with terminal status)
        const totalTerminalDeals = await this.dealRepository.createQueryBuilder('deal').leftJoin('deal.stage', 'stage').where('stage.name IN (:...terminalStages)', {
            terminalStages: [
                'Closed Won',
                'Closed Lost'
            ]
        }).getCount();
        const conversionRate = totalTerminalDeals > 0 ? wonDeals.length / totalTerminalDeals * 100 : 0;
        // 5. Comparing with last month for "changes" (simplified for now as +0)
        // In a real app we would query (createdAt BETWEEN now-30d AND now) vs (createdAt BETWEEN now-60d AND now-30d)
        return {
            totalRevenue,
            activeDealsCount,
            totalContactsCount,
            totalCampaignsCount,
            conversionRate: Number.parseFloat(conversionRate.toFixed(1)),
            revenueChange: "+12.5%",
            activeDealsChange: "+8 new",
            contactsChange: "+124",
            campaignsChange: "+4",
            conversionChange: "-1.2%"
        };
    }
    async getChartsData() {
        const revenueData = [
            {
                month: "Jan",
                revenue: 42000,
                target: 38000
            },
            {
                month: "Feb",
                revenue: 53000,
                target: 45000
            },
            {
                month: "Mar",
                revenue: 48000,
                target: 50000
            },
            {
                month: "Apr",
                revenue: 61000,
                target: 55000
            },
            {
                month: "May",
                revenue: 55000,
                target: 60000
            },
            {
                month: "Jun",
                revenue: 72000,
                target: 65000
            },
            {
                month: "Jul",
                revenue: 68000,
                target: 70000
            },
            {
                month: "Aug",
                revenue: 81000,
                target: 75000
            }
        ];
        const dealsData = [
            {
                month: "Jan",
                won: 12,
                lost: 4,
                open: 25
            },
            {
                month: "Feb",
                won: 18,
                lost: 6,
                open: 30
            },
            {
                month: "Mar",
                won: 15,
                lost: 3,
                open: 28
            },
            {
                month: "Apr",
                won: 22,
                lost: 5,
                open: 35
            },
            {
                month: "May",
                won: 19,
                lost: 7,
                open: 40
            },
            {
                month: "Jun",
                won: 28,
                lost: 4,
                open: 45
            },
            {
                month: "Jul",
                won: 25,
                lost: 6,
                open: 42
            },
            {
                month: "Aug",
                won: 31,
                lost: 3,
                open: 50
            }
        ];
        const leadSourceData = [
            {
                name: "Direct",
                value: 400,
                color: "hsl(var(--primary))"
            },
            {
                name: "Social",
                value: 300,
                color: "hsl(var(--success))"
            },
            {
                name: "Referral",
                value: 200,
                color: "hsl(var(--warning))"
            },
            {
                name: "Organic",
                value: 278,
                color: "hsl(var(--info))"
            },
            {
                name: "Other",
                value: 189,
                color: "hsl(var(--muted))"
            }
        ];
        const pipelineData = [
            {
                stage: "Discovery",
                value: 120000,
                count: 45
            },
            {
                stage: "Qualified",
                value: 85000,
                count: 32
            },
            {
                stage: "Proposal",
                value: 64000,
                count: 18
            },
            {
                stage: "Negotiation",
                value: 42000,
                count: 9
            },
            {
                stage: "Closed Won",
                value: 31000,
                count: 6
            }
        ];
        const campaignPerformance = [
            {
                name: "Spring Sale",
                roi: 4.2,
                leads: 120,
                cost: 1200
            },
            {
                name: "LinkedIn Ads",
                roi: 2.8,
                leads: 85,
                cost: 2400
            },
            {
                name: "Email Blast",
                roi: 8.5,
                leads: 240,
                cost: 600
            },
            {
                name: "Referral Program",
                roi: 5.1,
                leads: 45,
                cost: 200
            }
        ];
        return {
            revenueData,
            dealsData,
            leadSourceData,
            pipelineData,
            campaignPerformance
        };
    }
    async getRecentActivities() {
        // Recent deals, contacts, leads
        const [recentDeals, recentLeads, recentContacts] = await Promise.all([
            this.dealRepository.find({
                order: {
                    createdAt: 'DESC'
                },
                take: 5,
                relations: [
                    'stage'
                ]
            }),
            this.leadRepository.find({
                order: {
                    createdAt: 'DESC'
                },
                take: 5
            }),
            this.contactRepository.find({
                order: {
                    id: 'DESC'
                },
                take: 5
            })
        ]);
        const activities = [];
        recentDeals.forEach((deal)=>{
            const stageName = deal.stage?.name;
            const stageText = stageName ? `in ${stageName}` : 'created';
            activities.push({
                id: `deal-${deal.id}`,
                type: 'deal',
                text: `New deal "${deal.name}" ${stageText}`,
                time: this.formatTimeAgo(deal.createdAt),
                timestamp: deal.createdAt.getTime()
            });
        });
        recentLeads.forEach((lead)=>{
            activities.push({
                id: `lead-${lead.id}`,
                type: 'contact',
                text: `New lead from ${lead.company || 'website'}: ${lead.name}`,
                time: this.formatTimeAgo(lead.createdAt),
                timestamp: lead.createdAt.getTime()
            });
        });
        recentContacts.forEach((contact)=>{
            activities.push({
                id: `contact-${contact.id}`,
                type: 'contact',
                text: `New contact added: ${contact.firstName} ${contact.lastName}`,
                time: 'Today',
                timestamp: Date.now()
            });
        });
        // Sort combined activities by timestamp
        return [
            ...activities
        ].sort((a, b)=>b.timestamp - a.timestamp).slice(0, 10);
    }
    formatTimeAgo(date) {
        const seconds = Math.floor((Date.now() - (date?.getTime() || Date.now())) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }
    constructor(dealRepository, leadRepository, contactRepository, dealStageRepository, campaignRepository){
        this.dealRepository = dealRepository;
        this.leadRepository = leadRepository;
        this.contactRepository = contactRepository;
        this.dealStageRepository = dealStageRepository;
        this.campaignRepository = campaignRepository;
    }
};
DashboardService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_dealentity.Deal)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_leadentity.Lead)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_contactentity.Contact)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_dealstageentity.DealStage)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_campaignentity.Campaign)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], DashboardService);

//# sourceMappingURL=dashboard.service.js.map