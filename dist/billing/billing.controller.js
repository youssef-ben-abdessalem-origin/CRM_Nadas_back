"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingController", {
    enumerable: true,
    get: function() {
        return BillingController;
    }
});
const _common = require("@nestjs/common");
const _billingservice = require("./billing.service");
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
let BillingController = class BillingController {
    findAllQuotes() {
        return this.billingService.findAllQuotes();
    }
    findQuote(id) {
        return this.billingService.findQuote(id);
    }
    createQuote(data) {
        return this.billingService.createQuote(data);
    }
    updateQuote(id, data) {
        return this.billingService.updateQuote(id, data);
    }
    deleteQuote(id) {
        return this.billingService.deleteQuote(id);
    }
    reviseQuote(id) {
        return this.billingService.reviseQuote(id);
    }
    duplicateQuote(id) {
        return this.billingService.duplicateQuote(id);
    }
    findAllInvoices() {
        return this.billingService.findAllInvoices();
    }
    findInvoice(id) {
        return this.billingService.findInvoice(id);
    }
    createInvoice(data) {
        return this.billingService.createInvoice(data);
    }
    updateInvoice(id, data) {
        return this.billingService.updateInvoice(id, data);
    }
    deleteInvoice(id) {
        return this.billingService.deleteInvoice(id);
    }
    createInvoiceFromQuote(id) {
        return this.billingService.createInvoiceFromQuote(id);
    }
    constructor(billingService){
        this.billingService = billingService;
    }
};
_ts_decorate([
    (0, _common.Get)('quotes'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "findAllQuotes", null);
_ts_decorate([
    (0, _common.Get)('quotes/:id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "findQuote", null);
_ts_decorate([
    (0, _common.Post)('quotes'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "createQuote", null);
_ts_decorate([
    (0, _common.Put)('quotes/:id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "updateQuote", null);
_ts_decorate([
    (0, _common.Delete)('quotes/:id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "deleteQuote", null);
_ts_decorate([
    (0, _common.Post)('quotes/:id/revise'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "reviseQuote", null);
_ts_decorate([
    (0, _common.Post)('quotes/:id/duplicate'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "duplicateQuote", null);
_ts_decorate([
    (0, _common.Get)('invoices'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "findAllInvoices", null);
_ts_decorate([
    (0, _common.Get)('invoices/:id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "findInvoice", null);
_ts_decorate([
    (0, _common.Post)('invoices'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "createInvoice", null);
_ts_decorate([
    (0, _common.Put)('invoices/:id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof Partial === "undefined" ? Object : Partial
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "updateInvoice", null);
_ts_decorate([
    (0, _common.Delete)('invoices/:id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "deleteInvoice", null);
_ts_decorate([
    (0, _common.Post)('quotes/:id/create-invoice'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], BillingController.prototype, "createInvoiceFromQuote", null);
BillingController = _ts_decorate([
    (0, _common.Controller)('billing'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService
    ])
], BillingController);

//# sourceMappingURL=billing.controller.js.map