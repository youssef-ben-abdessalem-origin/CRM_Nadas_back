import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CostCenter } from "./entities/cost-center.entity";
import { Department } from "../departments/entities/department.entity";
import { Employee } from "../hr/entities/employee.entity";

const DEFAULT_COST_CENTER_DEFINITIONS = [
  { code: "CC-0001", name: "Administration", department: "Administration" },
  { code: "CC-0002", name: "Human Resources", department: "Human Resources" },
  { code: "CC-0003", name: "Finance", department: "Finance" },
  { code: "CC-0004", name: "Sales", department: "Sales & Commercial" },
  { code: "CC-0005", name: "Operations", department: "Operations" },
  { code: "CC-0006", name: "Production", department: "Production" },
  { code: "CC-0007", name: "Logistics", department: "Supply Chain & Logistics" },
  { code: "CC-0008", name: "IT", department: "Information Technology" },
] as const;

@Injectable()
export class CostCentersService implements OnModuleInit {
  constructor(
    @InjectRepository(CostCenter)
    private readonly costCenterRepository: Repository<CostCenter>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultCostCenters();
  }

  async findAll(): Promise<CostCenter[]> {
    return this.costCenterRepository.find({
      relations: ["department", "manager"],
      order: { code: "ASC" },
    });
  }

  async findOne(id: number): Promise<CostCenter> {
    const costCenter = await this.costCenterRepository.findOne({
      where: { id },
      relations: ["department", "manager"],
    });

    if (!costCenter) throw new NotFoundException("Cost center not found");
    return costCenter;
  }

  async create(data: {
    name: string;
    description?: string;
    departmentId?: number | null;
    managerId?: number | null;
    status?: string;
  }): Promise<CostCenter> {
    const normalizedName = data.name.trim();
    if (!normalizedName) {
      throw new BadRequestException("Cost center name is required");
    }

    const existingByName = await this.costCenterRepository.findOne({
      where: { name: normalizedName },
    });
    if (existingByName) {
      throw new BadRequestException("Cost center name already exists");
    }

    if (data.departmentId) {
      const department = await this.departmentRepository.findOne({
        where: { id: data.departmentId },
      });
      if (!department) throw new NotFoundException("Department not found");
    }

    if (data.managerId) {
      const manager = await this.employeeRepository.findOne({
        where: { id: data.managerId },
      });
      if (!manager) throw new NotFoundException("Employee manager not found");
    }

    const costCenter = this.costCenterRepository.create({
      code: await this.generateNextCode(),
      name: normalizedName,
      description: data.description?.trim() || null,
      departmentId: data.departmentId || null,
      managerId: data.managerId || null,
      status: data.status || "Active",
    });

    return this.costCenterRepository.save(costCenter);
  }

  async update(
    id: number,
    data: {
      name?: string;
      description?: string | null;
      departmentId?: number | null;
      managerId?: number | null;
      status?: string;
    },
  ): Promise<CostCenter> {
    const costCenter = await this.findOne(id);

    if (data.name !== undefined) {
      const normalizedName = data.name.trim();
      if (!normalizedName) {
        throw new BadRequestException("Cost center name is required");
      }

      const existingByName = await this.costCenterRepository.findOne({
        where: { name: normalizedName },
      });
      if (existingByName && existingByName.id !== id) {
        throw new BadRequestException("Cost center name already exists");
      }

      costCenter.name = normalizedName;
    }

    if (data.departmentId !== undefined) {
      if (data.departmentId) {
        const department = await this.departmentRepository.findOne({
          where: { id: data.departmentId },
        });
        if (!department) throw new NotFoundException("Department not found");
      }

      costCenter.departmentId = data.departmentId || null;
    }

    if (data.managerId !== undefined) {
      if (data.managerId) {
        const manager = await this.employeeRepository.findOne({
          where: { id: data.managerId },
        });
        if (!manager) throw new NotFoundException("Employee manager not found");
      }

      costCenter.managerId = data.managerId || null;
    }

    if (data.description !== undefined) {
      costCenter.description = data.description?.trim() || null;
    }

    if (data.status !== undefined) {
      costCenter.status = data.status;
    }

    await this.costCenterRepository.save(costCenter);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const costCenter = await this.findOne(id);
    const assignedEmployees = await this.employeeRepository.count({
      where: { costCenter: costCenter.code },
    });

    if (assignedEmployees > 0) {
      throw new BadRequestException(
        "This cost center is assigned to employees and cannot be deleted",
      );
    }

    await this.costCenterRepository.remove(costCenter);
  }

  private async generateNextCode(): Promise<string> {
    const lastCostCenter = await this.costCenterRepository.findOne({
      where: {},
      order: { id: "DESC" },
    });
    const nextId = lastCostCenter ? lastCostCenter.id + 1 : 1;
    return `CC-${String(nextId).padStart(4, "0")}`;
  }

  private async seedDefaultCostCenters(): Promise<void> {
    const existingCount = await this.costCenterRepository.count();
    if (existingCount > 0) return;

    const departmentNames = Array.from(
      new Set(DEFAULT_COST_CENTER_DEFINITIONS.map((item) => item.department)),
    );
    const existingDepartments = await this.departmentRepository.find();
    const departmentMap = new Map(
      existingDepartments.map((department) => [department.name, department]),
    );

    for (const departmentName of departmentNames) {
      if (!departmentMap.has(departmentName)) {
        const code = departmentName
          .replace(/[^A-Za-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "")
          .slice(0, 20)
          .toUpperCase();

        const department = this.departmentRepository.create({
          name: departmentName,
          description: `${departmentName} department`,
          code,
          status: "Active",
        });

        const savedDepartment = await this.departmentRepository.save(department);
        departmentMap.set(savedDepartment.name, savedDepartment);
      }
    }

    for (const definition of DEFAULT_COST_CENTER_DEFINITIONS) {
      const department = departmentMap.get(definition.department);

      const costCenter = this.costCenterRepository.create({
        code: definition.code,
        name: definition.name,
        description: `${definition.name} cost center`,
        departmentId: department?.id || null,
        status: "Active",
      });

      await this.costCenterRepository.save(costCenter);
    }
  }
}
