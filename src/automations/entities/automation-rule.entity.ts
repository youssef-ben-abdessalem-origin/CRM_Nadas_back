import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export type AutomationEntityType = "lead" | "contact" | "deal" | "invoice";
export type AutomationEventType = "created" | "updated" | "deleted" | "stage_changed";

export interface AutomationCondition {
  field: string;
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=" | "contains";
  value: any;
  logic: "AND" | "OR";
}

export interface AutomationAction {
  type: "assign_owner" | "send_email" | "create_task" | "update_field" | "add_tag" | "notify_user";
  config: Record<string, any>;
  delayInMinutes?: number;
  delayInDays?: number;
}

@Entity("automation_rules")
export class AutomationRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "varchar" })
  entity: AutomationEntityType; // Changed from entityType to entity for consistency

  @Column({ type: "varchar" })
  event: AutomationEventType; // Changed from eventType to event

  @Column({ type: "jsonb", default: [] })
  conditions: AutomationCondition[];

  @Column({ type: "jsonb", default: [] })
  actions: AutomationAction[];

  @Column({ default: 0 })
  priority: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  stopIfMatched: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
