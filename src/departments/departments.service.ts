import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Department } from "./entities/department.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      order: { name: "ASC" },
      relations: ["representative", "members", "members.role"],
    });
  }

  async findPaginated(
    page = 1,
    limit = 10,
    search?: string,
  ): Promise<{ data: Department[]; total: number; page: number; limit: number; totalPages: number }> {
    const qb = this.departmentRepository
      .createQueryBuilder("department")
      .leftJoinAndSelect("department.representative", "representative")
      .leftJoinAndSelect("department.members", "members")
      .leftJoinAndSelect("members.role", "memberRole")
      .distinct(true);

    if (search) {
      qb.andWhere(
        "(department.name ILIKE :search OR department.description ILIKE :search OR representative.name ILIKE :search)",
        { search: `%${search}%` },
      );
    }

    const total = await qb.getCount();
    const data = await qb
      .orderBy("department.name", "ASC")
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ["representative", "members", "members.role"],
    });
    if (!department) throw new NotFoundException("Department not found");
    return department;
  }

  async create(data: {
    name: string;
    description?: string;
    representativeId?: number;
    memberIds?: number[];
  }): Promise<Department> {
    const existing = await this.departmentRepository.findOne({
      where: { name: data.name },
    });
    if (existing) throw new BadRequestException("Department name already exists");

    const memberIds = Array.from(new Set(data.memberIds || []));
    const department = this.departmentRepository.create({
      name: data.name,
      description: data.description,
      representativeId: data.representativeId || null,
    });

    if (memberIds.length > 0) {
      department.members = await this.userRepository.find({
        where: { id: In(memberIds) },
      });
    } else {
      department.members = [];
    }

    if (department.representativeId) {
      const rep = await this.userRepository.findOne({
        where: { id: department.representativeId },
      });
      if (!rep) throw new NotFoundException("Representative user not found");

      if (!department.members.some((m) => m.id === rep.id)) {
        department.members.push(rep);
      }
    }

    return this.departmentRepository.save(department);
  }

  async update(
    id: number,
    data: {
      name?: string;
      description?: string;
      representativeId?: number | null;
      memberIds?: number[];
    },
  ): Promise<Department> {
    const department = await this.findOne(id);

    if (data.name && data.name !== department.name) {
      const existing = await this.departmentRepository.findOne({
        where: { name: data.name },
      });
      if (existing && existing.id !== id) {
        throw new BadRequestException("Department name already exists");
      }
      department.name = data.name;
    }

    if (data.description !== undefined) department.description = data.description;
    if (data.representativeId !== undefined) {
      department.representativeId = data.representativeId;
    }

    if (data.memberIds !== undefined) {
      const memberIds = Array.from(new Set(data.memberIds || []));
      department.members =
        memberIds.length > 0
          ? await this.userRepository.find({ where: { id: In(memberIds) } })
          : [];
    }

    if (department.representativeId) {
      const rep = await this.userRepository.findOne({
        where: { id: department.representativeId },
      });
      if (!rep) throw new NotFoundException("Representative user not found");

      if (!department.members) department.members = [];
      if (!department.members.some((m) => m.id === rep.id)) {
        department.members.push(rep);
      }
    }

    await this.departmentRepository.save(department);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
  }
}
