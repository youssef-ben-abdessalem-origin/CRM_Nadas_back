"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CampaignsController", {
    enumerable: true,
    get: function() {
        return CampaignsController;
    }
});
const _common = require("@nestjs/common");
const _platformexpress = require("@nestjs/platform-express");
const _campaignsservice = require("./campaigns.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
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
let CampaignsController = class CampaignsController {
    async findAll() {
        return this.campaignsService.findAll();
    }
    async getTypes() {
        return this.campaignsService.getTypes();
    }
    async getStatuses() {
        return this.campaignsService.getStatuses();
    }
    async findOne(id) {
        return this.campaignsService.findOne(id);
    }
    async create(data) {
        return this.campaignsService.create(data);
    }
    async update(id, data) {
        return this.campaignsService.update(id, data);
    }
    async delete(id) {
        return this.campaignsService.delete(id);
    }
    async addRecipients(id, leadIds) {
        return this.campaignsService.addRecipients(id, leadIds);
    }
    async importRecipients(id, file, recipientsJson) {
        let records = [];
        if (file) {
            const csvText = file.buffer.toString('utf8');
            records = this.parseCsv(csvText);
        } else if (recipientsJson) {
            records = JSON.parse(recipientsJson);
        }
        return this.campaignsService.importRecipients(id, records);
    }
    async sendCampaign(id, req) {
        return this.campaignsService.sendCampaign(id, req.user.id);
    }
    async convertCampaignLeads(id, ownerId) {
        return this.campaignsService.convertCampaignLeads(id, {
            ownerId
        });
    }
    async getCampaignAnalytics(id) {
        return this.campaignsService.getCampaignAnalytics(id);
    }
    async getCampaignResponses(id) {
        return this.campaignsService.getCampaignResponses(id);
    }
    async generateCampaignReport(id) {
        return this.campaignsService.generateCampaignReport(id);
    }
    parseCsv(text) {
        const lines = text.split(/\r?\n/);
        if (lines.length <= 1) return [];
        const headers = lines[0].split(',').map((h)=>h.trim().replace(/^["']|["']$/g, '').toLowerCase());
        const records = [];
        for(let i = 1; i < lines.length; i++){
            const line = lines[i].trim();
            if (!line) continue;
            const values = [];
            let currentVal = '';
            let inQuotes = false;
            for(let charIndex = 0; charIndex < line.length; charIndex++){
                const char = line[charIndex];
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(currentVal.trim());
                    currentVal = '';
                } else {
                    currentVal += char;
                }
            }
            values.push(currentVal.trim());
            const record = {};
            headers.forEach((header, index)=>{
                let val = values[index] || '';
                val = val.replace(/^["']|["']$/g, '');
                record[header] = val;
            });
            records.push(record);
        }
        return records;
    }
    constructor(campaignsService){
        this.campaignsService = campaignsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)('types'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "getTypes", null);
_ts_decorate([
    (0, _common.Get)('statuses'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "getStatuses", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "create", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "delete", null);
_ts_decorate([
    (0, _common.Post)(':id/recipients'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)('leadIds')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "addRecipients", null);
_ts_decorate([
    (0, _common.Post)(':id/import-recipients'),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)('file')),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.UploadedFile)()),
    _ts_param(2, (0, _common.Body)('recipients')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "importRecipients", null);
_ts_decorate([
    (0, _common.Post)(':id/send'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "sendCampaign", null);
_ts_decorate([
    (0, _common.Post)(':id/convert-leads'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)('ownerId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "convertCampaignLeads", null);
_ts_decorate([
    (0, _common.Get)(':id/analytics'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "getCampaignAnalytics", null);
_ts_decorate([
    (0, _common.Get)(':id/responses'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "getCampaignResponses", null);
_ts_decorate([
    (0, _common.Get)(':id/report'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CampaignsController.prototype, "generateCampaignReport", null);
CampaignsController = _ts_decorate([
    (0, _common.Controller)('campaigns'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _campaignsservice.CampaignsService === "undefined" ? Object : _campaignsservice.CampaignsService
    ])
], CampaignsController);

//# sourceMappingURL=campaigns.controller.js.map