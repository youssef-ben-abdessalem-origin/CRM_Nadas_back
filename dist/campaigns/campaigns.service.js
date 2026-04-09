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
        if (typeCount === 0) {
            const types = [
                {
                    name: 'Conference',
                    order: 1
                },
                {
                    name: 'Webinar',
                    order: 2
                },
                {
                    name: 'Trade Show',
                    order: 3
                },
                {
                    name: 'Public Relations',
                    order: 4
                },
                {
                    name: 'Partners',
                    order: 5
                },
                {
                    name: 'Referral Program',
                    order: 6
                },
                {
                    name: 'Advertisement',
                    order: 7
                },
                {
                    name: 'Banner Ads',
                    order: 8
                },
                {
                    name: 'Direct mail',
                    order: 9
                },
                {
                    name: 'Email',
                    order: 10
                },
                {
                    name: 'Telemarketing',
                    order: 11
                },
                {
                    name: 'Others',
                    order: 12
                }
            ];
            for (const t of types){
                await this.campaignTypeRepository.save(t);
            }
        }
        const statusCount = await this.campaignStatusRepository.count();
        if (statusCount === 0) {
            const statuses = [
                {
                    name: 'Planning',
                    order: 1
                },
                {
                    name: 'Active',
                    order: 2
                },
                {
                    name: 'Inactive',
                    order: 3
                },
                {
                    name: 'Complete',
                    order: 4
                }
            ];
            for (const s of statuses){
                await this.campaignStatusRepository.save(s);
            }
        }
    }
    async findAll() {
        return this.campaignRepository.find({
            relations: [
                'owner',
                'campaignType',
                'status'
            ]
        });
    }
    async findOne(id) {
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
        return campaign;
    }
    async create(data) {
        const campaign = this.campaignRepository.create(data);
        return this.campaignRepository.save(campaign);
    }
    async update(id, data) {
        const campaign = await this.findOne(id);
        Object.assign(campaign, data);
        return this.campaignRepository.save(campaign);
    }
    async delete(id) {
        const campaign = await this.findOne(id);
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
    constructor(campaignRepository, campaignTypeRepository, campaignStatusRepository){
        this.campaignRepository = campaignRepository;
        this.campaignTypeRepository = campaignTypeRepository;
        this.campaignStatusRepository = campaignStatusRepository;
    }
};
CampaignsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_campaignentity.Campaign)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_campaigntypeentity.CampaignType)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_campaignstatusentity.CampaignStatus)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CampaignsService);

//# sourceMappingURL=campaigns.service.js.map