"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TasksService", {
    enumerable: true,
    get: function() {
        return TasksService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _taskentity = require("./entities/task.entity");
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
let TasksService = class TasksService {
    async findAll() {
        return this.taskRepository.find({
            relations: [
                'owner',
                'createdBy'
            ],
            order: {
                dueDate: 'ASC'
            }
        });
    }
    async findByEntity(entityType, entityId) {
        return this.taskRepository.find({
            where: {
                entityType,
                entityId
            },
            relations: [
                'owner',
                'createdBy'
            ],
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async create(data) {
        const task = this.taskRepository.create(data);
        return this.taskRepository.save(task);
    }
    async update(id, data) {
        const task = await this.taskRepository.findOne({
            where: {
                id
            }
        });
        if (!task) throw new _common.NotFoundException('Task not found');
        Object.assign(task, data);
        return this.taskRepository.save(task);
    }
    async delete(id) {
        const task = await this.taskRepository.findOne({
            where: {
                id
            }
        });
        if (!task) throw new _common.NotFoundException('Task not found');
        await this.taskRepository.remove(task);
    }
    constructor(taskRepository){
        this.taskRepository = taskRepository;
    }
};
TasksService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_taskentity.Task)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], TasksService);

//# sourceMappingURL=tasks.service.js.map