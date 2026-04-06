"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActivitiesService", {
    enumerable: true,
    get: function() {
        return ActivitiesService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _activityentity = require("./entities/activity.entity");
const _activitytypeentity = require("../settings/entities/activity-type.entity");
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
let ActivitiesService = class ActivitiesService {
    async findAll() {
        return this.activityRepository.find({
            relations: [
                'assignedTo',
                'createdBy'
            ],
            order: {
                dueDate: 'ASC'
            }
        });
    }
    async findByEntity(entityType, entityId) {
        return this.activityRepository.find({
            where: {
                entityType,
                entityId
            },
            relations: [
                'assignedTo',
                'createdBy'
            ],
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async create(data) {
        const activity = this.activityRepository.create(data);
        return this.activityRepository.save(activity);
    }
    async update(id, data) {
        const activity = await this.activityRepository.findOne({
            where: {
                id
            }
        });
        if (!activity) throw new _common.NotFoundException('Activity not found');
        Object.assign(activity, data);
        return this.activityRepository.save(activity);
    }
    async complete(id) {
        const activity = await this.activityRepository.findOne({
            where: {
                id
            }
        });
        if (!activity) throw new _common.NotFoundException('Activity not found');
        activity.completed = true;
        activity.completedAt = new Date();
        return this.activityRepository.save(activity);
    }
    async reassign(id, assignedToId) {
        const activity = await this.activityRepository.findOne({
            where: {
                id
            }
        });
        if (!activity) throw new _common.NotFoundException('Activity not found');
        activity.assignedToId = assignedToId;
        return this.activityRepository.save(activity);
    }
    async delete(id) {
        const activity = await this.activityRepository.findOne({
            where: {
                id
            }
        });
        if (!activity) throw new _common.NotFoundException('Activity not found');
        await this.activityRepository.remove(activity);
    }
    async getAllTypes() {
        return this.activityTypeRepository.find({
            where: {
                isActive: true
            }
        });
    }
    constructor(activityRepository, activityTypeRepository){
        this.activityRepository = activityRepository;
        this.activityTypeRepository = activityTypeRepository;
    }
};
ActivitiesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_activityentity.Activity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_activitytypeentity.ActivityType)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ActivitiesService);

//# sourceMappingURL=activities.service.js.map