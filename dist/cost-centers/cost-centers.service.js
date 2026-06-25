"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CostCentersService", {
    enumerable: true,
    get: function() {
        return CostCentersService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _costcenterentity = require("./entities/cost-center.entity");
const _departmententity = require("../departments/entities/department.entity");
const _employeeentity = require("../hr/entities/employee.entity");
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
const DEFAULT_COST_CENTER_DEFINITIONS = [
    {
        code: "CC-0001",
        name: "Administration",
        department: "Administration"
    },
    {
        code: "CC-0002",
        name: "Human Resources",
        department: "Human Resources"
    },
    {
        code: "CC-0003",
        name: "Finance",
        department: "Finance"
    },
    {
        code: "CC-0004",
        name: "Sales",
        department: "Sales & Commercial"
    },
    {
        code: "CC-0005",
        name: "Operations",
        department: "Operations"
    },
    {
        code: "CC-0006",
        name: "Production",
        department: "Production"
    },
    {
        code: "CC-0007",
        name: "Logistics",
        department: "Supply Chain & Logistics"
    },
    {
        code: "CC-0008",
        name: "IT",
        department: "Information Technology"
    }
];
let CostCentersService = class CostCentersService {
    async onModuleInit() {
        await this.seedDefaultCostCenters();
    }
    async findAll() {
        return this.costCenterRepository.find({
            relations: [
                "department",
                "manager"
            ],
            order: {
                code: "ASC"
            }
        });
    }
    async findOne(id) {
        const costCenter = await this.costCenterRepository.findOne({
            where: {
                id
            },
            relations: [
                "department",
                "manager"
            ]
        });
        if (!costCenter) throw new _common.NotFoundException("Cost center not found");
        return costCenter;
    }
    async create(data) {
        const normalizedName = data.name.trim();
        if (!normalizedName) {
            throw new _common.BadRequestException("Cost center name is required");
        }
        const existingByName = await this.costCenterRepository.findOne({
            where: {
                name: normalizedName
            }
        });
        if (existingByName) {
            throw new _common.BadRequestException("Cost center name already exists");
        }
        if (data.departmentId) {
            const department = await this.departmentRepository.findOne({
                where: {
                    id: data.departmentId
                }
            });
            if (!department) throw new _common.NotFoundException("Department not found");
        }
        if (data.managerId) {
            const manager = await this.employeeRepository.findOne({
                where: {
                    id: data.managerId
                }
            });
            if (!manager) throw new _common.NotFoundException("Employee manager not found");
        }
        const costCenter = this.costCenterRepository.create({
            code: await this.generateNextCode(),
            name: normalizedName,
            description: data.description?.trim() || null,
            departmentId: data.departmentId || null,
            managerId: data.managerId || null,
            status: data.status || "Active"
        });
        return this.costCenterRepository.save(costCenter);
    }
    async update(id, data) {
        const costCenter = await this.findOne(id);
        if (data.name !== undefined) {
            const normalizedName = data.name.trim();
            if (!normalizedName) {
                throw new _common.BadRequestException("Cost center name is required");
            }
            const existingByName = await this.costCenterRepository.findOne({
                where: {
                    name: normalizedName
                }
            });
            if (existingByName && existingByName.id !== id) {
                throw new _common.BadRequestException("Cost center name already exists");
            }
            costCenter.name = normalizedName;
        }
        if (data.departmentId !== undefined) {
            if (data.departmentId) {
                const department = await this.departmentRepository.findOne({
                    where: {
                        id: data.departmentId
                    }
                });
                if (!department) throw new _common.NotFoundException("Department not found");
            }
            costCenter.departmentId = data.departmentId || null;
        }
        if (data.managerId !== undefined) {
            if (data.managerId) {
                const manager = await this.employeeRepository.findOne({
                    where: {
                        id: data.managerId
                    }
                });
                if (!manager) throw new _common.NotFoundException("Employee manager not found");
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
    async delete(id) {
        const costCenter = await this.findOne(id);
        const assignedEmployees = await this.employeeRepository.count({
            where: {
                costCenter: costCenter.code
            }
        });
        if (assignedEmployees > 0) {
            throw new _common.BadRequestException("This cost center is assigned to employees and cannot be deleted");
        }
        await this.costCenterRepository.remove(costCenter);
    }
    async generateNextCode() {
        const lastCostCenter = await this.costCenterRepository.findOne({
            where: {},
            order: {
                id: "DESC"
            }
        });
        const nextId = lastCostCenter ? lastCostCenter.id + 1 : 1;
        return `CC-${String(nextId).padStart(4, "0")}`;
    }
    async seedDefaultCostCenters() {
        const existingCount = await this.costCenterRepository.count();
        if (existingCount > 0) return;
        const departmentNames = Array.from(new Set(DEFAULT_COST_CENTER_DEFINITIONS.map((item)=>item.department)));
        const existingDepartments = await this.departmentRepository.find();
        const departmentMap = new Map(existingDepartments.map((department)=>[
                department.name,
                department
            ]));
        for (const departmentName of departmentNames){
            if (!departmentMap.has(departmentName)) {
                const code = departmentName.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 20).toUpperCase();
                const department = this.departmentRepository.create({
                    name: departmentName,
                    description: `${departmentName} department`,
                    code,
                    status: "Active"
                });
                const savedDepartment = await this.departmentRepository.save(department);
                departmentMap.set(savedDepartment.name, savedDepartment);
            }
        }
        for (const definition of DEFAULT_COST_CENTER_DEFINITIONS){
            const department = departmentMap.get(definition.department);
            const costCenter = this.costCenterRepository.create({
                code: definition.code,
                name: definition.name,
                description: `${definition.name} cost center`,
                departmentId: department?.id || null,
                status: "Active"
            });
            await this.costCenterRepository.save(costCenter);
        }
    }
    constructor(costCenterRepository, departmentRepository, employeeRepository){
        this.costCenterRepository = costCenterRepository;
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }
};
CostCentersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_costcenterentity.CostCenter)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_departmententity.Department)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_employeeentity.Employee)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CostCentersService);

//# sourceMappingURL=cost-centers.service.js.map