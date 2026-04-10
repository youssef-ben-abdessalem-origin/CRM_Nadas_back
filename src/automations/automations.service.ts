import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import {
  AutomationAction,
  AutomationCondition,
  AutomationEntityType,
  AutomationEventType,
  AutomationRule,
} from "./entities/automation-rule.entity";
import { Lead } from "../leads/entities/lead.entity";
import { Deal } from "../deals/entities/deal.entity";
import { Task } from "../tasks/entities/task.entity";
import { Notification } from "../settings/entities/notification.entity";
import { GmailService } from "../gmail/gmail.service";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AutomationsService {
  private readonly logger = new Logger(AutomationsService.name);

  constructor(
    @InjectRepository(AutomationRule)
    private readonly automationRuleRepository: Repository<AutomationRule>,
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly gmailService: GmailService,
  ) {}

  async findAll(): Promise<AutomationRule[]> {
    return this.automationRuleRepository.find({
      order: { priority: "DESC", updatedAt: "DESC" },
    });
  }

  async create(data: Partial<AutomationRule>): Promise<AutomationRule> {
    const rule = this.automationRuleRepository.create(data);
    return this.automationRuleRepository.save(rule);
  }

  async update(id: number, data: Partial<AutomationRule>): Promise<AutomationRule> {
    const rule = await this.automationRuleRepository.findOne({ where: { id } });
    if (!rule) throw new NotFoundException("Automation rule not found");
    Object.assign(rule, data);
    return this.automationRuleRepository.save(rule);
  }

  async delete(id: number): Promise<void> {
    const rule = await this.automationRuleRepository.findOne({ where: { id } });
    if (!rule) throw new NotFoundException("Automation rule not found");
    await this.automationRuleRepository.remove(rule);
  }

  async toggle(id: number): Promise<AutomationRule> {
    const rule = await this.automationRuleRepository.findOne({ where: { id } });
    if (!rule) throw new NotFoundException("Automation rule not found");
    rule.isActive = !rule.isActive;
    return this.automationRuleRepository.save(rule);
  }

  /**
   * Main Entry Point for the Automation Engine
   */
  async processEvent(
    entityType: AutomationEntityType,
    event: AutomationEventType,
    entity: any,
    actorUserId?: number,
  ): Promise<void> {
    const rules = await this.automationRuleRepository.find({
      where: {
        entity: entityType,
        event: event,
        isActive: true,
      },
      order: { priority: "DESC" },
    });

    for (const rule of rules) {
      const isMatched = this.evaluateConditions(rule.conditions, entity);
      
      if (isMatched) {
        this.logger.log(`Executing automation rule: ${rule.name} for ${entityType} #${entity.id}`);
        
        for (const action of rule.actions) {
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
   */
  async testRule(data: { entity: AutomationEntityType; event: AutomationEventType; payload: any }): Promise<any> {
    const rules = await this.automationRuleRepository.find({
      where: {
        entity: data.entity,
        event: data.event,
        isActive: true,
      },
      order: { priority: "DESC" },
    });

    const matches = [];

    for (const rule of rules) {
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
      matches,
    };
  }

  /**
   * Evaluates a set of conditions with support for AND/OR logic
   */
  private evaluateConditions(conditions: AutomationCondition[], entity: any): boolean {
    if (!conditions || conditions.length === 0) return true;

    let result = true;

    for (let i = 0; i < conditions.length; i++) {
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

  private checkCondition(condition: AutomationCondition, entity: any): boolean {
    const actualValue = this.resolvePath(entity, condition.field);
    const expectedValue = condition.value;

    switch (condition.operator) {
      case "=": return String(actualValue ?? "") === String(expectedValue ?? "");
      case "!=": return String(actualValue ?? "") !== String(expectedValue ?? "");
      case ">": return Number(actualValue) > Number(expectedValue);
      case "<": return Number(actualValue) < Number(expectedValue);
      case ">=": return Number(actualValue) >= Number(expectedValue);
      case "<=": return Number(actualValue) <= Number(expectedValue);
      case "contains": 
        return String(actualValue ?? "").toLowerCase().includes(String(expectedValue ?? "").toLowerCase());
      default: return false;
    }
  }

  private async executeAction(
    action: AutomationAction,
    entityType: AutomationEntityType,
    entity: any,
    actorUserId?: number,
  ): Promise<void> {
    const config = action.config || {};

    switch (action.type) {
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
        // Logic for adding tags would go here, depends on tag relationship structure
        break;
    }
  }

  private async handleAssignOwner(config: any, entityType: string, entity: any) {
    let ownerId = config.ownerId;

    if (config.mode === "round_robin" && config.userIds?.length > 0) {
      // Simple round-robin logic: pick a random one for now or we could store an index
      const randomIndex = Math.floor(Math.random() * config.userIds.length);
      ownerId = config.userIds[randomIndex];
    }

    if (!ownerId) return;

    const repository = entityType === "lead" ? this.leadRepository : this.dealRepository;
    await repository.update(entity.id, { ownerId });
  }

  private async handleUpdateField(config: any, entityType: string, entity: any) {
    if (!config.field || config.value === undefined) return;
    const repository = entityType === "lead" ? this.leadRepository : this.dealRepository;
    await repository.update(entity.id, { [config.field]: config.value });
  }

  private async handleCreateTask(config: any, entityType: string, entity: any, actorUserId?: number) {
    const ownerId = config.ownerId || entity.ownerId || actorUserId;
    const dueInDays = Number(config.dueInDays || 0);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + dueInDays);

    await this.taskRepository.save(
      this.taskRepository.create({
        subject: config.title || `Task for ${entityType} #${entity.id}`,
        description: config.description || "Auto-generated by workflow",
        entityType,
        entityId: entity.id,
        ownerId,
        status: "Pending",
        priority: "Normal",
        dueDate: dueDate.toISOString(),
      })
    );
  }

  private async handleNotifyUser(config: any, entityType: string, entity: any, actorUserId?: number) {
    const targetUserId = config.userId || entity.ownerId || actorUserId;
    if (!targetUserId) return;

    await this.notificationRepository.save(
      this.notificationRepository.create({
        userId: targetUserId,
        type: "info",
        title: config.title || "Workflow Alert",
        message: config.message || `Automation triggered for ${entityType}`,
        link: `/${entityType}s/${entity.id}`,
      })
    );
  }

  private async handleSendEmail(config: any, entityType: string, entity: any, actorUserId?: number) {
    const senderId = actorUserId || entity.ownerId;
    const to = config.to || (entityType === "lead" ? entity.email : null);
    if (!senderId || !to) return;

    try {
      await this.gmailService.sendEmail(senderId, to, config.subject, config.body);
    } catch (err) {
      this.logger.error("Failed to send automation email", err);
    }
  }

  private resolvePath(obj: any, path: string): any {
    if (!obj || !path) return undefined;
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  }
}
