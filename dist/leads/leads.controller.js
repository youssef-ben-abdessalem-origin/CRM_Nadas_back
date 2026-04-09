"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LeadsController", {
    enumerable: true,
    get: function() {
        return LeadsController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _leadsservice = require("./leads.service");
const _passport = require("@nestjs/passport");
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
const createLeadExample = {
    name: "Alexander von Pierce",
    emails: [
        "alexander.p@quantum-invest.sh",
        "info@quantum-hq.com"
    ],
    phones: [
        "+44 20 7946 0958",
        "+1 (555) 000-1111"
    ],
    company: "Quantum Investment Group",
    title: "Chief Investment Officer",
    sourceId: 1,
    stageId: 1,
    scoreCategoryId: 2,
    priorityId: 3,
    qualificationStageId: 1,
    value: 250000.00,
    location: "London, UK / San Francisco, US",
    industry: "Venture Capital & Fintech",
    website: "https://quantum-invest.sh",
    notes: "High-priority Whale lead. Interested in Series B participation. Relicensed from internal strategy session.",
    tags: [
        "whale",
        "expansion",
        "strategic-2026"
    ],
    nextFollowUp: "2026-04-10"
};
let LeadsController = class LeadsController {
    findAll() {
        return this.leadsService.findAll();
    }
    findAllPaginated(page, limit, search, stageId) {
        return this.leadsService.findAllPaginated(page ? parseInt(page) : 1, limit ? parseInt(limit) : 10, search, stageId ? parseInt(stageId) : undefined);
    }
    getSources() {
        return this.leadsService.getSources();
    }
    getStages() {
        return this.leadsService.getStages();
    }
    getScores() {
        return this.leadsService.getScores();
    }
    getPriorities() {
        return this.leadsService.getPriorities();
    }
    getQualifications() {
        return this.leadsService.getQualifications();
    }
    createSource(body) {
        return this.leadsService.createSource(body.name);
    }
    updateSource(id, body) {
        return this.leadsService.updateSource(+id, body);
    }
    deleteSource(id) {
        return this.leadsService.deleteSource(+id);
    }
    createStage(body) {
        return this.leadsService.createStage(body.name, body.order);
    }
    updateStage(id, body) {
        return this.leadsService.updateStage(+id, body);
    }
    deleteStage(id) {
        return this.leadsService.deleteStage(+id);
    }
    createScore(body) {
        return this.leadsService.createScore(body.name, body.color);
    }
    updateScore(id, body) {
        return this.leadsService.updateScore(+id, body);
    }
    deleteScore(id) {
        return this.leadsService.deleteScore(+id);
    }
    createPriority(body) {
        return this.leadsService.createPriority(body.name, body.color);
    }
    updatePriority(id, body) {
        return this.leadsService.updatePriority(+id, body);
    }
    deletePriority(id) {
        return this.leadsService.deletePriority(+id);
    }
    createQualification(body) {
        return this.leadsService.createQualification(body.name);
    }
    updateQualification(id, body) {
        return this.leadsService.updateQualification(+id, body);
    }
    deleteQualification(id) {
        return this.leadsService.deleteQualification(+id);
    }
    findOne(id) {
        return this.leadsService.findOne(+id);
    }
    create(data) {
        return this.leadsService.create(data);
    }
    update(id, data) {
        return this.leadsService.update(+id, data);
    }
    delete(id) {
        return this.leadsService.delete(+id);
    }
    convert(id) {
        return this.leadsService.convert(+id);
    }
    convertToDeal(id) {
        return this.leadsService.convertToDeal(+id);
    }
    bulkDelete(ids) {
        return this.leadsService.bulkDelete(ids);
    }
    bulkUpdate(data) {
        return this.leadsService.bulkUpdate(data.ids, data.updates);
    }
    constructor(leadsService){
        this.leadsService = leadsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all leads'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('paginated'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get paginated leads for table view'
    }),
    (0, _swagger.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        example: 1
    }),
    (0, _swagger.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        example: 10
    }),
    (0, _swagger.ApiQuery)({
        name: 'search',
        required: false,
        type: String
    }),
    (0, _swagger.ApiQuery)({
        name: 'stageId',
        required: false,
        type: Number
    }),
    _ts_param(0, (0, _common.Query)('page')),
    _ts_param(1, (0, _common.Query)('limit')),
    _ts_param(2, (0, _common.Query)('search')),
    _ts_param(3, (0, _common.Query)('stageId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], LeadsController.prototype, "findAllPaginated", null);
_ts_decorate([
    (0, _common.Get)('sources'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all lead sources'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "getSources", null);
_ts_decorate([
    (0, _common.Get)('stages'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all pipeline stages'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "getStages", null);
_ts_decorate([
    (0, _common.Get)('scores'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all score categories'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "getScores", null);
_ts_decorate([
    (0, _common.Get)('priorities'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all priorities'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "getPriorities", null);
_ts_decorate([
    (0, _common.Get)('qualifications'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get all qualification stages'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "getQualifications", null);
_ts_decorate([
    (0, _common.Post)('sources'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create lead source'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "createSource", null);
_ts_decorate([
    (0, _common.Put)('sources/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update lead source'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "updateSource", null);
_ts_decorate([
    (0, _common.Delete)('sources/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete lead source'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "deleteSource", null);
_ts_decorate([
    (0, _common.Post)('stages'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create pipeline stage'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "createStage", null);
_ts_decorate([
    (0, _common.Put)('stages/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update pipeline stage'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "updateStage", null);
_ts_decorate([
    (0, _common.Delete)('stages/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete pipeline stage'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "deleteStage", null);
_ts_decorate([
    (0, _common.Post)('scores'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create score category'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "createScore", null);
_ts_decorate([
    (0, _common.Put)('scores/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update score category'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "updateScore", null);
_ts_decorate([
    (0, _common.Delete)('scores/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete score category'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "deleteScore", null);
_ts_decorate([
    (0, _common.Post)('priorities'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create priority'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "createPriority", null);
_ts_decorate([
    (0, _common.Put)('priorities/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update priority'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "updatePriority", null);
_ts_decorate([
    (0, _common.Delete)('priorities/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete priority'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "deletePriority", null);
_ts_decorate([
    (0, _common.Post)('qualifications'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create qualification stage'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "createQualification", null);
_ts_decorate([
    (0, _common.Put)('qualifications/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update qualification stage'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "updateQualification", null);
_ts_decorate([
    (0, _common.Delete)('qualifications/:id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete qualification stage'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "deleteQualification", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get lead by ID'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create lead'
    }),
    (0, _swagger.ApiBody)({
        type: Object,
        description: 'Lead data',
        examples: {
            example: {
                value: createLeadExample
            }
        }
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Update lead'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Delete lead'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "delete", null);
_ts_decorate([
    (0, _common.Post)(':id/convert'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Convert lead to Account + Contact'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "convert", null);
_ts_decorate([
    (0, _common.Post)(':id/convert-to-deal'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Convert lead to Deal only'
    }),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "convertToDeal", null);
_ts_decorate([
    (0, _common.Post)('bulk-delete'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Bulk delete leads'
    }),
    _ts_param(0, (0, _common.Body)('ids')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "bulkDelete", null);
_ts_decorate([
    (0, _common.Put)('bulk-update'),
    (0, _common.UseGuards)((0, _passport.AuthGuard)('jwt')),
    (0, _swagger.ApiBearerAuth)(),
    (0, _swagger.ApiOperation)({
        summary: 'Bulk update leads'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], LeadsController.prototype, "bulkUpdate", null);
LeadsController = _ts_decorate([
    (0, _swagger.ApiTags)('Leads'),
    (0, _common.Controller)('leads'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _leadsservice.LeadsService === "undefined" ? Object : _leadsservice.LeadsService
    ])
], LeadsController);

//# sourceMappingURL=leads.controller.js.map