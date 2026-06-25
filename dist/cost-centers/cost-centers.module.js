"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CostCentersModule", {
    enumerable: true,
    get: function() {
        return CostCentersModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _costcenterentity = require("./entities/cost-center.entity");
const _departmententity = require("../departments/entities/department.entity");
const _employeeentity = require("../hr/entities/employee.entity");
const _costcentersservice = require("./cost-centers.service");
const _costcenterscontroller = require("./cost-centers.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CostCentersModule = class CostCentersModule {
};
CostCentersModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _costcenterentity.CostCenter,
                _departmententity.Department,
                _employeeentity.Employee
            ])
        ],
        providers: [
            _costcentersservice.CostCentersService
        ],
        controllers: [
            _costcenterscontroller.CostCentersController
        ],
        exports: [
            _costcentersservice.CostCentersService
        ]
    })
], CostCentersModule);

//# sourceMappingURL=cost-centers.module.js.map