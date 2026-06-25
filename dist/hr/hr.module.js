"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HrModule", {
    enumerable: true,
    get: function() {
        return HrModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _platformexpress = require("@nestjs/platform-express");
const _cloudinarymodule = require("../cloudinary.module");
const _hrservice = require("./hr.service");
const _hrcontroller = require("./hr.controller");
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
let HrModule = class HrModule {
};
HrModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _employeeentity.Employee,
                _positionentity.Position,
                _contractentity.Contract,
                _attendanceentity.Attendance,
                _leavetypeentity.LeaveType,
                _leaverequestentity.LeaveRequest,
                _employeedocumententity.EmployeeDocument,
                _cnssprofileentity.CnssProfile,
                _irpptaxprofileentity.IrppTaxProfile,
                _shiftentity.Shift,
                _shiftassignmententity.ShiftAssignment,
                _overtimerequestentity.OvertimeRequest,
                _leavebalanceentity.LeaveBalance,
                _kpientity.Kpi,
                _kpiassignmententity.KpiAssignment,
                _goalentity.Goal,
                _performancereviewentity.PerformanceReview,
                _vacationaccrualruleentity.VacationAccrualRule,
                _hrsettingsentity.HrSettings,
                _departmententity.Department
            ]),
            _cloudinarymodule.CloudinaryModule,
            _platformexpress.MulterModule.register({
                limits: {
                    fileSize: 10 * 1024 * 1024
                }
            })
        ],
        controllers: [
            _hrcontroller.HrController
        ],
        providers: [
            _hrservice.HrService
        ],
        exports: [
            _hrservice.HrService,
            _typeorm.TypeOrmModule
        ]
    })
], HrModule);

//# sourceMappingURL=hr.module.js.map