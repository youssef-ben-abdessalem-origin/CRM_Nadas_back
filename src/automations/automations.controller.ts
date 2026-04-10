import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AutomationsService } from "./automations.service";
import { AutomationRule } from "./entities/automation-rule.entity";

@ApiTags("Automations")
@Controller("automations")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Get()
  @ApiOperation({ summary: "Get all automation rules" })
  findAll(): Promise<AutomationRule[]> {
    return this.automationsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Create automation rule" })
  create(@Body() data: Partial<AutomationRule>): Promise<AutomationRule> {
    return this.automationsService.create(data);
  }

  @Post("test")
  @ApiOperation({ summary: "Test automation rules against a payload" })
  test(@Body() data: { entity: AutomationEntityType; event: AutomationEventType; payload: any }) {
    return this.automationsService.testRule(data);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update automation rule" })
  update(
    @Param("id") id: string,
    @Body() data: Partial<AutomationRule>,
  ): Promise<AutomationRule> {
    return this.automationsService.update(Number(id), data);
  }

  @Patch(":id/toggle")
  @ApiOperation({ summary: "Toggle automation rule active state" })
  toggle(@Param("id") id: string): Promise<AutomationRule> {
    return this.automationsService.toggle(Number(id));
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete automation rule" })
  delete(@Param("id") id: string): Promise<void> {
    return this.automationsService.delete(Number(id));
  }
}
