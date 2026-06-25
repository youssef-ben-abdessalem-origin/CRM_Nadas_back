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
const _contactsservice = require("../contacts/contacts.service");
const _accountsservice = require("../accounts/accounts.service");
const _dealsservice = require("../deals/deals.service");
const _gmailservice = require("../gmail/gmail.service");
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
    async dispatchQuote(quoteId, userId) {
        const quote = await this.updateQuote(quoteId, {
            status: _billingentity.QuoteStatus.SENT
        });
        if (quote.contactEmail) {
            const subject = `Proposal Dossier: ${quote.subject || quote.quoteNumber}`;
            const body = `
Dear ${quote.contactName},

Please find the details for proposal ${quote.quoteNumber} synchronized for your review.

Total Amount: $${quote.total}

You can access the secure portal and view the full tactical proposal here: http://localhost:8080/quotes/${quote.id}

Regards,
Strategic Operations Team
      `;
            try {
                await this.gmailService.sendEmail(userId, quote.contactEmail, subject, body);
            } catch (error) {
                console.error('Automated Dispatch Failed: Gmail Uplink Offline', error);
            // We still return the quote as the status was updated
            }
        }
        return quote;
    }
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
            },
            relations: [
                'items'
            ]
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
        // Manually construct to avoid TypeORM 'create' overload confusion with 'any'
        const quote = new _billingentity.Quote();
        Object.assign(quote, data);
        quote.quoteNumber = this.generateQuoteNumber();
        quote.subtotal = Number(data.subtotal) || 0;
        quote.taxAmount = Number(data.taxAmount) || 0;
        quote.total = Number(data.total) || 0;
        quote.grandTotal = Number(data.grandTotal) || Number(data.total) || 0;
        quote.status = data.status || _billingentity.QuoteStatus.DRAFT;
        // Resolve names
        if (data.contactId) {
            try {
                const contact = await this.contactsService.findOne(Number(data.contactId));
                if (contact) {
                    quote.contactName = contact.name;
                    quote.contactEmail = contact.email;
                }
            } catch (e) {}
        }
        if (data.accountId) {
            try {
                const account = await this.accountsService.findOne(Number(data.accountId));
                if (account) {
                    quote.accountName = account.name;
                }
            } catch (e) {}
        }
        if (data.dealId) {
            try {
                const deal = await this.dealsService.findOne(Number(data.dealId));
                if (deal) {
                    quote.dealName = deal.name;
                }
            } catch (e) {}
        }
        const saved = await this.quoteRepository.save(quote);
        return this.findQuote(saved.id);
    }
    async updateQuote(id, data) {
        const quote = await this.findQuote(id);
        // Resolve names if IDs changed
        if (data.contactId && Number(data.contactId) !== quote.contactId) {
            try {
                const contact = await this.contactsService.findOne(Number(data.contactId));
                if (contact) {
                    quote.contactName = contact.name;
                    quote.contactEmail = contact.email;
                }
            } catch (e) {}
        }
        if (data.accountId && Number(data.accountId) !== quote.accountId) {
            try {
                const account = await this.accountsService.findOne(Number(data.accountId));
                if (account) {
                    quote.accountName = account.name;
                }
            } catch (e) {}
        }
        if (data.dealId && Number(data.dealId) !== quote.dealId) {
            try {
                const deal = await this.dealsService.findOne(Number(data.dealId));
                if (deal) {
                    quote.dealName = deal.name;
                }
            } catch (e) {}
        }
        Object.assign(quote, data);
        const saved = await this.quoteRepository.save(quote);
        return this.findQuote(saved.id);
    }
    async deleteQuote(id) {
        const quote = await this.findQuote(id);
        await this.quoteRepository.remove(quote);
    }
    async duplicateQuote(id) {
        const original = await this.findQuote(id);
        const clone = new _billingentity.Quote();
        // Copy all basic fields except ID and Numbers
        const { id: oldId, quoteNumber, items, ...rest } = original;
        Object.assign(clone, rest);
        clone.quoteNumber = this.generateQuoteNumber();
        clone.status = _billingentity.QuoteStatus.DRAFT;
        clone.created = new Date();
        clone.updated = new Date();
        // Clone items
        if (original.items) {
            clone.items = original.items.map((it)=>{
                const item = {
                    ...it
                };
                delete item.id;
                delete item.quoteId;
                return item;
            });
        }
        const saved = await this.quoteRepository.save(clone);
        return this.findQuote(saved.id);
    }
    async reviseQuote(id) {
        // Similar to duplicate but specifically for revision logic
        // In a real system we might link them, but for now cloning as draft is the requirement
        return this.duplicateQuote(id);
    }
    async findAllInvoices() {
        return this.invoiceRepository.find({
            order: {
                created: 'DESC'
            },
            relations: [
                'items'
            ]
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
        const invoice = new _billingentity.Invoice();
        Object.assign(invoice, data);
        invoice.invoiceNumber = this.generateInvoiceNumber();
        invoice.subtotal = Number(data.subtotal) || 0;
        invoice.taxAmount = Number(data.taxAmount) || 0;
        invoice.total = Number(data.total) || Number(data.grandTotal) || 0;
        invoice.status = data.status || _billingentity.InvoiceStatus.DRAFT;
        // Resolve names
        if (data.contactId) {
            try {
                const contact = await this.contactsService.findOne(Number(data.contactId));
                if (contact) {
                    invoice.contactName = contact.name;
                    invoice.contactEmail = contact.email;
                }
            } catch (e) {}
        }
        if (data.accountId) {
            try {
                const account = await this.accountsService.findOne(Number(data.accountId));
                if (account) {
                    invoice.accountName = account.name;
                }
            } catch (e) {}
        }
        const saved = await this.invoiceRepository.save(invoice);
        return this.findInvoice(saved.id);
    }
    async updateInvoice(id, data) {
        const invoice = await this.findInvoice(id);
        Object.assign(invoice, data);
        const saved = await this.invoiceRepository.save(invoice);
        return this.findInvoice(saved.id);
    }
    async deleteInvoice(id) {
        const invoice = await this.findInvoice(id);
        await this.invoiceRepository.remove(invoice);
    }
    async createInvoiceFromQuote(quoteId) {
        const quote = await this.findQuote(quoteId);
        const invoice = new _billingentity.Invoice();
        invoice.invoiceNumber = this.generateInvoiceNumber();
        invoice.title = quote.title || quote.subject || 'Sales Invoice';
        invoice.contactId = quote.contactId;
        invoice.contactName = quote.contactName;
        invoice.contactEmail = quote.contactEmail;
        invoice.accountId = quote.accountId;
        invoice.accountName = quote.accountName;
        const invoiceItems = (quote.items || []).map((item)=>{
            const invItem = {
                productId: item.productId,
                productName: item.productName,
                quantity: Number(item.quantity),
                unitPrice: Number(item.unitPrice),
                discount: Number(item.discount),
                taxRate: Number(item.taxRate),
                amount: Number(item.amount),
                total: Number(item.total)
            };
            return invItem;
        });
        invoice.items = invoiceItems;
        // Pro-active calculation to ensure data integrity
        const calculatedSubtotal = invoiceItems.reduce((acc, it)=>acc + it.unitPrice * it.quantity, 0);
        const calculatedTotal = invoiceItems.reduce((acc, it)=>acc + it.total, 0);
        const calculatedTax = calculatedTotal - calculatedSubtotal;
        invoice.subtotal = calculatedSubtotal || Number(quote.subtotal);
        invoice.taxAmount = (calculatedTax > 0 ? calculatedTax : 0) || Number(quote.taxAmount);
        invoice.total = calculatedTotal || Number(quote.total);
        invoice.discount = Number(quote.discount || 0);
        invoice.notes = quote.notes;
        invoice.quoteId = quote.id;
        const saved = await this.invoiceRepository.save(invoice);
        return this.findInvoice(saved.id);
    }
    generatePaymentNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `PAY-${year}${month}-${random}`;
    }
    async findAllPayments() {
        return this.paymentRepository.find({
            order: {
                created: 'DESC'
            }
        });
    }
    async findPayment(id) {
        const payment = await this.paymentRepository.findOne({
            where: {
                id
            }
        });
        if (!payment) throw new _common.NotFoundException('Payment not found');
        return payment;
    }
    async createPayment(data) {
        const payment = new _billingentity.Payment();
        Object.assign(payment, data);
        payment.paymentNumber = this.generatePaymentNumber();
        // Resolve names from invoice if provided
        if (data.invoiceId) {
            try {
                const invoice = await this.findInvoice(Number(data.invoiceId));
                if (invoice) {
                    payment.invoiceNumber = invoice.invoiceNumber;
                    payment.contactName = invoice.contactName;
                    payment.accountName = invoice.accountName;
                }
            } catch (e) {}
        }
        const saved = await this.paymentRepository.save(payment);
        return this.findPayment(saved.id);
    }
    async deletePayment(id) {
        const payment = await this.findPayment(id);
        await this.paymentRepository.remove(payment);
    }
    constructor(quoteRepository, invoiceRepository, paymentRepository, contactsService, accountsService, dealsService, gmailService){
        this.quoteRepository = quoteRepository;
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
        this.contactsService = contactsService;
        this.accountsService = accountsService;
        this.dealsService = dealsService;
        this.gmailService = gmailService;
    }
};
BillingService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingentity.Quote)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_billingentity.Invoice)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_billingentity.Payment)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _contactsservice.ContactsService === "undefined" ? Object : _contactsservice.ContactsService,
        typeof _accountsservice.AccountsService === "undefined" ? Object : _accountsservice.AccountsService,
        typeof _dealsservice.DealsService === "undefined" ? Object : _dealsservice.DealsService,
        typeof _gmailservice.GmailService === "undefined" ? Object : _gmailservice.GmailService
    ])
], BillingService);

//# sourceMappingURL=billing.service.js.map