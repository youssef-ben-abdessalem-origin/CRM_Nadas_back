import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { DepartmentsService } from "./departments.service";
import { Department } from "./entities/department.entity";

@ApiTags("Departments")
@Controller("departments")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  @ApiOperation({ summary: "Get all departments" })
  findAll(): Promise<Department[]> {
    return this.departmentsService.findAll();
  }

  @Get("ping")
  @ApiOperation({ summary: "Diagnostic route" })
  ping() {
    return { status: "alive" };
  }

  @Post()
  @ApiOperation({ summary: "Create department" })
  @ApiBody({
    description: "Create a department with one representative and members",
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "Sales Operations" },
        description: { type: "string", example: "Manages pipeline quality and process." },
        representativeId: { type: "number", example: 3 },
        memberIds: {
          type: "array",
          items: { type: "number" },
          example: [3, 5, 8],
        },
      },
      required: ["name"],
    },
  })
  create(
    @Body()
    data: {
      name: string;
      description?: string;
      representativeId?: number;
      memberIds?: number[];
    },
  ): Promise<Department> {
    return this.departmentsService.create(data);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update department" })
  @ApiBody({
    description: "Update department info and assignments",
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "Sales Operations - EMEA" },
        description: { type: "string", example: "Updated ownership scope." },
        representativeId: { type: "number", example: 5 },
        memberIds: {
          type: "array",
          items: { type: "number" },
          example: [5, 8, 11],
        },
      },
    },
  })
  update(
    @Param("id") id: string,
    @Body()
    data: {
      name?: string;
      description?: string;
      representativeId?: number | null;
      memberIds?: number[];
    },
  ): Promise<Department> {
    return this.departmentsService.update(Number(id), data);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete department" })
  delete(@Param("id") id: string): Promise<void> {
    return this.departmentsService.delete(Number(id));
  }
}
