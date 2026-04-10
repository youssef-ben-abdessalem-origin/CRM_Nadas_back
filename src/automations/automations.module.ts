import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomationsController } from "./automations.controller";
import { AutomationsService } from "./automations.service";
import { AutomationRule } from "./entities/automation-rule.entity";
import { Lead } from "../leads/entities/lead.entity";
import { Deal } from "../deals/entities/deal.entity";
import { Task } from "../tasks/entities/task.entity";
import { Notification } from "../settings/entities/notification.entity";
import { User } from "../users/entities/user.entity";
import { GmailModule } from "../gmail/gmail.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AutomationRule, 
      Lead, 
      Deal, 
      Task, 
      Notification,
      User
    ]),
    GmailModule,
  ],
  controllers: [AutomationsController],
  providers: [AutomationsService],
  exports: [AutomationsService],
})
export class AutomationsModule {}
