"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AutomationsService", {
    enumerable: true,
    get: function() {
        return AutomationsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _automationruleentity = require("./entities/automation-rule.entity");
const _leadentity = require("../leads/entities/lead.entity");
const _dealentity = require("../deals/entities/deal.entity");
const _taskentity = require("../tasks/entities/task.entity");
const _notificationentity = require("../settings/entities/notification.entity");
const _gmailservice = require("../gmail/gmail.service");
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
let AutomationsService = class AutomationsService {
    async findAll() {
        return this.automationRuleRepository.find({
            order: {
                priority: "DESC",
                updatedAt: "DESC"
            }
        });
    }
    async create(data) {
        const rule = this.automationRuleRepository.create(data);
        return this.automationRuleRepository.save(rule);
    }
    async update(id, data) {
        const rule = await this.automationRuleRepository.findOne({
            where: {
                id
            }
        });
        if (!rule) throw new _common.NotFoundException("Automation rule not found");
        Object.assign(rule, data);
        return this.automationRuleRepository.save(rule);
    }
    async delete(id) {
        const rule = await this.automationRuleRepository.findOne({
            where: {
                id
            }
        });
        if (!rule) throw new _common.NotFoundException("Automation rule not found");
        await this.automationRuleRepository.remove(rule);
    }
    async toggle(id) {
        const rule = await this.automationRuleRepository.findOne({
            where: {
                id
            }
        });
        if (!rule) throw new _common.NotFoundException("Automation rule not found");
        rule.isActive = !rule.isActive;
        return this.automationRuleRepository.save(rule);
    }
    /**
   * Main Entry Point for the Automation Engine
   */ async processEvent(entityType, event, entity, actorUserId) {
        const rules = await this.automationRuleRepository.find({
            where: {
                entity: entityType,
                event: event,
                isActive: true
            },
            order: {
                priority: "DESC"
            }
        });
        for (const rule of rules){
            const isMatched = this.evaluateConditions(rule.conditions, entity);
            if (isMatched) {
                this.logger.log(`Executing automation rule: ${rule.name} for ${entityType} #${entity.id}`);
                for (const action of rule.actions){
                    try {
                        await this.executeAction(action, entityType, entity, actorUserId);
                    } catch (err) {
                        this.logger.error(`Failed to execute action ${action.type} for rule ${rule.name}`, err);
                    }
                }
                if (rule.stopIfMatched) {
                    this.logger.log(`Stopping automation chain as stopIfMatched is true for rule: ${rule.name}`);
                    break;
                }
            }
        }
    }
    /**
   * Dry-run for testing rules
   */ async testRule(data) {
        const rules = await this.automationRuleRepository.find({
            where: {
                entity: data.entity,
                event: data.event,
                isActive: true
            },
            order: {
                priority: "DESC"
            }
        });
        const matches = [];
        for (const rule of rules){
            const isMatched = this.evaluateConditions(rule.conditions, data.payload);
            if (isMatched) {
                matches.push({
                    ruleId: rule.id,
                    ruleName: rule.name,
                    actions: rule.actions,
                    stopIfMatched: rule.stopIfMatched
                });
                if (rule.stopIfMatched) break;
            }
        }
        return {
            matchedCount: matches.length,
            matches
        };
    }
    /**
   * Evaluates a set of conditions with support for AND/OR logic
   */ evaluateConditions(conditions, entity) {
        if (!conditions || conditions.length === 0) return true;
        let result = true;
        for(let i = 0; i < conditions.length; i++){
            const condition = conditions[i];
            const match = this.checkCondition(condition, entity);
            if (i === 0) {
                result = match;
            } else {
                const prevLogic = conditions[i - 1].logic || "AND";
                if (prevLogic === "AND") {
                    result = result && match;
                } else {
                    result = result || match;
                }
            }
        }
        return result;
    }
    checkCondition(condition, entity) {
        const actualValue = this.resolvePath(entity, condition.field);
        const expectedValue = condition.value;
        switch(condition.operator){
            case "=":
                return String(actualValue ?? "") === String(expectedValue ?? "");
            case "!=":
                return String(actualValue ?? "") !== String(expectedValue ?? "");
            case ">":
                return Number(actualValue) > Number(expectedValue);
            case "<":
                return Number(actualValue) < Number(expectedValue);
            case ">=":
                return Number(actualValue) >= Number(expectedValue);
            case "<=":
                return Number(actualValue) <= Number(expectedValue);
            case "contains":
                return String(actualValue ?? "").toLowerCase().includes(String(expectedValue ?? "").toLowerCase());
            default:
                return false;
        }
    }
    async executeAction(action, entityType, entity, actorUserId) {
        const config = action.config || {};
        switch(action.type){
            case "assign_owner":
                await this.handleAssignOwner(config, entityType, entity);
                break;
            case "update_field":
                await this.handleUpdateField(config, entityType, entity);
                break;
            case "create_task":
                await this.handleCreateTask(config, entityType, entity, actorUserId);
                break;
            case "notify_user":
                await this.handleNotifyUser(config, entityType, entity, actorUserId);
                break;
            case "send_email":
                await this.handleSendEmail(config, entityType, entity, actorUserId);
                break;
            case "add_tag":
                break;
        }
    }
    async handleAssignOwner(config, entityType, entity) {
        let ownerId = config.ownerId;
        if (config.mode === "round_robin" && config.userIds?.length > 0) {
            // Simple round-robin logic: pick a random one for now or we could store an index
            const randomIndex = Math.floor(Math.random() * config.userIds.length);
            ownerId = config.userIds[randomIndex];
        }
        if (!ownerId) return;
        const repository = entityType === "lead" ? this.leadRepository : this.dealRepository;
        await repository.update(entity.id, {
            ownerId
        });
    }
    async handleUpdateField(config, entityType, entity) {
        if (!config.field || config.value === undefined) return;
        const repository = entityType === "lead" ? this.leadRepository : this.dealRepository;
        await repository.update(entity.id, {
            [config.field]: config.value
        });
    }
    async handleCreateTask(config, entityType, entity, actorUserId) {
        const ownerId = config.ownerId || entity.ownerId || actorUserId;
        const dueInDays = Number(config.dueInDays || 0);
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + dueInDays);
        await this.taskRepository.save(this.taskRepository.create({
            subject: config.title || `Task for ${entityType} #${entity.id}`,
            description: config.description || "Auto-generated by workflow",
            entityType,
            entityId: entity.id,
            ownerId,
            status: "Pending",
            priority: "Normal",
            dueDate: dueDate.toISOString()
        }));
    }
    async handleNotifyUser(config, entityType, entity, actorUserId) {
        const targetUserId = config.userId || entity.ownerId || actorUserId;
        if (!targetUserId) return;
        await this.notificationRepository.save(this.notificationRepository.create({
            userId: targetUserId,
            type: "info",
            title: config.title || "Workflow Alert",
            message: config.message || `Automation triggered for ${entityType}`,
            link: `/${entityType}s/${entity.id}`
        }));
    }
    async handleSendEmail(config, entityType, entity, actorUserId) {
        const senderId = actorUserId || entity.ownerId;
        const to = config.to || (entityType === "lead" ? entity.email : null);
        if (!senderId || !to) return;
        try {
            await this.gmailService.sendEmail(senderId, to, config.subject, config.body);
        } catch (err) {
            this.logger.error("Failed to send automation email", err);
        }
    }
    resolvePath(obj, path) {
        if (!obj || !path) return undefined;
        return path.split(".").reduce((acc, key)=>acc ? acc[key] : undefined, obj);
    }
    constructor(automationRuleRepository, leadRepository, dealRepository, taskRepository, notificationRepository, userRepository, gmailService){
        this.automationRuleRepository = automationRuleRepository;
        this.leadRepository = leadRepository;
        this.dealRepository = dealRepository;
        this.taskRepository = taskRepository;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.gmailService = gmailService;
        this.logger = new _common.Logger(AutomationsService.name);
    }
};
AutomationsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_automationruleentity.AutomationRule)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_leadentity.Lead)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_dealentity.Deal)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_taskentity.Task)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_notificationentity.Notification)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_userentity.User)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _gmailservice.GmailService === "undefined" ? Object : _gmailservice.GmailService
    ])
], AutomationsService);

//# sourceMappingURL=automations.service.js.map