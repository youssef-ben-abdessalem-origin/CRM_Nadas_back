"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActivitiesModule", {
    enumerable: true,
    get: function() {
        return ActivitiesModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _activityentity = require("./entities/activity.entity");
const _activitytypeentity = require("../settings/entities/activity-type.entity");
const _activitiescontroller = require("./activities.controller");
const _activitiesservice = require("./activities.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ActivitiesModule = class ActivitiesModule {
};
ActivitiesModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _activityentity.Activity,
                _activitytypeentity.ActivityType
            ])
        ],
        controllers: [
            _activitiescontroller.ActivitiesController
        ],
        providers: [
            _activitiesservice.ActivitiesService
        ],
        exports: [
            _activitiesservice.ActivitiesService
        ]
    })
], ActivitiesModule);

//# sourceMappingURL=activities.module.js.map