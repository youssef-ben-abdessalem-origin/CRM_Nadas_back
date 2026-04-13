"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DepartmentsService", {
    enumerable: true,
    get: function() {
        return DepartmentsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _departmententity = require("./entities/department.entity");
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
let DepartmentsService = class DepartmentsService {
    async findAll() {
        return this.departmentRepository.find({
            order: {
                name: "ASC"
            },
            relations: [
                "representative",
                "members",
                "members.role"
            ]
        });
    }
    async findPaginated(page = 1, limit = 10, search) {
        const qb = this.departmentRepository.createQueryBuilder("department").leftJoinAndSelect("department.representative", "representative").leftJoinAndSelect("department.members", "members").leftJoinAndSelect("members.role", "memberRole").distinct(true);
        if (search) {
            qb.andWhere("(department.name ILIKE :search OR department.description ILIKE :search OR representative.name ILIKE :search)", {
                search: `%${search}%`
            });
        }
        const total = await qb.getCount();
        const data = await qb.orderBy("department.name", "ASC").skip((page - 1) * limit).take(limit).getMany();
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    async findOne(id) {
        const department = await this.departmentRepository.findOne({
            where: {
                id
            },
            relations: [
                "representative",
                "members",
                "members.role"
            ]
        });
        if (!department) throw new _common.NotFoundException("Department not found");
        return department;
    }
    async create(data) {
        const existing = await this.departmentRepository.findOne({
            where: {
                name: data.name
            }
        });
        if (existing) throw new _common.BadRequestException("Department name already exists");
        const memberIds = Array.from(new Set(data.memberIds || []));
        const department = this.departmentRepository.create({
            name: data.name,
            description: data.description,
            representativeId: data.representativeId || null
        });
        if (memberIds.length > 0) {
            department.members = await this.userRepository.find({
                where: {
                    id: (0, _typeorm1.In)(memberIds)
                }
            });
        } else {
            department.members = [];
        }
        if (department.representativeId) {
            const rep = await this.userRepository.findOne({
                where: {
                    id: department.representativeId
                }
            });
            if (!rep) throw new _common.NotFoundException("Representative user not found");
            if (!department.members.some((m)=>m.id === rep.id)) {
                department.members.push(rep);
            }
        }
        return this.departmentRepository.save(department);
    }
    async update(id, data) {
        const department = await this.findOne(id);
        if (data.name && data.name !== department.name) {
            const existing = await this.departmentRepository.findOne({
                where: {
                    name: data.name
                }
            });
            if (existing && existing.id !== id) {
                throw new _common.BadRequestException("Department name already exists");
            }
            department.name = data.name;
        }
        if (data.description !== undefined) department.description = data.description;
        if (data.representativeId !== undefined) {
            department.representativeId = data.representativeId;
        }
        if (data.memberIds !== undefined) {
            const memberIds = Array.from(new Set(data.memberIds || []));
            department.members = memberIds.length > 0 ? await this.userRepository.find({
                where: {
                    id: (0, _typeorm1.In)(memberIds)
                }
            }) : [];
        }
        if (department.representativeId) {
            const rep = await this.userRepository.findOne({
                where: {
                    id: department.representativeId
                }
            });
            if (!rep) throw new _common.NotFoundException("Representative user not found");
            if (!department.members) department.members = [];
            if (!department.members.some((m)=>m.id === rep.id)) {
                department.members.push(rep);
            }
        }
        await this.departmentRepository.save(department);
        return this.findOne(id);
    }
    async delete(id) {
        const department = await this.findOne(id);
        await this.departmentRepository.remove(department);
    }
    constructor(departmentRepository, userRepository){
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }
};
DepartmentsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_departmententity.Department)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userentity.User)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], DepartmentsService);

//# sourceMappingURL=departments.service.js.map