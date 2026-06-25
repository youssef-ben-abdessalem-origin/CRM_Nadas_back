import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CostCentersService } from "./cost-centers.service";
import { CostCenter } from "./entities/cost-center.entity";

@ApiTags("Cost Centers")
@Controller("cost-centers")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
export class CostCentersController {
  constructor(private readonly costCentersService: CostCentersService) {}

  @Get()
  @ApiOperation({ summary: "Get all cost centers" })
  findAll(): Promise<CostCenter[]> {
    return this.costCentersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Create cost center" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "Administration Tunis" },
        description: { type: "string", example: "Shared admin overhead center" },
        departmentId: { type: "number", example: 3 },
        managerId: { type: "number", example: 12 },
        status: { type: "string", example: "Active" },
      },
      required: ["name"],
    },
  })
  create(
    @Body()
    data: {
      name: string;
      description?: string;
      departmentId?: number | null;
      managerId?: number | null;
      status?: string;
    },
  ): Promise<CostCenter> {
    return this.costCentersService.create(data);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update cost center" })
  update(
    @Param("id") id: string,
    @Body()
    data: {
      name?: string;
      description?: string | null;
      departmentId?: number | null;
      managerId?: number | null;
      status?: string;
    },
  ): Promise<CostCenter> {
    return this.costCentersService.update(Number(id), data);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete cost center" })
  delete(@Param("id") id: string): Promise<void> {
    return this.costCentersService.delete(Number(id));
  }
}
