"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingService", {
    enumerable: true,
    get: function() {
        return BillingService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _billingentity = require("./entities/billing.entity");
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
let BillingService = class BillingService {
    generateQuoteNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `QTE-${year}${month}-${random}`;
    }
    generateInvoiceNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `INV-${year}${month}-${random}`;
    }
    async findAllQuotes() {
        return this.quoteRepository.find({
            order: {
                created: 'DESC'
            }
        });
    }
    async findQuote(id) {
        const quote = await this.quoteRepository.findOne({
            where: {
                id
            },
            relations: [
                'items'
            ]
        });
        if (!quote) throw new _common.NotFoundException('Quote not found');
        return quote;
    }
    async createQuote(data) {
        const quote = this.quoteRepository.create({
            ...data,
            quoteNumber: this.generateQuoteNumber(),
            subtotal: data.subtotal || 0,
            taxAmount: data.taxAmount || 0,
            total: data.total || 0,
            status: data.status || _billingentity.QuoteStatus.DRAFT
        });
        return this.quoteRepository.save(quote);
    }
    async updateQuote(id, data) {
        const quote = await this.findQuote(id);
        Object.assign(quote, data);
        return this.quoteRepository.save(quote);
    }
    async deleteQuote(id) {
        const quote = await this.findQuote(id);
        await this.quoteRepository.remove(quote);
    }
    async findAllInvoices() {
        return this.invoiceRepository.find({
            order: {
                created: 'DESC'
            }
        });
    }
    async findInvoice(id) {
        const invoice = await this.invoiceRepository.findOne({
            where: {
                id
            },
            relations: [
                'items'
            ]
        });
        if (!invoice) throw new _common.NotFoundException('Invoice not found');
        return invoice;
    }
    async createInvoice(data) {
        const invoice = this.invoiceRepository.create({
            ...data,
            invoiceNumber: this.generateInvoiceNumber(),
            subtotal: data.subtotal || 0,
            taxAmount: data.taxAmount || 0,
            total: data.total || 0,
            status: data.status || _billingentity.InvoiceStatus.DRAFT
        });
        return this.invoiceRepository.save(invoice);
    }
    async updateInvoice(id, data) {
        const invoice = await this.findInvoice(id);
        Object.assign(invoice, data);
        return this.invoiceRepository.save(invoice);
    }
    async deleteInvoice(id) {
        const invoice = await this.findInvoice(id);
        await this.invoiceRepository.remove(invoice);
    }
    async createInvoiceFromQuote(quoteId) {
        const quote = await this.findQuote(quoteId);
        const invoice = this.invoiceRepository.create({
            invoiceNumber: this.generateInvoiceNumber(),
            title: quote.title,
            contactId: quote.contactId,
            contactName: quote.contactName,
            contactEmail: quote.contactEmail,
            accountId: quote.accountId,
            accountName: quote.accountName,
            status: _billingentity.InvoiceStatus.DRAFT,
            subtotal: quote.subtotal,
            taxRate: quote.taxRate,
            taxAmount: quote.taxAmount,
            total: quote.total,
            notes: quote.notes,
            quoteId: quote.id
        });
        return this.invoiceRepository.save(invoice);
    }
    constructor(quoteRepository, invoiceRepository){
        this.quoteRepository = quoteRepository;
        this.invoiceRepository = invoiceRepository;
    }
};
BillingService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingentity.Quote)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_billingentity.Invoice)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], BillingService);

//# sourceMappingURL=billing.service.js.map