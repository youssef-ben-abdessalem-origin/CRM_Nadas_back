"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HrService", {
    enumerable: true,
    get: function() {
        return HrService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _employeeentity = require("./entities/employee.entity");
const _positionentity = require("./entities/position.entity");
const _contractentity = require("./entities/contract.entity");
const _attendanceentity = require("./entities/attendance.entity");
const _leavetypeentity = require("./entities/leave-type.entity");
const _leaverequestentity = require("./entities/leave-request.entity");
const _employeedocumententity = require("./entities/employee-document.entity");
const _cnssprofileentity = require("./entities/cnss-profile.entity");
const _irpptaxprofileentity = require("./entities/irpp-tax-profile.entity");
const _shiftentity = require("./entities/shift.entity");
const _shiftassignmententity = require("./entities/shift-assignment.entity");
const _overtimerequestentity = require("./entities/overtime-request.entity");
const _leavebalanceentity = require("./entities/leave-balance.entity");
const _kpientity = require("./entities/kpi.entity");
const _kpiassignmententity = require("./entities/kpi-assignment.entity");
const _goalentity = require("./entities/goal.entity");
const _performancereviewentity = require("./entities/performance-review.entity");
const _vacationaccrualruleentity = require("./entities/vacation-accrual-rule.entity");
const _hrsettingsentity = require("./entities/hr-settings.entity");
const _departmententity = require("../departments/entities/department.entity");
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
const DEFAULT_POSITION_DEFINITIONS = [
    {
        title: "Chief Executive Officer (CEO)",
        department: "Executive Management"
    },
    {
        title: "General Manager",
        department: "Executive Management"
    },
    {
        title: "Deputy General Manager",
        department: "Executive Management"
    },
    {
        title: "Operations Director",
        department: "Operations"
    },
    {
        title: "HR Director",
        department: "Human Resources"
    },
    {
        title: "Finance Director",
        department: "Finance"
    },
    {
        title: "Commercial Director",
        department: "Sales & Commercial"
    },
    {
        title: "Technical Director",
        department: "Technical & Engineering"
    },
    {
        title: "Branch Manager",
        department: "Operations"
    },
    {
        title: "Regional Manager",
        department: "Operations"
    },
    {
        title: "HR Manager",
        department: "Human Resources"
    },
    {
        title: "HR Officer",
        department: "Human Resources"
    },
    {
        title: "HR Assistant",
        department: "Human Resources"
    },
    {
        title: "Recruitment Specialist",
        department: "Human Resources"
    },
    {
        title: "Talent Acquisition Officer",
        department: "Human Resources"
    },
    {
        title: "Training Officer",
        department: "Human Resources"
    },
    {
        title: "Personnel Administration Officer",
        department: "Human Resources"
    },
    {
        title: "Payroll Manager",
        department: "Finance"
    },
    {
        title: "Payroll Officer",
        department: "Finance"
    },
    {
        title: "Payroll Assistant",
        department: "Finance"
    },
    {
        title: "Accountant",
        department: "Finance"
    },
    {
        title: "Senior Accountant",
        department: "Finance"
    },
    {
        title: "Junior Accountant",
        department: "Finance"
    },
    {
        title: "Chief Accountant",
        department: "Finance"
    },
    {
        title: "Financial Controller",
        department: "Finance"
    },
    {
        title: "Treasury Officer",
        department: "Finance"
    },
    {
        title: "Cost Controller",
        department: "Finance"
    },
    {
        title: "Billing Officer",
        department: "Finance"
    },
    {
        title: "Cashier",
        department: "Finance"
    },
    {
        title: "Finance Assistant",
        department: "Finance"
    },
    {
        title: "Sales Manager",
        department: "Sales & Commercial"
    },
    {
        title: "Sales Executive",
        department: "Sales & Commercial"
    },
    {
        title: "Sales Representative",
        department: "Sales & Commercial"
    },
    {
        title: "Commercial Agent",
        department: "Sales & Commercial"
    },
    {
        title: "Business Development Manager",
        department: "Sales & Commercial"
    },
    {
        title: "Key Account Manager",
        department: "Sales & Commercial"
    },
    {
        title: "Customer Relationship Manager",
        department: "Sales & Commercial"
    },
    {
        title: "Sales Assistant",
        department: "Sales & Commercial"
    },
    {
        title: "Marketing Manager",
        department: "Marketing & Communication"
    },
    {
        title: "Marketing Officer",
        department: "Marketing & Communication"
    },
    {
        title: "Digital Marketing Specialist",
        department: "Marketing & Communication"
    },
    {
        title: "Social Media Manager",
        department: "Marketing & Communication"
    },
    {
        title: "Communication Officer",
        department: "Marketing & Communication"
    },
    {
        title: "Graphic Designer",
        department: "Marketing & Communication"
    },
    {
        title: "IT Manager",
        department: "Information Technology"
    },
    {
        title: "IT Support Specialist",
        department: "Information Technology"
    },
    {
        title: "System Administrator",
        department: "Information Technology"
    },
    {
        title: "Network Administrator",
        department: "Information Technology"
    },
    {
        title: "Software Developer",
        department: "Information Technology"
    },
    {
        title: "Web Developer",
        department: "Information Technology"
    },
    {
        title: "Database Administrator",
        department: "Information Technology"
    },
    {
        title: "ERP Administrator",
        department: "Information Technology"
    },
    {
        title: "Cybersecurity Officer",
        department: "Information Technology"
    },
    {
        title: "Help Desk Technician",
        department: "Information Technology"
    },
    {
        title: "Administrative Manager",
        department: "Administration"
    },
    {
        title: "Administrative Assistant",
        department: "Administration"
    },
    {
        title: "Office Manager",
        department: "Administration"
    },
    {
        title: "Receptionist",
        department: "Administration"
    },
    {
        title: "Secretary",
        department: "Administration"
    },
    {
        title: "Document Controller",
        department: "Administration"
    },
    {
        title: "Data Entry Operator",
        department: "Administration"
    },
    {
        title: "Legal Assistant",
        department: "Administration"
    },
    {
        title: "Operations Manager",
        department: "Operations"
    },
    {
        title: "Operations Officer",
        department: "Operations"
    },
    {
        title: "Production Manager",
        department: "Production"
    },
    {
        title: "Production Supervisor",
        department: "Production"
    },
    {
        title: "Production Operator",
        department: "Production"
    },
    {
        title: "Quality Manager",
        department: "Production"
    },
    {
        title: "Quality Control Officer",
        department: "Production"
    },
    {
        title: "Maintenance Manager",
        department: "Technical & Engineering"
    },
    {
        title: "Maintenance Technician",
        department: "Technical & Engineering"
    },
    {
        title: "Industrial Engineer",
        department: "Technical & Engineering"
    },
    {
        title: "Process Engineer",
        department: "Technical & Engineering"
    },
    {
        title: "Technical Manager",
        department: "Technical & Engineering"
    },
    {
        title: "Engineer",
        department: "Technical & Engineering"
    },
    {
        title: "Senior Technician",
        department: "Technical & Engineering"
    },
    {
        title: "Technician",
        department: "Technical & Engineering"
    },
    {
        title: "Workshop Supervisor",
        department: "Technical & Engineering"
    },
    {
        title: "Installer",
        department: "Technical & Engineering"
    },
    {
        title: "Supply Chain Manager",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Logistics Manager",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Warehouse Manager",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Warehouse Officer",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Stock Controller",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Inventory Clerk",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Procurement Manager",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Procurement Officer",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Buyer",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Delivery Coordinator",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Driver",
        department: "Supply Chain & Logistics"
    },
    {
        title: "Customer Service Manager",
        department: "Customer Service"
    },
    {
        title: "Customer Service Representative",
        department: "Customer Service"
    },
    {
        title: "Call Center Agent",
        department: "Customer Service"
    },
    {
        title: "Support Agent",
        department: "Customer Service"
    },
    {
        title: "After Sales Officer",
        department: "Customer Service"
    },
    {
        title: "Security Supervisor",
        department: "Security & Facilities"
    },
    {
        title: "Security Agent",
        department: "Security & Facilities"
    },
    {
        title: "Cleaner",
        department: "Security & Facilities"
    },
    {
        title: "Facility Manager",
        department: "Security & Facilities"
    },
    {
        title: "General Worker",
        department: "Operations"
    }
];
const DEFAULT_SHIFT_DEFINITIONS = [
    {
        code: "SHIFT-001",
        name: "Standard Office Shift",
        startTime: "08:00",
        endTime: "17:00",
        breakDuration: 60,
        description: "Break: 12:00 - 13:00",
        color: "#2563EB",
        flexible: false
    },
    {
        code: "SHIFT-002",
        name: "Morning Shift",
        startTime: "06:00",
        endTime: "14:00",
        breakDuration: 30,
        description: "Break: 10:00 - 10:30",
        color: "#0EA5E9",
        flexible: false
    },
    {
        code: "SHIFT-003",
        name: "Afternoon Shift",
        startTime: "14:00",
        endTime: "22:00",
        breakDuration: 30,
        description: "Break: 18:00 - 18:30",
        color: "#F97316",
        flexible: false
    },
    {
        code: "SHIFT-004",
        name: "Night Shift",
        startTime: "22:00",
        endTime: "06:00",
        breakDuration: 30,
        description: "Break: 02:00 - 02:30",
        color: "#4338CA",
        flexible: false
    },
    {
        code: "SHIFT-005",
        name: "Full Day Shift",
        startTime: "08:00",
        endTime: "18:00",
        breakDuration: 60,
        description: "Break: 13:00 - 14:00",
        color: "#16A34A",
        flexible: false
    },
    {
        code: "SHIFT-006",
        name: "Half Day Morning",
        startTime: "08:00",
        endTime: "12:00",
        breakDuration: 0,
        description: "No break",
        color: "#14B8A6",
        flexible: false
    },
    {
        code: "SHIFT-007",
        name: "Half Day Afternoon",
        startTime: "13:00",
        endTime: "17:00",
        breakDuration: 0,
        description: "No break",
        color: "#06B6D4",
        flexible: false
    },
    {
        code: "SHIFT-008",
        name: "Flexible Shift",
        startTime: "07:00",
        endTime: "16:00",
        breakDuration: 60,
        description: "Break: 12:00 - 13:00",
        color: "#8B5CF6",
        flexible: true
    },
    {
        code: "SHIFT-009",
        name: "Retail Shift",
        startTime: "09:00",
        endTime: "18:00",
        breakDuration: 60,
        description: "Break: 13:00 - 14:00",
        color: "#EC4899",
        flexible: false
    },
    {
        code: "SHIFT-010",
        name: "Commercial Shift",
        startTime: "09:00",
        endTime: "17:00",
        breakDuration: 60,
        description: "Break: 12:30 - 13:30",
        color: "#F59E0B",
        flexible: false
    },
    {
        code: "SHIFT-011",
        name: "Factory Shift A",
        startTime: "06:00",
        endTime: "14:00",
        breakDuration: 30,
        description: "Break: 30 min",
        color: "#22C55E",
        flexible: false
    },
    {
        code: "SHIFT-012",
        name: "Factory Shift B",
        startTime: "14:00",
        endTime: "22:00",
        breakDuration: 30,
        description: "Break: 30 min",
        color: "#FB7185",
        flexible: false
    },
    {
        code: "SHIFT-013",
        name: "Factory Shift C",
        startTime: "22:00",
        endTime: "06:00",
        breakDuration: 30,
        description: "Break: 30 min",
        color: "#6366F1",
        flexible: false
    },
    {
        code: "SHIFT-014",
        name: "Security 12H Day",
        startTime: "07:00",
        endTime: "19:00",
        breakDuration: 0,
        description: "No break",
        color: "#DC2626",
        flexible: false
    },
    {
        code: "SHIFT-015",
        name: "Security 12H Night",
        startTime: "19:00",
        endTime: "07:00",
        breakDuration: 0,
        description: "No break",
        color: "#7C3AED",
        flexible: false
    }
];
let HrService = class HrService {
    async onModuleInit() {
        await this.seedLeaveTypes();
        await this.seedDefaultPositions();
        await this.seedDefaultShifts();
    }
    // ==================== EMPLOYEES ====================
    async findEmployees(search, departmentId, status, includeDrafts = false) {
        const qb = this.employeeRepository.createQueryBuilder("employee").leftJoinAndSelect("employee.department", "department").leftJoinAndSelect("employee.position", "position").leftJoinAndSelect("employee.manager", "manager");
        if (search) {
            qb.andWhere("(employee.firstName ILIKE :search OR employee.lastName ILIKE :search OR employee.employeeNumber ILIKE :search OR employee.cin ILIKE :search)", {
                search: `%${search}%`
            });
        }
        if (departmentId) {
            qb.andWhere("employee.departmentId = :departmentId", {
                departmentId
            });
        }
        if (status) {
            qb.andWhere("employee.status = :status", {
                status
            });
        } else if (!includeDrafts) {
            qb.andWhere("employee.status != :draftStatus", {
                draftStatus: "Draft"
            });
        }
        return qb.orderBy("employee.employeeNumber", "ASC").getMany();
    }
    async findOneEmployee(id) {
        const employee = await this.employeeRepository.findOne({
            where: {
                id
            },
            relations: [
                "department",
                "position",
                "manager",
                "contracts"
            ]
        });
        if (!employee) throw new _common.NotFoundException("Employee not found");
        return employee;
    }
    async createEmployee(data) {
        if (!data.employeeNumber) {
            const lastEmployee = await this.employeeRepository.findOne({
                where: {},
                order: {
                    id: "DESC"
                }
            });
            const nextId = lastEmployee ? lastEmployee.id + 1 : 1;
            data.employeeNumber = `EMP-${String(nextId).padStart(4, "0")}`;
        }
        const employee = this.employeeRepository.create(data);
        return this.employeeRepository.save(employee);
    }
    async createEmployeeDraft(data) {
        const employeeNumber = await this.generateNextEmployeeNumber();
        const now = Date.now();
        const employee = this.employeeRepository.create({
            employeeNumber,
            firstName: data.firstName?.trim() || "Draft",
            lastName: data.lastName?.trim() || employeeNumber,
            cin: data.cin?.trim() || `DRAFT-${now}`,
            dateOfBirth: data.dateOfBirth || "1900-01-01",
            placeOfBirth: data.placeOfBirth || null,
            gender: data.gender || "Male",
            nationality: data.nationality || "Tunisian",
            maritalStatus: data.maritalStatus || "Single",
            childrenCount: data.childrenCount || 0,
            email: data.email || null,
            workEmail: data.workEmail || null,
            phone: data.phone || "Draft",
            cnssNumber: data.cnssNumber || null,
            passportNumber: data.passportNumber || null,
            emergencyContactName: data.emergencyContactName || null,
            emergencyContactPhone: data.emergencyContactPhone || null,
            education: data.education || null,
            skills: data.skills || null,
            certifications: data.certifications || null,
            address: data.address || null,
            city: data.city || null,
            postalCode: data.postalCode || null,
            hireDate: data.hireDate || new Date().toISOString().split("T")[0],
            workLocation: data.workLocation || null,
            costCenter: data.costCenter || null,
            employmentCategory: data.employmentCategory || null,
            attendanceMode: data.attendanceMode || null,
            departmentId: data.departmentId || null,
            positionId: data.positionId || null,
            managerId: data.managerId || null,
            status: "Draft",
            readinessStatus: "Draft",
            photo: data.photo || null,
            residenceCardNumber: data.residenceCardNumber || null,
            residenceCardExpiry: data.residenceCardExpiry || null,
            workPermitType: data.workPermitType || null,
            workPermitNumber: data.workPermitNumber || null,
            workPermitStatus: data.workPermitStatus || null,
            workPermitExpiry: data.workPermitExpiry || null
        });
        return this.employeeRepository.save(employee);
    }
    async updateEmployee(id, data) {
        const employee = await this.findOneEmployee(id);
        Object.assign(employee, data);
        return this.employeeRepository.save(employee);
    }
    async updateEmployeeDraft(id, data) {
        const employee = await this.findOneEmployee(id);
        Object.assign(employee, {
            ...data,
            firstName: data.firstName?.trim() || employee.firstName || "Draft",
            lastName: data.lastName?.trim() || employee.lastName || employee.employeeNumber,
            cin: data.cin?.trim() || employee.cin,
            dateOfBirth: data.dateOfBirth || employee.dateOfBirth || "1900-01-01",
            gender: data.gender || employee.gender || "Male",
            nationality: data.nationality || employee.nationality || "Tunisian",
            phone: data.phone || employee.phone || "Draft",
            hireDate: data.hireDate || employee.hireDate || new Date().toISOString().split("T")[0],
            status: "Draft",
            readinessStatus: "Draft"
        });
        return this.employeeRepository.save(employee);
    }
    async deleteEmployee(id) {
        const employee = await this.findOneEmployee(id);
        await this.employeeRepository.remove(employee);
    }
    // ==================== POSITIONS ====================
    async findPositions() {
        return this.positionRepository.find({
            relations: [
                "department"
            ]
        });
    }
    async findOnePosition(id) {
        const pos = await this.positionRepository.findOne({
            where: {
                id
            },
            relations: [
                "department"
            ]
        });
        if (!pos) throw new _common.NotFoundException("Position not found");
        return pos;
    }
    async createPosition(data) {
        if (!data.code) {
            const lastPos = await this.positionRepository.findOne({
                where: {},
                order: {
                    id: "DESC"
                }
            });
            const nextId = lastPos ? lastPos.id + 1 : 1;
            data.code = `POS-${String(nextId).padStart(4, "0")}`;
        }
        const pos = this.positionRepository.create(data);
        return this.positionRepository.save(pos);
    }
    async seedDefaultShifts() {
        const existingCount = await this.shiftRepository.count();
        if (existingCount > 0) return;
        for (const definition of DEFAULT_SHIFT_DEFINITIONS){
            const shift = this.shiftRepository.create({
                code: definition.code,
                name: definition.name,
                startTime: definition.startTime,
                endTime: definition.endTime,
                breakDuration: definition.breakDuration,
                description: definition.description,
                color: definition.color,
                flexible: definition.flexible
            });
            await this.shiftRepository.save(shift);
        }
    }
    async seedDefaultPositions() {
        const existingCount = await this.positionRepository.count();
        if (existingCount > 0) return;
        const departmentNames = Array.from(new Set(DEFAULT_POSITION_DEFINITIONS.map((position)=>position.department)));
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
        for(let index = 0; index < DEFAULT_POSITION_DEFINITIONS.length; index += 1){
            const definition = DEFAULT_POSITION_DEFINITIONS[index];
            const department = departmentMap.get(definition.department);
            if (!department) continue;
            const code = `POS-${String(index + 1).padStart(4, "0")}`;
            const position = this.positionRepository.create({
                code,
                title: definition.title,
                departmentId: department.id,
                description: `${definition.title} role in ${definition.department}`,
                status: "Active"
            });
            await this.positionRepository.save(position);
        }
    }
    async updatePosition(id, data) {
        const pos = await this.findOnePosition(id);
        Object.assign(pos, data);
        return this.positionRepository.save(pos);
    }
    async deletePosition(id) {
        const pos = await this.findOnePosition(id);
        await this.positionRepository.remove(pos);
    }
    // ==================== CONTRACTS ====================
    async findContracts(employeeId) {
        return this.contractRepository.find({
            where: employeeId ? {
                employeeId
            } : {},
            relations: [
                "employee"
            ]
        });
    }
    async findOneContract(id) {
        const contract = await this.contractRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee"
            ]
        });
        if (!contract) throw new _common.NotFoundException("Contract not found");
        return contract;
    }
    async createContract(data) {
        if (!data.contractNumber) {
            data.contractNumber = await this.generateNextContractNumber();
        }
        const contract = this.contractRepository.create(data);
        return this.contractRepository.save(contract);
    }
    async updateContract(id, data) {
        const contract = await this.findOneContract(id);
        Object.assign(contract, data);
        return this.contractRepository.save(contract);
    }
    async deleteContract(id) {
        const contract = await this.findOneContract(id);
        await this.contractRepository.remove(contract);
    }
    async setContractActive(id) {
        const contract = await this.findOneContract(id);
        await this.contractRepository.createQueryBuilder().update(_contractentity.Contract).set({
            status: "Inactive"
        }).where("employeeId = :employeeId", {
            employeeId: contract.employeeId
        }).andWhere("id != :id", {
            id
        }).andWhere("status = :status", {
            status: "Active"
        }).execute();
        contract.status = "Active";
        return this.contractRepository.save(contract);
    }
    async archiveContract(id) {
        const contract = await this.findOneContract(id);
        contract.status = "Archived";
        return this.contractRepository.save(contract);
    }
    async terminateContract(id, data) {
        const contract = await this.findOneContract(id);
        contract.endDate = data.endDate ? new Date(data.endDate) : new Date();
        contract.status = data.status || "Ended";
        return this.contractRepository.save(contract);
    }
    async renewContract(id, data) {
        const contract = await this.findOneContract(id);
        const renewedContract = this.contractRepository.create({
            employeeId: contract.employeeId,
            contractNumber: await this.generateRenewedContractNumber(contract.contractNumber),
            contractType: data.contractType || contract.contractType,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
            probationEndDate: data.probationEndDate ? new Date(data.probationEndDate) : null,
            baseSalary: data.baseSalary !== undefined ? data.baseSalary : contract.baseSalary,
            workingHoursPerWeek: data.workingHoursPerWeek !== undefined ? data.workingHoursPerWeek : contract.workingHoursPerWeek,
            status: "Draft"
        });
        return this.contractRepository.save(renewedContract);
    }
    // ==================== ATTENDANCE ====================
    async findAttendance(employeeId, startDate, endDate) {
        const qb = this.attendanceRepository.createQueryBuilder("att").leftJoinAndSelect("att.employee", "employee");
        if (employeeId) {
            qb.andWhere("att.employeeId = :employeeId", {
                employeeId
            });
        }
        if (startDate) {
            qb.andWhere("att.workDate >= :startDate", {
                startDate
            });
        }
        if (endDate) {
            qb.andWhere("att.workDate <= :endDate", {
                endDate
            });
        }
        return qb.orderBy("att.workDate", "DESC").getMany();
    }
    async logAttendance(data) {
        const normalizedData = await this.normalizeAttendanceData(data);
        // If it exists, update it, else create
        let att = await this.attendanceRepository.findOne({
            where: {
                employeeId: normalizedData.employeeId,
                workDate: normalizedData.workDate
            }
        });
        if (att) {
            Object.assign(att, normalizedData);
        } else {
            att = this.attendanceRepository.create(normalizedData);
        }
        return this.attendanceRepository.save(att);
    }
    async deleteAttendance(id) {
        const att = await this.attendanceRepository.findOne({
            where: {
                id
            }
        });
        if (!att) throw new _common.NotFoundException("Attendance log not found");
        await this.attendanceRepository.remove(att);
    }
    async normalizeAttendanceData(data) {
        const normalized = {
            ...data,
            source: data.source || "Manual Entry",
            notes: data.notes || null
        };
        const nonWorkingStatuses = new Set([
            "Absent",
            "Leave",
            "Holiday",
            "Weekend",
            "Suspended"
        ]);
        if (!normalized.employeeId || !normalized.workDate) {
            return normalized;
        }
        const workDateString = typeof normalized.workDate === "string" ? normalized.workDate : normalized.workDate.toISOString().split("T")[0];
        const shiftAssignment = await this.shiftAssignmentRepository.createQueryBuilder("assignment").leftJoinAndSelect("assignment.shift", "shift").where("assignment.employeeId = :employeeId", {
            employeeId: normalized.employeeId
        }).andWhere("assignment.startDate <= :workDate", {
            workDate: workDateString
        }).andWhere("(assignment.endDate IS NULL OR assignment.endDate >= :workDate)", {
            workDate: workDateString
        }).orderBy("assignment.startDate", "DESC").getOne();
        const shift = shiftAssignment?.shift;
        normalized.shiftName = shift?.name || null;
        if (normalized.status && nonWorkingStatuses.has(normalized.status)) {
            normalized.checkIn = null;
            normalized.checkOut = null;
            normalized.workedHours = 0;
            normalized.overtimeHours = 0;
            normalized.lateMinutes = 0;
            normalized.earlyDepartureMinutes = 0;
            return normalized;
        }
        const breakHours = shift ? Number(shift.breakDuration || 0) / 60 : 0;
        if (normalized.checkIn && normalized.checkOut) {
            const workedHours = this.calculateWorkedHours(normalized.checkIn, normalized.checkOut, breakHours);
            normalized.workedHours = workedHours;
            if (shift) {
                const expectedHours = this.calculateWorkedHours(shift.startTime, shift.endTime, breakHours);
                normalized.overtimeHours = Math.max(0, Number((workedHours - expectedHours).toFixed(2)));
                normalized.lateMinutes = this.calculateLateMinutes(normalized.checkIn, shift.startTime);
                normalized.earlyDepartureMinutes = this.calculateEarlyDepartureMinutes(normalized.checkOut, shift.endTime);
            } else {
                normalized.overtimeHours = normalized.overtimeHours || 0;
                normalized.lateMinutes = 0;
                normalized.earlyDepartureMinutes = 0;
            }
        } else {
            normalized.workedHours = normalized.workedHours ?? 0;
            normalized.overtimeHours = normalized.overtimeHours ?? 0;
            normalized.lateMinutes = 0;
            normalized.earlyDepartureMinutes = 0;
        }
        return normalized;
    }
    // ==================== LEAVE TYPES ====================
    async findLeaveTypes() {
        return this.leaveTypeRepository.find();
    }
    async findOneLeaveType(id) {
        const lt = await this.leaveTypeRepository.findOne({
            where: {
                id
            }
        });
        if (!lt) throw new _common.NotFoundException("Leave type not found");
        return lt;
    }
    async createLeaveType(data) {
        const lt = this.leaveTypeRepository.create(data);
        return this.leaveTypeRepository.save(lt);
    }
    async updateLeaveType(id, data) {
        const lt = await this.findOneLeaveType(id);
        Object.assign(lt, data);
        return this.leaveTypeRepository.save(lt);
    }
    async deleteLeaveType(id) {
        const lt = await this.findOneLeaveType(id);
        await this.leaveTypeRepository.remove(lt);
    }
    // ==================== LEAVE REQUESTS ====================
    async findLeaveRequests(employeeId, status) {
        return this.leaveRequestRepository.find({
            where: {
                ...employeeId ? {
                    employeeId
                } : {},
                ...status ? {
                    status
                } : {}
            },
            relations: [
                "employee",
                "leaveType"
            ],
            order: {
                createdAt: "DESC"
            }
        });
    }
    async findOneLeaveRequest(id) {
        const lr = await this.leaveRequestRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee",
                "leaveType"
            ]
        });
        if (!lr) throw new _common.NotFoundException("Leave request not found");
        return lr;
    }
    async createLeaveRequest(data) {
        const lr = this.leaveRequestRepository.create(data);
        return this.leaveRequestRepository.save(lr);
    }
    async updateLeaveRequest(id, data) {
        const lr = await this.findOneLeaveRequest(id);
        Object.assign(lr, data);
        return this.leaveRequestRepository.save(lr);
    }
    async deleteLeaveRequest(id) {
        const lr = await this.findOneLeaveRequest(id);
        await this.leaveRequestRepository.remove(lr);
    }
    // ==================== EMPLOYEE DOCUMENTS ====================
    async findDocuments(employeeId) {
        return this.documentRepository.find({
            where: employeeId ? {
                employeeId
            } : {},
            relations: [
                "employee"
            ],
            order: {
                createdAt: "DESC"
            }
        });
    }
    async findOneDocument(id) {
        const doc = await this.documentRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee"
            ]
        });
        if (!doc) throw new _common.NotFoundException("Document not found");
        return doc;
    }
    async createDocument(file, meta) {
        let fileUrl = null;
        let fileName = null;
        if (file) {
            fileName = file.originalname;
            const result = await this.cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
                folder: `nexus-crm/hr/documents/${meta.employeeId}`
            });
            fileUrl = result.secure_url;
        }
        const doc = this.documentRepository.create({
            employeeId: meta.employeeId,
            documentType: meta.documentType,
            expiryDate: meta.expiryDate || null,
            notes: meta.notes || null,
            fileName,
            fileUrl
        });
        return this.documentRepository.save(doc);
    }
    async updateDocument(id, data) {
        const doc = await this.findOneDocument(id);
        Object.assign(doc, data);
        return this.documentRepository.save(doc);
    }
    async deleteDocument(id) {
        const doc = await this.findOneDocument(id);
        await this.documentRepository.remove(doc);
    }
    // ==================== CNSS PROFILES ====================
    async findCnssProfiles() {
        return this.cnssProfileRepository.find({
            relations: [
                "employee"
            ]
        });
    }
    async findOneCnssProfile(id) {
        const profile = await this.cnssProfileRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee"
            ]
        });
        if (!profile) throw new _common.NotFoundException("CNSS profile not found");
        return profile;
    }
    async findOneCnssProfileByEmployee(employeeId) {
        const profile = await this.cnssProfileRepository.findOne({
            where: {
                employeeId
            },
            relations: [
                "employee"
            ]
        });
        if (!profile) throw new _common.NotFoundException("CNSS profile not found for employee");
        return profile;
    }
    async createOrUpdateCnssProfile(employeeId, data) {
        let profile = await this.cnssProfileRepository.findOne({
            where: {
                employeeId
            }
        });
        if (profile) {
            Object.assign(profile, data);
        } else {
            profile = this.cnssProfileRepository.create({
                ...data,
                employeeId
            });
        }
        return this.cnssProfileRepository.save(profile);
    }
    // ==================== IRPP TAX PROFILES ====================
    async findIrppTaxProfiles() {
        return this.irppTaxProfileRepository.find({
            relations: [
                "employee"
            ]
        });
    }
    async findOneIrppTaxProfile(id) {
        const profile = await this.irppTaxProfileRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee"
            ]
        });
        if (!profile) throw new _common.NotFoundException("IRPP tax profile not found");
        return profile;
    }
    async findOneIrppTaxProfileByEmployee(employeeId) {
        const profile = await this.irppTaxProfileRepository.findOne({
            where: {
                employeeId
            },
            relations: [
                "employee"
            ]
        });
        if (!profile) throw new _common.NotFoundException("IRPP tax profile not found for employee");
        return profile;
    }
    async createOrUpdateIrppTaxProfile(employeeId, data) {
        let profile = await this.irppTaxProfileRepository.findOne({
            where: {
                employeeId
            }
        });
        const maritalStatus = data.maritalStatus || profile?.maritalStatus || "Single";
        const childrenCount = data.childrenCount ?? profile?.childrenCount ?? 0;
        const disabledDependents = data.disabledDependents ?? profile?.disabledDependents ?? 0;
        const taxExemptions = (maritalStatus === "Married" ? 300 : 0) + childrenCount * 100 + disabledDependents * 100;
        if (profile) {
            Object.assign(profile, {
                ...data,
                taxExemptions
            });
        } else {
            profile = this.irppTaxProfileRepository.create({
                ...data,
                employeeId,
                taxExemptions
            });
        }
        return this.irppTaxProfileRepository.save(profile);
    }
    // ==================== SHIFTS ====================
    async findShifts() {
        return this.shiftRepository.find();
    }
    async findOneShift(id) {
        const shift = await this.shiftRepository.findOne({
            where: {
                id
            }
        });
        if (!shift) throw new _common.NotFoundException("Shift not found");
        return shift;
    }
    async createShift(data) {
        if (!data.code) {
            const lastShift = await this.shiftRepository.findOne({
                where: {},
                order: {
                    id: "DESC"
                }
            });
            const nextId = lastShift ? lastShift.id + 1 : 1;
            data.code = `SHIFT-${String(nextId).padStart(3, "0")}`;
        }
        const shift = this.shiftRepository.create(data);
        return this.shiftRepository.save(shift);
    }
    async updateShift(id, data) {
        const shift = await this.findOneShift(id);
        Object.assign(shift, data);
        return this.shiftRepository.save(shift);
    }
    async deleteShift(id) {
        const shift = await this.findOneShift(id);
        await this.shiftRepository.remove(shift);
    }
    // ==================== SHIFT ASSIGNMENTS ====================
    async findShiftAssignments(employeeId) {
        return this.shiftAssignmentRepository.find({
            where: employeeId ? {
                employeeId
            } : {},
            relations: [
                "employee",
                "shift"
            ],
            order: {
                startDate: "DESC"
            }
        });
    }
    async findOneShiftAssignment(id) {
        const sa = await this.shiftAssignmentRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee",
                "shift"
            ]
        });
        if (!sa) throw new _common.NotFoundException("Shift assignment not found");
        return sa;
    }
    async createShiftAssignment(data) {
        const sa = this.shiftAssignmentRepository.create(data);
        return this.shiftAssignmentRepository.save(sa);
    }
    async updateShiftAssignment(id, data) {
        const sa = await this.findOneShiftAssignment(id);
        Object.assign(sa, data);
        return this.shiftAssignmentRepository.save(sa);
    }
    async deleteShiftAssignment(id) {
        const sa = await this.findOneShiftAssignment(id);
        await this.shiftAssignmentRepository.remove(sa);
    }
    // ==================== OVERTIME REQUESTS (Company-Initiated) ====================
    async getHrSettings() {
        let settings = await this.hrSettingsRepository.findOne({
            where: {}
        });
        if (!settings) {
            settings = this.hrSettingsRepository.create({
                overtimeWeekdayRate: 1.25,
                overtimeNightRate: 1.50,
                overtimeRestDayRate: 2.00,
                nightStartHour: 21,
                nightEndHour: 5,
                leaveYearEndPolicy: "carry_forward",
                leaveCashOutRate: 0,
                maxCarryForwardDays: 30
            });
            await this.hrSettingsRepository.save(settings);
        }
        // Fix any null values from schema changes
        if (settings.leaveYearEndPolicy == null) settings.leaveYearEndPolicy = "carry_forward";
        if (settings.leaveCashOutRate == null) settings.leaveCashOutRate = 0;
        if (settings.maxCarryForwardDays == null) settings.maxCarryForwardDays = 30;
        return settings;
    }
    async updateHrSettings(data) {
        const settings = await this.getHrSettings();
        Object.assign(settings, data);
        return this.hrSettingsRepository.save(settings);
    }
    async findOvertimeRequests(employeeId, status) {
        return this.overtimeRequestRepository.find({
            where: {
                ...employeeId ? {
                    employeeId
                } : {},
                ...status ? {
                    status
                } : {}
            },
            relations: [
                "employee",
                "approvedBy",
                "assignedBy"
            ],
            order: {
                createdAt: "DESC"
            }
        });
    }
    async findOneOvertimeRequest(id) {
        const ot = await this.overtimeRequestRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee",
                "approvedBy",
                "assignedBy"
            ]
        });
        if (!ot) throw new _common.NotFoundException("Overtime request not found");
        return ot;
    }
    async findEmployeeByEmail(email) {
        return this.employeeRepository.findOne({
            where: {
                email
            },
            relations: [
                "position",
                "manager"
            ]
        });
    }
    async createOvertimeRequest(data) {
        const settings = await this.getHrSettings();
        if (data.category && !data.multiplier) {
            const rateMap = {
                weekday: Number(settings.overtimeWeekdayRate),
                night: Number(settings.overtimeNightRate),
                restDay: Number(settings.overtimeRestDayRate)
            };
            data.multiplier = rateMap[data.category] || 1.25;
        }
        if (!data.category) data.category = "weekday";
        if (!data.multiplier) data.multiplier = 1.25;
        if (!data.approvalAuthority) data.approvalAuthority = "manager";
        if (data.approvalAuthority === "manager" && data.employeeId) {
            const emp = await this.employeeRepository.findOne({
                where: {
                    id: data.employeeId
                },
                relations: [
                    "manager"
                ]
            });
            if (emp?.managerId) {
                data.assignedManagerId = emp.managerId;
            }
        }
        const ot = this.overtimeRequestRepository.create(data);
        return this.overtimeRequestRepository.save(ot);
    }
    async updateOvertimeRequest(id, data) {
        const ot = await this.findOneOvertimeRequest(id);
        if (data.category && !data.multiplier) {
            const settings = await this.getHrSettings();
            const rateMap = {
                weekday: Number(settings.overtimeWeekdayRate),
                night: Number(settings.overtimeNightRate),
                restDay: Number(settings.overtimeRestDayRate)
            };
            data.multiplier = rateMap[data.category] || ot.multiplier;
        }
        Object.assign(ot, data);
        return this.overtimeRequestRepository.save(ot);
    }
    async approveOvertime(id, approvedByEmployeeId) {
        const ot = await this.findOneOvertimeRequest(id);
        if (ot.status !== "Pending") throw new Error("Overtime is not in Pending status");
        ot.status = "Approved";
        ot.approvedById = approvedByEmployeeId;
        return this.overtimeRequestRepository.save(ot);
    }
    async rejectOvertime(id) {
        const ot = await this.findOneOvertimeRequest(id);
        if (ot.status !== "Pending") throw new Error("Overtime is not in Pending status");
        ot.status = "Rejected";
        return this.overtimeRequestRepository.save(ot);
    }
    async deleteOvertimeRequest(id) {
        const ot = await this.findOneOvertimeRequest(id);
        await this.overtimeRequestRepository.remove(ot);
    }
    // ==================== LEAVE BALANCES ====================
    async findLeaveBalances(employeeId, year) {
        const balances = await this.leaveBalanceRepository.find({
            where: {
                ...employeeId ? {
                    employeeId
                } : {},
                ...year ? {
                    year
                } : {}
            },
            relations: [
                "employee",
                "leaveType"
            ],
            order: {
                year: "DESC"
            }
        });
        const targetYear = year || new Date().getFullYear();
        return Promise.all(balances.map(async (lb)=>{
            const accrualPolicy = lb.leaveType?.accrualPolicy || "Standard";
            const carryForwardAllowed = Boolean(lb.leaveType?.carryForwardAllowed);
            const yearlyEntitlement = lb.totalDays || lb.leaveType?.annualLimit || 0;
            const monthlyRate = accrualPolicy === "Monthly" && yearlyEntitlement > 0 ? Math.round(yearlyEntitlement / 12 * 100) / 100 : 0;
            // Get approved leave requests for this employee/year/leaveType
            const approvedRequests = await this.leaveRequestRepository.find({
                where: {
                    employeeId: lb.employeeId,
                    leaveTypeId: lb.leaveTypeId,
                    status: "Approved",
                    startDate: (0, _typeorm1.Between)(new Date(`${targetYear}-01-01`), new Date(`${targetYear + 1}-01-01`))
                }
            });
            const openingBalance = carryForwardAllowed ? lb.carriedForwardDays || 0 : 0;
            const currentMonth = new Date().getMonth() + 1; // 1-12
            const monthlyBreakdown = carryForwardAllowed ? [
                {
                    month: 0,
                    label: "Opening Balance",
                    accrued: 0,
                    used: 0,
                    balance: openingBalance,
                    isProjected: false
                }
            ] : [];
            for(let i = 0; i < 12; i++){
                const month = i + 1;
                const monthStart = new Date(targetYear, i, 1);
                const monthEnd = new Date(targetYear, i + 1, 0);
                const usedInMonth = approvedRequests.filter((req)=>{
                    const s = new Date(req.startDate);
                    const e = new Date(req.endDate);
                    return s <= monthEnd && e >= monthStart;
                }).reduce((sum, req)=>sum + req.days, 0);
                const prevBalance = monthlyBreakdown.length > 0 ? monthlyBreakdown[monthlyBreakdown.length - 1].balance : openingBalance;
                const isProjected = accrualPolicy === "Monthly" && targetYear === new Date().getFullYear() && month > currentMonth;
                const accrued = (()=>{
                    if (isProjected) return 0;
                    if (accrualPolicy === "Monthly") return monthlyRate;
                    if (month === 1) return yearlyEntitlement;
                    return 0;
                })();
                const balance = Math.round((prevBalance + accrued - usedInMonth) * 100) / 100;
                monthlyBreakdown.push({
                    month,
                    label: new Date(targetYear, i).toLocaleString("en-US", {
                        month: "short"
                    }),
                    accrued,
                    used: Math.round(usedInMonth * 100) / 100,
                    balance,
                    isProjected
                });
            }
            return {
                ...lb,
                carriedForwardDays: openingBalance,
                monthlyAccrualRate: monthlyRate,
                monthlyBreakdown
            };
        }));
    }
    async findOneLeaveBalance(id) {
        const lb = await this.leaveBalanceRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee",
                "leaveType"
            ]
        });
        if (!lb) throw new _common.NotFoundException("Leave balance not found");
        return lb;
    }
    async validateLeaveBalancePayload(data, currentLeaveBalanceId) {
        if (!data.employeeId || !Number.isFinite(Number(data.employeeId))) {
            throw new _common.BadRequestException("A valid employee is required for the leave balance");
        }
        if (!data.leaveTypeId || !Number.isFinite(Number(data.leaveTypeId))) {
            throw new _common.BadRequestException("A valid leave type is required for the leave balance");
        }
        if (!data.year || !Number.isFinite(Number(data.year))) {
            throw new _common.BadRequestException("A valid leave balance year is required");
        }
        const employee = await this.employeeRepository.findOne({
            where: {
                id: Number(data.employeeId)
            }
        });
        if (!employee) {
            throw new _common.BadRequestException("The selected employee does not exist");
        }
        if (employee.status === "Draft") {
            throw new _common.BadRequestException("Draft employees cannot be used in leave balance operations");
        }
        const leaveType = await this.leaveTypeRepository.findOne({
            where: {
                id: Number(data.leaveTypeId)
            }
        });
        if (!leaveType) {
            throw new _common.BadRequestException("The selected leave type does not exist");
        }
        const duplicate = await this.leaveBalanceRepository.findOne({
            where: {
                employeeId: Number(data.employeeId),
                year: Number(data.year),
                leaveTypeId: Number(data.leaveTypeId)
            }
        });
        if (duplicate && duplicate.id !== currentLeaveBalanceId) {
            throw new _common.BadRequestException("A leave balance already exists for this employee, year, and leave type");
        }
    }
    async createLeaveBalance(data) {
        await this.validateLeaveBalancePayload(data);
        const lb = this.leaveBalanceRepository.create(data);
        return this.leaveBalanceRepository.save(lb);
    }
    async updateLeaveBalance(id, data) {
        const lb = await this.findOneLeaveBalance(id);
        await this.validateLeaveBalancePayload({
            employeeId: data.employeeId ?? lb.employeeId,
            leaveTypeId: data.leaveTypeId ?? lb.leaveTypeId,
            year: data.year ?? lb.year
        }, id);
        Object.assign(lb, data);
        return this.leaveBalanceRepository.save(lb);
    }
    async deleteLeaveBalance(id) {
        const lb = await this.findOneLeaveBalance(id);
        await this.leaveBalanceRepository.remove(lb);
    }
    async syncLeaveBalances() {
        const settings = await this.getHrSettings();
        const maxCarry = settings.maxCarryForwardDays ?? 30;
        const results = [];
        const balances = await this.leaveBalanceRepository.find({
            relations: [
                "employee",
                "leaveType"
            ],
            order: {
                year: "ASC"
            }
        });
        // Group by employee+leaveType
        const groups = new Map();
        for (const lb of balances){
            const key = `${lb.employeeId}-${lb.leaveTypeId}`;
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(lb);
        }
        for (const [, lbs] of groups){
            for(let i = 0; i < lbs.length; i++){
                const lb = lbs[i];
                const prevYear = lbs[i - 1];
                let expectedCarry = 0;
                if (lb.leaveType?.carryForwardAllowed && prevYear) {
                    expectedCarry = Math.min(prevYear.remainingDays, maxCarry);
                }
                if (lb.carriedForwardDays !== expectedCarry) {
                    lb.carriedForwardDays = expectedCarry;
                    await this.leaveBalanceRepository.save(lb);
                    results.push(`${lb.employee?.firstName} ${lb.employee?.lastName} - ${lb.leaveType?.name} (${lb.year}): carriedForwardDays set to ${expectedCarry}`);
                }
            }
        }
        return {
            message: `Synchronized ${results.length} balance records`,
            results
        };
    }
    async rolloverLeaveBalances(year) {
        const settings = await this.getHrSettings();
        const nextYear = year + 1;
        const results = [];
        const balances = await this.leaveBalanceRepository.find({
            where: {
                year
            },
            relations: [
                "employee",
                "leaveType"
            ]
        });
        for (const lb of balances){
            if (lb.remainingDays <= 0) continue;
            if (settings.leaveYearEndPolicy === "cash_out") {
                // Get employee's active contract baseSalary for the formula: baseSalary / 26
                const activeContract = await this.contractRepository.findOne({
                    where: {
                        employeeId: lb.employeeId,
                        status: "Active"
                    }
                });
                const baseSalary = activeContract?.baseSalary || 0;
                const dailyRate = baseSalary / 26;
                const cashAmount = Math.round(lb.remainingDays * dailyRate * 1000) / 1000;
                results.push(`${lb.employee?.firstName} ${lb.employee?.lastName} - ${lb.leaveType?.name}: ${lb.remainingDays} days cashed out at ${dailyRate.toFixed(3)}/day (baseSalary: ${baseSalary} / 26) = ${cashAmount.toFixed(3)} TND`);
                lb.remainingDays = 0;
                await this.leaveBalanceRepository.save(lb);
            } else {
                if (!lb.leaveType?.carryForwardAllowed) {
                    results.push(`${lb.employee?.firstName} ${lb.employee?.lastName} - ${lb.leaveType?.name}: no carry forward allowed, remaining balance resets at year end`);
                    continue;
                }
                // carry_forward: add remaining to next year's balance (capped by maxCarryForwardDays)
                const maxCarry = settings.maxCarryForwardDays ?? 30;
                const carryDays = Math.min(lb.remainingDays, maxCarry);
                const forfeited = lb.remainingDays - carryDays;
                let nextBalance = await this.leaveBalanceRepository.findOne({
                    where: {
                        employeeId: lb.employeeId,
                        leaveTypeId: lb.leaveTypeId,
                        year: nextYear
                    }
                });
                if (nextBalance) {
                    nextBalance.carriedForwardDays = Math.round((nextBalance.carriedForwardDays + carryDays) * 100) / 100;
                    nextBalance.totalDays = Math.round((nextBalance.totalDays + carryDays) * 100) / 100;
                    nextBalance.remainingDays = Math.round((nextBalance.remainingDays + carryDays) * 100) / 100;
                    await this.leaveBalanceRepository.save(nextBalance);
                } else {
                    nextBalance = this.leaveBalanceRepository.create({
                        employeeId: lb.employeeId,
                        leaveTypeId: lb.leaveTypeId,
                        year: nextYear,
                        totalDays: carryDays,
                        usedDays: 0,
                        remainingDays: carryDays,
                        carriedForwardDays: carryDays
                    });
                    await this.leaveBalanceRepository.save(nextBalance);
                }
                results.push(`${lb.employee?.firstName} ${lb.employee?.lastName} - ${lb.leaveType?.name}: ${carryDays} days carried forward to ${nextYear}${forfeited > 0 ? ` (${forfeited} days exceeded max carry forward of ${maxCarry} and were forfeited)` : ""}`);
            }
        }
        return {
            message: `Rollover completed for year ${year} -> ${nextYear} (policy: ${settings.leaveYearEndPolicy})`,
            results
        };
    }
    // ==================== KPIs ====================
    async findKpis() {
        return this.kpiRepository.find();
    }
    async findOneKpi(id) {
        const kpi = await this.kpiRepository.findOne({
            where: {
                id
            }
        });
        if (!kpi) throw new _common.NotFoundException("KPI not found");
        return kpi;
    }
    async createKpi(data) {
        if (!data.code) {
            const last = await this.kpiRepository.findOne({
                where: {},
                order: {
                    id: "DESC"
                }
            });
            const nextId = last ? last.id + 1 : 1;
            data.code = `KPI-${String(nextId).padStart(3, "0")}`;
        }
        const kpi = this.kpiRepository.create(data);
        return this.kpiRepository.save(kpi);
    }
    async updateKpi(id, data) {
        const kpi = await this.findOneKpi(id);
        Object.assign(kpi, data);
        return this.kpiRepository.save(kpi);
    }
    async deleteKpi(id) {
        const kpi = await this.findOneKpi(id);
        await this.kpiRepository.remove(kpi);
    }
    // ==================== KPI ASSIGNMENTS ====================
    async findKpiAssignments(employeeId) {
        return this.kpiAssignmentRepository.find({
            where: employeeId ? {
                employeeId
            } : {},
            relations: [
                "employee",
                "kpi"
            ],
            order: {
                createdAt: "DESC"
            }
        });
    }
    async findOneKpiAssignment(id) {
        const ka = await this.kpiAssignmentRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee",
                "kpi"
            ]
        });
        if (!ka) throw new _common.NotFoundException("KPI assignment not found");
        return ka;
    }
    async createKpiAssignment(data) {
        const ka = this.kpiAssignmentRepository.create(data);
        return this.kpiAssignmentRepository.save(ka);
    }
    async updateKpiAssignment(id, data) {
        const ka = await this.findOneKpiAssignment(id);
        Object.assign(ka, data);
        return this.kpiAssignmentRepository.save(ka);
    }
    async deleteKpiAssignment(id) {
        const ka = await this.findOneKpiAssignment(id);
        await this.kpiAssignmentRepository.remove(ka);
    }
    // ==================== GOALS ====================
    async findGoals(employeeId, status) {
        return this.goalRepository.find({
            where: {
                ...employeeId ? {
                    employeeId
                } : {},
                ...status ? {
                    status
                } : {}
            },
            relations: [
                "employee"
            ],
            order: {
                createdAt: "DESC"
            }
        });
    }
    async findOneGoal(id) {
        const goal = await this.goalRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee"
            ]
        });
        if (!goal) throw new _common.NotFoundException("Goal not found");
        return goal;
    }
    async createGoal(data) {
        const goal = this.goalRepository.create(data);
        return this.goalRepository.save(goal);
    }
    async updateGoal(id, data) {
        const goal = await this.findOneGoal(id);
        Object.assign(goal, data);
        return this.goalRepository.save(goal);
    }
    async deleteGoal(id) {
        const goal = await this.findOneGoal(id);
        await this.goalRepository.remove(goal);
    }
    // ==================== PERFORMANCE REVIEWS ====================
    async findPerformanceReviews(employeeId) {
        return this.performanceReviewRepository.find({
            where: employeeId ? {
                employeeId
            } : {},
            relations: [
                "employee",
                "reviewer"
            ],
            order: {
                reviewDate: "DESC"
            }
        });
    }
    async findOnePerformanceReview(id) {
        const pr = await this.performanceReviewRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee",
                "reviewer"
            ]
        });
        if (!pr) throw new _common.NotFoundException("Performance review not found");
        return pr;
    }
    async createPerformanceReview(data) {
        const pr = this.performanceReviewRepository.create(data);
        return this.performanceReviewRepository.save(pr);
    }
    async updatePerformanceReview(id, data) {
        const pr = await this.findOnePerformanceReview(id);
        Object.assign(pr, data);
        return this.performanceReviewRepository.save(pr);
    }
    async deletePerformanceReview(id) {
        const pr = await this.findOnePerformanceReview(id);
        await this.performanceReviewRepository.remove(pr);
    }
    // ==================== VACATION ACCRUAL RULES ====================
    async findAccrualRules(employeeId) {
        return this.accrualRuleRepository.find({
            where: employeeId ? {
                employeeId
            } : {},
            relations: [
                "employee",
                "leaveType"
            ],
            order: {
                createdAt: "DESC"
            }
        });
    }
    async findOneAccrualRule(id) {
        const rule = await this.accrualRuleRepository.findOne({
            where: {
                id
            },
            relations: [
                "employee",
                "leaveType"
            ]
        });
        if (!rule) throw new _common.NotFoundException("Vacation accrual rule not found");
        return rule;
    }
    async createAccrualRule(data) {
        const rule = this.accrualRuleRepository.create(data);
        return this.accrualRuleRepository.save(rule);
    }
    async updateAccrualRule(id, data) {
        const rule = await this.findOneAccrualRule(id);
        Object.assign(rule, data);
        return this.accrualRuleRepository.save(rule);
    }
    async deleteAccrualRule(id) {
        const rule = await this.findOneAccrualRule(id);
        await this.accrualRuleRepository.remove(rule);
    }
    async runAccrualForEmployee(employeeId, year, month) {
        const rules = await this.accrualRuleRepository.find({
            where: {
                employeeId,
                active: true
            },
            relations: [
                "leaveType"
            ]
        });
        const results = [];
        for (const rule of rules){
            // Calculate accrual for this month
            const accrualDays = rule.accrualRate;
            // Find or create leave balance for this employee/year/leaveType
            let lb = await this.leaveBalanceRepository.findOne({
                where: {
                    employeeId,
                    year,
                    leaveTypeId: rule.leaveTypeId
                }
            });
            if (!lb) {
                // Fetch annual limit from leave type if available
                const annualLimit = rule.leaveType?.annualLimit || rule.maxAccrual;
                lb = this.leaveBalanceRepository.create({
                    employeeId,
                    year,
                    leaveTypeId: rule.leaveTypeId,
                    totalDays: 0,
                    usedDays: 0,
                    remainingDays: 0
                });
            }
            // Apply accrual (capped by maxAccrual)
            const newTotal = Math.min(Number(lb.totalDays) + accrualDays, rule.maxAccrual);
            lb.totalDays = Math.round(newTotal * 100) / 100;
            await this.leaveBalanceRepository.save(lb);
            results.push(`Accrued ${accrualDays} days for ${rule.leaveType?.name || `leave type ${rule.leaveTypeId}`}`);
        }
        return results;
    }
    async runAccrualForAll(year, month) {
        const employees = await this.employeeRepository.find({
            where: {
                status: "Active"
            }
        });
        const results = {};
        for (const emp of employees){
            results[`${emp.firstName} ${emp.lastName}`] = await this.runAccrualForEmployee(emp.id, year, month);
        }
        return results;
    }
    // ==================== HR REPORTS ====================
    async getHeadcountReport() {
        const total = await this.employeeRepository.count();
        const byDepartment = await this.employeeRepository.createQueryBuilder("e").leftJoin("e.department", "d").select("d.name", "department").addSelect("COUNT(*)", "count").groupBy("d.name").getRawMany();
        const byStatus = await this.employeeRepository.createQueryBuilder("e").select("e.status", "status").addSelect("COUNT(*)", "count").groupBy("e.status").getRawMany();
        const byGender = await this.employeeRepository.createQueryBuilder("e").select("e.gender", "gender").addSelect("COUNT(*)", "count").groupBy("e.gender").getRawMany();
        const active = await this.employeeRepository.count({
            where: {
                status: "Active"
            }
        });
        return {
            total,
            active,
            byDepartment,
            byStatus,
            byGender
        };
    }
    async getTurnoverReport() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const total = await this.employeeRepository.count({
            where: {
                status: "Active"
            }
        });
        // Count employees who left this year (status = Inactive/Terminated with updatedAt this year)
        const leftThisYear = await this.employeeRepository.createQueryBuilder("e").where("e.status IN (:...statuses)", {
            statuses: [
                "Inactive",
                "Terminated"
            ]
        }).andWhere("EXTRACT(YEAR FROM e.updatedAt) = :year", {
            year: currentYear
        }).getCount();
        // New hires this year
        const hiredThisYear = await this.employeeRepository.createQueryBuilder("e").where("EXTRACT(YEAR FROM e.hireDate) = :year", {
            year: currentYear
        }).getCount();
        const turnoverRate = total > 0 ? Number((leftThisYear / total * 100).toFixed(1)) : 0;
        return {
            totalActive: total,
            leftThisYear,
            hiredThisYear,
            turnoverRate,
            year: currentYear
        };
    }
    async getLeaveTrendsReport(year) {
        const y = year || new Date().getFullYear();
        const leaveTypes = await this.leaveTypeRepository.find();
        const trendData = [];
        for (const lt of leaveTypes){
            const approved = await this.leaveRequestRepository.count({
                where: {
                    leaveTypeId: lt.id,
                    status: "Approved"
                }
            });
            const pending = await this.leaveRequestRepository.count({
                where: {
                    leaveTypeId: lt.id,
                    status: "Pending"
                }
            });
            const totalDays = await this.leaveRequestRepository.createQueryBuilder("lr").select("COALESCE(SUM(lr.days), 0)", "totalDays").where("lr.leaveTypeId = :leaveTypeId", {
                leaveTypeId: lt.id
            }).andWhere("EXTRACT(YEAR FROM lr.startDate) = :year", {
                year: y
            }).getRawOne();
            trendData.push({
                leaveType: lt.name,
                paid: lt.paid,
                approved,
                pending,
                totalDays: Number(totalDays?.totalDays || 0)
            });
        }
        return {
            year: y,
            trends: trendData
        };
    }
    // ==================== DOCUMENT GENERATION ====================
    async generateWorkCertificate(employeeId) {
        const emp = await this.findOneEmployee(employeeId);
        const dept = emp.department?.name || "N/A";
        const pos = emp.position?.title || "N/A";
        const activeContract = emp.contracts?.find((c)=>c.status === "Active");
        const today = new Date().toLocaleDateString("fr-TN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  body { font-family: 'Times New Roman', serif; margin: 60px; }
  .header { text-align: center; margin-bottom: 40px; }
  .header h1 { font-size: 18px; margin: 0; }
  .header p { margin: 2px 0; font-size: 14px; }
  .title { text-align: center; font-size: 16px; font-weight: bold; margin: 30px 0; text-decoration: underline; }
  .content { margin: 20px 0; line-height: 2; }
  .signature { margin-top: 60px; }
  table { width: 100%; border-collapse: collapse; }
  table td { padding: 4px 8px; }
</style></head><body>
<div class="header">
  <h1>${this.escapeHtml(emp.companyName || "Company Name")}</h1>
  <p>${this.escapeHtml(dept)}</p>
</div>
<div class="title">ATTESTATION DE TRAVAIL</div>
<div class="content">
  <p>Je soussigné(e), responsable des Ressources Humaines, atteste que :</p>
  <table>
    <tr><td><strong>Nom et Prénom :</strong></td><td>${this.escapeHtml(emp.firstName + " " + emp.lastName)}</td></tr>
    <tr><td><strong>CIN N° :</strong></td><td>${this.escapeHtml(emp.cin)}</td></tr>
    <tr><td><strong>Date de naissance :</strong></td><td>${new Date(emp.dateOfBirth).toLocaleDateString("fr-TN")}</td></tr>
    <tr><td><strong>Fonction :</strong></td><td>${this.escapeHtml(pos)}</td></tr>
    <tr><td><strong>Département :</strong></td><td>${this.escapeHtml(dept)}</td></tr>
    <tr><td><strong>Date d'embauche :</strong></td><td>${new Date(emp.hireDate).toLocaleDateString("fr-TN")}</td></tr>
    ${activeContract ? `<tr><td><strong>Salaire de base :</strong></td><td>${Number(activeContract.baseSalary).toFixed(3)} TND</td></tr>` : ""}
    ${activeContract ? `<tr><td><strong>Type de contrat :</strong></td><td>${this.escapeHtml(activeContract.contractType)}</td></tr>` : ""}
  </table>
  <p>La présente attestation est délivrée à l'intéressé(e) pour tous droits et usages.</p>
</div>
<div class="signature">
  <p>Fait à Tunis, le ${today}</p>
  <br><br>
  <p>Signature et cachet</p>
</div>
</body></html>`;
    }
    async generateEmploymentContractLegacy(employeeId) {
        const emp = await this.findOneEmployee(employeeId);
        const pos = emp.position?.title || "N/A";
        const dept = emp.department?.name || "N/A";
        const activeContract = emp.contracts?.find((c)=>c.status === "Active");
        const today = new Date().toLocaleDateString("fr-TN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  body { font-family: 'Times New Roman', serif; margin: 60px; }
  .header { text-align: center; margin-bottom: 40px; }
  .header h1 { font-size: 18px; margin: 0; }
  .title { text-align: center; font-size: 16px; font-weight: bold; margin: 30px 0; text-decoration: underline; }
  .content { margin: 20px 0; line-height: 2; }
  .clause { margin: 15px 0; }
  .clause h3 { font-size: 14px; margin: 10px 0 5px 0; }
  table { width: 100%; border-collapse: collapse; }
  table td { padding: 4px 8px; border: 1px solid #000; }
</style></head><body>
<div class="header">
  <h1>CONTRAT DE TRAVAIL</h1>
  <p>Entre les soussignés</p>
</div>
<div class="content">
  <div class="clause">
    <h3>Article 1 - Parties</h3>
    <p><strong>L'Employeur :</strong> ${this.escapeHtml(emp.companyName || "Company Name")}</p>
    <p><strong>Le Salarié :</strong> ${this.escapeHtml(emp.firstName + " " + emp.lastName)}, titulaire de la CIN N° ${this.escapeHtml(emp.cin)}</p>
  </div>
  <div class="clause">
    <h3>Article 2 - Objet</h3>
    <p>Le Salarié est engagé en qualitée de <strong>${this.escapeHtml(pos)}</strong> au sein du département <strong>${this.escapeHtml(dept)}</strong>.</p>
  </div>
  ${activeContract ? `
  <div class="clause">
    <h3>Article 3 - Durée et Période d'Essai</h3>
    <p>Le contrat est à <strong>${this.escapeHtml(activeContract.contractType)}</strong>.</p>
    <p>Date de début : ${new Date(activeContract.startDate).toLocaleDateString("fr-TN")}</p>
    ${activeContract.endDate ? `<p>Date de fin : ${new Date(activeContract.endDate).toLocaleDateString("fr-TN")}</p>` : ""}
    ${activeContract.probationEndDate ? `<p>Période d'essai jusqu'au : ${new Date(activeContract.probationEndDate).toLocaleDateString("fr-TN")}</p>` : ""}
  </div>
  <div class="clause">
    <h3>Article 4 - Rémunération</h3>
    <p>Salaire de base : <strong>${Number(activeContract.baseSalary).toFixed(3)} TND</strong></p>
    <p>Durée de travail : ${activeContract.workingHoursPerWeek} heures/semaine</p>
  </div>` : ""}
  <div class="clause">
    <h3>Article 5 - Obligations</h3>
    <p>Le Salarié s'engage à respecter le règlement intérieur et à exécuter ses fonctions avec diligence et loyauté.</p>
  </div>
</div>
<div class="signature">
  <p>Fait à Tunis, le ${today}</p>
  <table>
    <tr><td style="border:none"><strong>Le Salarié</strong></td><td style="border:none"><strong>L'Employeur</strong></td></tr>
    <tr><td style="border:none; height:80px"></td><td style="border:none; height:80px"></td></tr>
  </table>
</div>
</body></html>`;
    }
    async generateEmploymentContract(employeeId) {
        const emp = await this.findOneEmployee(employeeId);
        const contract = emp.contracts?.find((item)=>item.status === "Active") || emp.contracts?.[0];
        if (!contract) {
            throw new _common.NotFoundException("No contract found for employee");
        }
        return this.renderEmploymentContractHtml(emp, contract);
    }
    async generateEmploymentContractByContract(contractId) {
        const contract = await this.findOneContract(contractId);
        const employee = await this.findOneEmployee(contract.employeeId);
        return this.renderEmploymentContractHtml(employee, contract);
    }
    async seedLeaveTypes() {
        const existing = await this.leaveTypeRepository.count();
        if (existing > 0) return;
        const defaults = [
            // === Paid Leave ===
            {
                code: "AL",
                name: "Annual Leave",
                nameFr: "Congé annuel",
                nameAr: "إجازة سنوية",
                description: "Employee's yearly paid vacation entitlement",
                paid: true,
                annualLimit: 30,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: 30,
                carryForwardAllowed: true,
                accrualPolicy: "Monthly"
            },
            {
                code: "CL",
                name: "Casual Leave",
                nameFr: "Congé de circonstance",
                nameAr: "إجازة عرضية",
                description: "Short personal leave for unforeseen situations",
                paid: true,
                annualLimit: 5,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: 3,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "PL",
                name: "Personal Leave",
                nameFr: "Congé personnel",
                nameAr: "إجازة شخصية",
                description: "Personal matters that require absence from work",
                paid: true,
                annualLimit: 3,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: 2,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "BLD",
                name: "Birthday Leave",
                nameFr: "Congé d'anniversaire",
                nameAr: "إجازة عيد ميلاد",
                description: "Optional leave on the employee's birthday",
                paid: true,
                annualLimit: 1,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: 1,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "CPL",
                name: "Compensatory Leave",
                nameFr: "Congé compensatoire",
                nameAr: "إجازة تعويضية",
                description: "Granted for working overtime, weekends, or holidays",
                paid: true,
                annualLimit: null,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: 5,
                carryForwardAllowed: true,
                accrualPolicy: "Standard"
            },
            // === Medical Leave ===
            {
                code: "SL",
                name: "Sick Leave",
                nameFr: "Congé de maladie",
                nameAr: "إجازة مرضية",
                description: "For illness or medical treatment",
                paid: true,
                annualLimit: 30,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 14,
                carryForwardAllowed: false,
                accrualPolicy: "Upfront"
            },
            {
                code: "MA",
                name: "Medical Appointment Leave",
                nameFr: "Congé pour rendez-vous médical",
                nameAr: "إجازة موعد طبي",
                description: "Doctor, dentist, or specialist visits",
                paid: true,
                annualLimit: 5,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 1,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "LTML",
                name: "Long-Term Medical Leave",
                nameFr: "Congé médical de longue durée",
                nameAr: "إجازة مرضية طويلة",
                description: "Extended absence due to serious illness or recovery",
                paid: true,
                annualLimit: 90,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 90,
                carryForwardAllowed: false,
                accrualPolicy: "Upfront"
            },
            // === Family-Related Leave ===
            {
                code: "ML",
                name: "Maternity Leave",
                nameFr: "Congé de maternité",
                nameAr: "إجازة أمومة",
                description: "Leave before and after childbirth",
                paid: true,
                annualLimit: 90,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 90,
                carryForwardAllowed: false,
                genderRestriction: "Female",
                accrualPolicy: "Upfront"
            },
            {
                code: "PTL",
                name: "Paternity Leave",
                nameFr: "Congé de paternité",
                nameAr: "إجازة أبوة",
                description: "Leave for fathers after childbirth",
                paid: true,
                annualLimit: 3,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 3,
                carryForwardAllowed: false,
                genderRestriction: "Male",
                accrualPolicy: "Upfront"
            },
            {
                code: "PRL",
                name: "Parental Leave",
                nameFr: "Congé parental",
                nameAr: "إجازة والدية",
                description: "Childcare leave available to either parent",
                paid: false,
                annualLimit: 365,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 365,
                carryForwardAllowed: false,
                accrualPolicy: "Upfront"
            },
            {
                code: "ADL",
                name: "Adoption Leave",
                nameFr: "Congé d'adoption",
                nameAr: "إجازة تبني",
                description: "For employees adopting a child",
                paid: true,
                annualLimit: 30,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 30,
                carryForwardAllowed: false,
                accrualPolicy: "Upfront"
            },
            {
                code: "FCL",
                name: "Family Care Leave",
                nameFr: "Congé familial",
                nameAr: "إجازة رعاية عائلية",
                description: "Caring for sick family members",
                paid: true,
                annualLimit: 5,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 5,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "BL",
                name: "Bereavement Leave",
                nameFr: "Congé de deuil",
                nameAr: "إجازة حداد",
                description: "Leave following the death of a family member",
                paid: true,
                annualLimit: 3,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 3,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            // === Legal & Civic Leave ===
            {
                code: "MRL",
                name: "Marriage Leave",
                nameFr: "Congé de mariage",
                nameAr: "إجازة زواج",
                description: "Leave granted upon marriage",
                paid: true,
                annualLimit: 3,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 3,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "JDL",
                name: "Jury Duty Leave",
                nameFr: "Congé pour obligation judiciaire",
                nameAr: "إجازة واجب قضائي",
                description: "For legal obligations (country-specific)",
                paid: true,
                annualLimit: null,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: null,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "MIL",
                name: "Military Leave",
                nameFr: "Congé militaire",
                nameAr: "إجازة عسكرية",
                description: "Military service or reserve training",
                paid: true,
                annualLimit: null,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: null,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "VCL",
                name: "Voting/Civic Duty Leave",
                nameFr: "Congé pour devoir civique",
                nameAr: "إجازة واجب مدني",
                description: "Government or civic responsibilities",
                paid: true,
                annualLimit: 1,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: 1,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            // === Religious & Cultural Leave ===
            {
                code: "RHL",
                name: "Religious Holiday Leave",
                nameFr: "Congé religieux",
                nameAr: "إجازة دينية",
                description: "For religious observances",
                paid: true,
                annualLimit: 2,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: 2,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "PGL",
                name: "Pilgrimage Leave",
                nameFr: "Congé de pèlerinage",
                nameAr: "إجازة حج",
                description: "Hajj, Umrah, or other religious pilgrimages",
                paid: true,
                annualLimit: 15,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 15,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            // === Education & Development Leave ===
            {
                code: "STL",
                name: "Study Leave",
                nameFr: "Congé d'études",
                nameAr: "إجازة دراسية",
                description: "Academic studies or examinations",
                paid: false,
                annualLimit: 10,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 10,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "TRL",
                name: "Training Leave",
                nameFr: "Congé de formation",
                nameAr: "إجازة تدريب",
                description: "Professional development programs",
                paid: true,
                annualLimit: 5,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 5,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "CFL",
                name: "Conference Leave",
                nameFr: "Congé de conférence",
                nameAr: "إجازة مؤتمر",
                description: "Attending seminars, workshops, or conferences",
                paid: true,
                annualLimit: 5,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: 5,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            // === Unpaid Leave ===
            {
                code: "UPL",
                name: "Unpaid Leave",
                nameFr: "Congé sans solde",
                nameAr: "إجازة غير مدفوعة",
                description: "Authorized absence without salary",
                paid: false,
                annualLimit: null,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: null,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "CBS",
                name: "Career Break / Sabbatical",
                nameFr: "Congé sabbatique",
                nameAr: "إجازة تفرغ",
                description: "Extended leave for personal development or travel",
                paid: false,
                annualLimit: null,
                requiresApproval: true,
                requiresSupportingDocuments: true,
                maxConsecutiveDays: null,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            // === Remote Work & Flexibility ===
            {
                code: "WFH",
                name: "Work From Home",
                nameFr: "Travail à distance",
                nameAr: "عمل عن بعد",
                description: "Remote work request instead of physical leave",
                paid: false,
                annualLimit: null,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: null,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "HDL",
                name: "Half-Day Leave",
                nameFr: "Demi-journée",
                nameAr: "إجازة نصف يوم",
                description: "Morning or afternoon absence",
                paid: true,
                annualLimit: null,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: null,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            },
            {
                code: "HL",
                name: "Hourly Leave",
                nameFr: "Permission horaire",
                nameAr: "إذن ساعي",
                description: "Short absence measured in hours",
                paid: true,
                annualLimit: null,
                requiresApproval: true,
                requiresSupportingDocuments: false,
                maxConsecutiveDays: null,
                carryForwardAllowed: false,
                accrualPolicy: "Standard"
            }
        ];
        for (const lt of defaults){
            await this.leaveTypeRepository.save(this.leaveTypeRepository.create(lt));
        }
        console.log(`Seeded ${defaults.length} default leave types`);
    }
    async generateRenewedContractNumber(baseContractNumber) {
        let attempt = 1;
        while(true){
            const candidate = `${baseContractNumber}-R${attempt}`;
            const existing = await this.contractRepository.findOne({
                where: {
                    contractNumber: candidate
                }
            });
            if (!existing) return candidate;
            attempt += 1;
        }
    }
    async generateNextEmployeeNumber() {
        const lastEmployee = await this.employeeRepository.findOne({
            where: {},
            order: {
                id: "DESC"
            }
        });
        const nextId = lastEmployee ? lastEmployee.id + 1 : 1;
        return `EMP-${String(nextId).padStart(4, "0")}`;
    }
    async generateNextContractNumber() {
        const lastContract = await this.contractRepository.findOne({
            where: {},
            order: {
                id: "DESC"
            }
        });
        const nextId = lastContract ? lastContract.id + 1 : 1;
        const year = new Date().getFullYear();
        return `CTR-${year}-${String(nextId).padStart(4, "0")}`;
    }
    renderEmploymentContractHtml(employee, contract) {
        const position = employee.position?.title || "[Fonction a completer]";
        const workLocation = employee.workLocation || "[Lieu de travail a completer]";
        const employerName = this.escapeHtml(employee.companyName || "[Nom de la societe]");
        const employerAddress = this.escapeHtml(employee.companyAddress || "[Adresse du siege social]");
        const employerRep = this.escapeHtml(employee.companyRepresentative || "[Representant legal]");
        const employeeName = this.escapeHtml(`${employee.firstName} ${employee.lastName}`);
        const title = this.getContractDocumentTitle(contract.contractType);
        const today = new Date().toLocaleDateString("fr-TN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        const startDate = new Date(contract.startDate).toLocaleDateString("fr-TN");
        const probationWeeks = contract.probationEndDate ? Math.ceil((new Date(contract.probationEndDate).getTime() - new Date(contract.startDate).getTime()) / (7 * 24 * 60 * 60 * 1000)) : null;
        const probationEnd = contract.probationEndDate ? new Date(contract.probationEndDate).toLocaleDateString("fr-TN") : null;
        const probationStr = probationWeeks ? probationWeeks + " semaines" : "[nombre] semaines/mois";
        const probationEndStr = probationEnd || "[date de fin]";
        const salary = Number(contract.baseSalary).toFixed(3);
        const annualLeaveDays = contract.annualLeaveDays || 24;
        const workingHours = Number(contract.workingHoursPerWeek) || 40;
        const workingDays = contract.workingDaysPerWeek || 5;
        const taskDescription = this.escapeHtml(contract.taskDescription || "[Description des taches a completer]");
        const additionalBenefits = this.escapeHtml(contract.additionalBenefits || "");
        const placeOfSigning = this.escapeHtml(contract.placeOfSigning || "Tunis");
        return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - ${employeeName}</title>
  <style>
    body { font-family: "Times New Roman", serif; background: #f3f4f6; margin: 0; color: #111827; }
    .toolbar { position: sticky; top: 0; display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: #111827; color: #fff; z-index: 10; }
    .toolbar button { border: 1px solid rgba(255,255,255,0.25); background: transparent; color: #fff; padding: 8px 14px; cursor: pointer; font-family: Arial, sans-serif; }
    .page { width: 794px; min-height: 1123px; margin: 24px auto; background: #fff; padding: 72px 72px 96px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,0.12); }
    .page h1 { text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 36px; text-transform: uppercase; }
    p { font-size: 13px; line-height: 1.75; margin: 0 0 10px; text-align: justify; }
    .article-title { font-size: 14px; font-weight: bold; margin: 22px 0 8px; }
    .signature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 48px; }
    .signature-box { text-align: center; padding-top: 36px; }
    .signature-box .line { border-top: 1px solid #333; margin-bottom: 8px; }
    .notice { font-size: 11px; font-style: italic; margin-top: 4px; color: #555; }
    .blank { display: inline-block; min-width: 120px; border-bottom: 1px solid #999; padding: 0 4px; }
    @media print { body { background: #fff; } .toolbar { display: none; } .page { box-shadow: none; margin: 0 auto; width: auto; min-height: auto; } }
  </style>
</head>
<body>
  <div class="toolbar">
    <div>Apercu du contrat - ${employeeName}</div>
    <button onclick="window.print()">Imprimer / PDF</button>
  </div>
  <div class="page">
    <h1>${title}</h1>

    <p>Les parties soussignees :</p>
    <p>1. Madame / Monsieur / La Societe <strong>${employerName}</strong></p>
    <p>demeurant / etabli(e) et ayant son siege social a <strong>${employerAddress}</strong>,</p>
    <p>represente(e) par <strong>${employerRep}</strong>.</p>
    <p>ci-apres designe(e) &laquo; l'employeur &raquo; ;</p>
    <p style="margin-top: 12px;">et</p>
    <p style="margin-top: 12px;">2. Madame / Monsieur <strong>${employeeName}</strong>, titulaire de la CIN n° <strong>${this.escapeHtml(employee.cin || "[CIN a completer]")}</strong>, demeurant a <strong>${this.escapeHtml(employee.address || "[Adresse a completer]")}</strong>.</p>
    <p>ci-apres designe(e) &laquo; le / la salarie(e) &raquo; ;</p>
    <p>ont conclu le present <strong>${title.toUpperCase()}</strong>.</p>

    <div class="article-title">Article 1er. Date d'entree de service</div>
    <p>La date du debut de l'execution du present contrat de travail est fixee au <strong>${startDate}</strong>.</p>

    <div class="article-title">Article 2. Periode d'essai<sup>1</sup></div>
    <p>Le present contrat de travail prevoit une periode d'essai de <strong>${probationStr}</strong> allant du <strong>${startDate}</strong> au <strong>${probationEndStr}</strong>.</p>
    <p>Si le contrat n'est pas rompu au plus tard [nombre] jours avant la fin de la periode d'essai par l'une des deux (2) parties, il est a considerer comme definitif et a duree indeterminee a partir de la date indiquee d'entree en service.</p>
    <p class="notice"><sup>1</sup> Voir article L.121-5 du code du travail</p>

    <div class="article-title">Article 3. Nature de l'emploi occupe et description des fonctions / taches assignees</div>
    <p>Le/la salarie(e) est engage(e) en qualite de : <strong>${this.escapeHtml(position)}</strong>. Dans l'exercice de cette fonction, le/la salarie(e) est amene(e) a : <strong>${taskDescription}</strong>.</p>
    <p>L'employeur se reserve le droit d'affecter le/la salarie(e) a une autre fonction et ce, selon les besoins de l'employeur et en consideration de la formation et des qualifications du/de la salarie(e).</p>

    <div class="article-title">Article 4. Lieu de travail</div>
    <p>Le lieu de travail est <strong>${this.escapeHtml(workLocation)}</strong>.</p>
    <p>Ou a defaut de lieu de travail fixe ou predominant : Le salarie sera occupe a divers endroits et plus particulierement a l'etranger ainsi qu'au siege ou, le cas echeant, au domicile de l'employeur.</p>
    <p>L'employeur se reserve toutefois le droit de changer le lieu du travail du/de la salarie(e) sur le territoire pour les besoins du service. Le/la salarie(e) accepte une telle modification de son lieu de travail et ne s'oppose pas a une mutation temporaire a l'etranger si les besoins de l'employeur le requierent.</p>

    <div class="article-title">Article 5. Duree et horaire de travail</div>
    <p>La duree de travail est de <strong>${workingHours} heures par semaine</strong>, reparties sur <strong>${workingDays} jours ouvrables</strong>.</p>
    <p>L'horaire de travail est determine par l'employeur selon les besoins du service.</p>

    <div class="article-title">Article 6. Salaire [et, le cas echeant, complements ou accessoires de salaire]</div>
    <p>Le salaire initial brut est fixe a <strong>${salary} TND</strong>. Il sera paye a la fin du mois, deduction faite des charges sociales et fiscales prevues par la loi.</p>
    ${additionalBenefits ? `<p>Le/La salarie(e) a droit aux complements ou accessoires de salaire suivants : <strong>${additionalBenefits}</strong>.</p>` : ""}

    <div class="article-title">Article 7. Conge annuel paye</div>
    <p>Le/la salarie(e) a droit a un conge ordinaire de recreation de <strong>${annualLeaveDays} jours ouvrables par an</strong>. Le/la salarie a droit a un douzieme du conge annuel par mois de travail entier.</p>

    <div class="article-title">Article 8. Regime complementaire de pension</div>
    <p>Le/la salarie beneficie du regime complementaire de pension mis en place par l'employeur, tel que decrit dans les regles y relatives.</p>

    <div class="article-title">Article 9. Maladie</div>
    <p>Le/la salarie incapable de travailler pour cause de maladie ou d'accident est oblige d'en avertir, personnellement ou par personne interposee, l'employeur des le premier (1er) jour de son absence en indiquant si possible la duree previsible de l'absence. Le troisieme (3eme) jour de son absence au plus tard, le/la salarie est oblige de soumettre a la societe un certificat medical attestant son incapacite de travail et sa duree previsible.</p>

    <div class="article-title">Article 10. Delais a respecter en cas de rupture du contrat avec preavis</div>
    <p>En dehors de l'hypothese visee a l'article 2 et de celle d'un licenciement pour faute grave, l'employeur ou le/la salarie(e) qui resilie le contrat de travail doit respecter un delai de preavis.</p>
    <p>Celui-ci est en fonction de l'anciennete de service du/de la salarie(e) et se determine comme suit :</p>
    <p style="margin-left: 24px;">
      Anciennete &lt; 5 ans : Employeur 2 mois / Salarie 1 mois<br/>
      Entre 5 ans et 10 ans : Employeur 4 mois / Salarie 2 mois<br/>
      &gt; 10 ans : Employeur 6 mois / Salarie 3 mois
    </p>

    <div class="article-title">Article 11. Clauses derogatoires et/ou supplementaires</div>
    <p>Les parties conviennent des clauses derogatoires et/ou supplementaires suivantes :</p>
    <p>[Exemples : clause de non-concurrence / clause de confidentialite / clause relative aux communications electroniques] __________________________________________________.</p>
    <p>Le present contrat de travail est regi par le Code du travail et/ou par les dispositions de la convention collective applicable a l'entreprise.</p>

    <p style="margin-top: 36px;">Fait en double exemplaire et signe a <strong>${placeOfSigning}</strong>, le <strong>${today}</strong>.</p>

    <div class="signature-grid">
      <div class="signature-box"><div class="line"></div><p>Le/la salarie(e)</p></div>
      <div class="signature-box"><div class="line"></div><p>L'employeur</p></div>
    </div>
  </div>
</body>
</html>`;
    }
    getContractDocumentTitle(contractType) {
        if (contractType.toUpperCase().includes("CDD")) {
            return "Contrat de travail a duree determinee";
        }
        return "Contrat de travail a duree indeterminee";
    }
    calculateWorkedHours(startTime, endTime, breakHours) {
        const startMinutes = this.timeToMinutes(startTime);
        const endMinutes = this.timeToMinutes(endTime);
        if (startMinutes == null || endMinutes == null) return 0;
        let durationMinutes = endMinutes - startMinutes;
        if (durationMinutes < 0) {
            durationMinutes += 24 * 60;
        }
        const effectiveMinutes = Math.max(0, durationMinutes - Math.round(breakHours * 60));
        return Number((effectiveMinutes / 60).toFixed(2));
    }
    calculateLateMinutes(actualCheckIn, shiftStart) {
        const actualMinutes = this.timeToMinutes(actualCheckIn);
        const scheduledMinutes = this.timeToMinutes(shiftStart);
        if (actualMinutes == null || scheduledMinutes == null) return 0;
        return Math.max(0, actualMinutes - scheduledMinutes);
    }
    calculateEarlyDepartureMinutes(actualCheckOut, shiftEnd) {
        const actualMinutes = this.timeToMinutes(actualCheckOut);
        const scheduledMinutes = this.timeToMinutes(shiftEnd);
        if (actualMinutes == null || scheduledMinutes == null) return 0;
        const adjustedActual = actualMinutes < 12 * 60 && scheduledMinutes > 12 * 60 ? actualMinutes + 24 * 60 : actualMinutes;
        const adjustedScheduled = scheduledMinutes < 12 * 60 ? scheduledMinutes + 24 * 60 : scheduledMinutes;
        return Math.max(0, adjustedScheduled - adjustedActual);
    }
    timeToMinutes(timeValue) {
        if (!timeValue) return null;
        const [hoursText, minutesText] = timeValue.split(":");
        const hours = Number(hoursText);
        const minutes = Number(minutesText);
        if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
        return hours * 60 + minutes;
    }
    escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    constructor(employeeRepository, positionRepository, contractRepository, attendanceRepository, leaveTypeRepository, leaveRequestRepository, documentRepository, cnssProfileRepository, irppTaxProfileRepository, shiftRepository, shiftAssignmentRepository, overtimeRequestRepository, leaveBalanceRepository, kpiRepository, kpiAssignmentRepository, goalRepository, performanceReviewRepository, accrualRuleRepository, departmentRepository, hrSettingsRepository, cloudinary){
        this.employeeRepository = employeeRepository;
        this.positionRepository = positionRepository;
        this.contractRepository = contractRepository;
        this.attendanceRepository = attendanceRepository;
        this.leaveTypeRepository = leaveTypeRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.documentRepository = documentRepository;
        this.cnssProfileRepository = cnssProfileRepository;
        this.irppTaxProfileRepository = irppTaxProfileRepository;
        this.shiftRepository = shiftRepository;
        this.shiftAssignmentRepository = shiftAssignmentRepository;
        this.overtimeRequestRepository = overtimeRequestRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
        this.kpiRepository = kpiRepository;
        this.kpiAssignmentRepository = kpiAssignmentRepository;
        this.goalRepository = goalRepository;
        this.performanceReviewRepository = performanceReviewRepository;
        this.accrualRuleRepository = accrualRuleRepository;
        this.departmentRepository = departmentRepository;
        this.hrSettingsRepository = hrSettingsRepository;
        this.cloudinary = cloudinary;
    }
};
HrService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_employeeentity.Employee)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_positionentity.Position)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_contractentity.Contract)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_attendanceentity.Attendance)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_leavetypeentity.LeaveType)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_leaverequestentity.LeaveRequest)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_employeedocumententity.EmployeeDocument)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_cnssprofileentity.CnssProfile)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_irpptaxprofileentity.IrppTaxProfile)),
    _ts_param(9, (0, _typeorm.InjectRepository)(_shiftentity.Shift)),
    _ts_param(10, (0, _typeorm.InjectRepository)(_shiftassignmententity.ShiftAssignment)),
    _ts_param(11, (0, _typeorm.InjectRepository)(_overtimerequestentity.OvertimeRequest)),
    _ts_param(12, (0, _typeorm.InjectRepository)(_leavebalanceentity.LeaveBalance)),
    _ts_param(13, (0, _typeorm.InjectRepository)(_kpientity.Kpi)),
    _ts_param(14, (0, _typeorm.InjectRepository)(_kpiassignmententity.KpiAssignment)),
    _ts_param(15, (0, _typeorm.InjectRepository)(_goalentity.Goal)),
    _ts_param(16, (0, _typeorm.InjectRepository)(_performancereviewentity.PerformanceReview)),
    _ts_param(17, (0, _typeorm.InjectRepository)(_vacationaccrualruleentity.VacationAccrualRule)),
    _ts_param(18, (0, _typeorm.InjectRepository)(_departmententity.Department)),
    _ts_param(19, (0, _typeorm.InjectRepository)(_hrsettingsentity.HrSettings)),
    _ts_param(20, (0, _common.Inject)('CLOUDINARY')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        Object
    ])
], HrService);

//# sourceMappingURL=hr.service.js.map