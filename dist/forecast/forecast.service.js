"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForecastService", {
    enumerable: true,
    get: function() {
        return ForecastService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _forecastperiodentity = require("./entities/forecast-period.entity");
const _forecasttargetentity = require("./entities/forecast-target.entity");
const _forecastadjustmententity = require("./entities/forecast-adjustment.entity");
const _forecaststagemappingentity = require("./entities/forecast-stage-mapping.entity");
const _dealentity = require("../deals/entities/deal.entity");
const _userentity = require("../users/entities/user.entity");
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
let ForecastService = class ForecastService {
    // Period Management
    async getPeriods() {
        return this.periodRepo.find({
            order: {
                startDate: 'DESC'
            }
        });
    }
    async createPeriod(data) {
        const period = this.periodRepo.create(data);
        return this.periodRepo.save(period);
    }
    async updatePeriod(id, data) {
        await this.periodRepo.update(id, data);
        return this.periodRepo.findOne({
            where: {
                id
            }
        });
    }
    // Target Management
    async getTargets(periodId) {
        return this.targetRepo.find({
            where: {
                periodId
            },
            relations: [
                'user',
                'assignedBy'
            ]
        });
    }
    async setTarget(data) {
        let target = await this.targetRepo.findOne({
            where: {
                userId: data.userId,
                periodId: data.periodId
            }
        });
        if (!target) {
            target = this.targetRepo.create(data);
        } else {
            target.targetValue = data.targetValue;
            target.assignedById = data.assignedById;
        }
        return this.targetRepo.save(target);
    }
    // Mapping Management
    async getMappings() {
        return this.mappingRepo.find({
            relations: [
                'dealStage'
            ]
        });
    }
    async updateMapping(id, category) {
        await this.mappingRepo.update(id, {
            category
        });
        return this.mappingRepo.findOne({
            where: {
                id
            },
            relations: [
                'dealStage'
            ]
        });
    }
    // Dashboard & Analytics
    async getDashboard(periodId, userId) {
        const period = await this.periodRepo.findOne({
            where: {
                id: periodId
            }
        });
        if (!period) throw new _common.NotFoundException('Period not found');
        const mappings = await this.mappingRepo.find();
        // Get all users if no userId provided
        const users = userId ? await this.userRepo.find({
            where: {
                id: userId
            }
        }) : await this.userRepo.find();
        const dashboardData = await Promise.all(users.map(async (user)=>{
            const stats = await this.calculateUserForecast(user.id, period, mappings);
            return {
                userId: user.id,
                userName: user.name,
                ...stats
            };
        }));
        return dashboardData;
    }
    async calculateUserForecast(userId, period, mappings) {
        const deals = await this.dealRepo.find({
            where: {
                ownerId: userId,
                expectedCloseDate: (0, _typeorm1.Between)(period.startDate, period.endDate)
            }
        });
        const target = await this.targetRepo.findOne({
            where: {
                userId,
                periodId: period.id
            }
        });
        const adjustment = await this.adjustmentRepo.findOne({
            where: {
                userId,
                periodId: period.id
            }
        });
        const stats = {
            target: target ? Number(target.targetValue) : 0,
            pipeline: 0,
            bestCase: 0,
            commit: 0,
            closed: 0
        };
        deals.forEach((deal)=>{
            const mapping = mappings.find((m)=>m.dealStageId === deal.dealStageId);
            if (!mapping) return;
            const value = Number(deal.value) || 0;
            switch(mapping.category){
                case _forecaststagemappingentity.ForecastCategory.PIPELINE:
                    stats.pipeline += value;
                    break;
                case _forecaststagemappingentity.ForecastCategory.BEST_CASE:
                    stats.bestCase += value;
                    break;
                case _forecaststagemappingentity.ForecastCategory.COMMIT:
                    stats.commit += value;
                    break;
                case _forecaststagemappingentity.ForecastCategory.CLOSED:
                    stats.closed += value;
                    break;
            }
        });
        // Apply adjustments
        const finalCommit = adjustment && adjustment.commitOverride != null ? Number(adjustment.commitOverride) : stats.commit;
        const finalBestCase = adjustment && adjustment.bestCaseOverride != null ? Number(adjustment.bestCaseOverride) : stats.bestCase;
        return {
            ...stats,
            commit: finalCommit,
            bestCase: finalBestCase,
            gap: Math.max(0, (target ? Number(target.targetValue) : 0) - finalCommit),
            hasAdjustment: !!adjustment,
            adjustmentNote: adjustment?.note
        };
    }
    async getMyForecast(userId, periodId) {
        let period;
        if (periodId) {
            period = await this.periodRepo.findOne({
                where: {
                    id: periodId
                }
            });
        } else {
            period = await this.periodRepo.findOne({
                where: {
                    status: _forecastperiodentity.PeriodStatus.OPEN
                },
                order: {
                    startDate: 'ASC'
                }
            });
        }
        if (!period) {
            // Return empty stats if no period
            return null;
        }
        const mappings = await this.mappingRepo.find();
        const stats = await this.calculateUserForecast(userId, period, mappings);
        const deals = await this.dealRepo.find({
            where: {
                ownerId: userId,
                expectedCloseDate: (0, _typeorm1.Between)(period.startDate, period.endDate)
            },
            relations: [
                'stage'
            ]
        });
        return {
            period,
            stats,
            deals: deals.map((d)=>({
                    id: d.id,
                    name: d.name,
                    value: Number(d.value) || 0,
                    stage: d.stage?.name,
                    category: mappings.find((m)=>m.dealStageId === d.dealStageId)?.category || 'UNMAPPED',
                    probability: d.probability,
                    expectedCloseDate: d.expectedCloseDate
                }))
        };
    }
    async setAdjustment(userId, periodId, data) {
        let adj = await this.adjustmentRepo.findOne({
            where: {
                userId,
                periodId
            }
        });
        if (!adj) {
            adj = this.adjustmentRepo.create({
                userId,
                periodId
            });
        }
        if (data.commitOverride !== undefined) adj.commitOverride = data.commitOverride;
        if (data.bestCaseOverride !== undefined) adj.bestCaseOverride = data.bestCaseOverride;
        if (data.note !== undefined) adj.note = data.note;
        adj.createdById = data.createdById;
        return this.adjustmentRepo.save(adj);
    }
    async getContributions(userId, periodId, category) {
        const period = await this.periodRepo.findOne({
            where: {
                id: periodId
            }
        });
        if (!period) throw new _common.NotFoundException('Period not found');
        const mappings = await this.mappingRepo.find({
            where: {
                category
            }
        });
        const stageIds = mappings.map((m)=>m.dealStageId);
        if (stageIds.length === 0) return [];
        return this.dealRepo.find({
            where: {
                ownerId: userId,
                dealStageId: (0, _typeorm1.In)(stageIds),
                expectedCloseDate: (0, _typeorm1.Between)(period.startDate, period.endDate)
            },
            relations: [
                'owner',
                'stage'
            ]
        });
    }
    constructor(periodRepo, targetRepo, adjustmentRepo, mappingRepo, dealRepo, userRepo){
        this.periodRepo = periodRepo;
        this.targetRepo = targetRepo;
        this.adjustmentRepo = adjustmentRepo;
        this.mappingRepo = mappingRepo;
        this.dealRepo = dealRepo;
        this.userRepo = userRepo;
    }
};
ForecastService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_forecastperiodentity.ForecastPeriod)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_forecasttargetentity.ForecastTarget)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_forecastadjustmententity.ForecastAdjustment)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_forecaststagemappingentity.ForecastStageMapping)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_dealentity.Deal)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_userentity.User)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ForecastService);

//# sourceMappingURL=forecast.service.js.map