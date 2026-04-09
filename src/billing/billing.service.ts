import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote, Invoice, QuoteStatus, InvoiceStatus } from './entities/billing.entity';
import { ContactsService } from '../contacts/contacts.service';
import { AccountsService } from '../accounts/accounts.service';
import { DealsService } from '../deals/deals.service';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly contactsService: ContactsService,
    private readonly accountsService: AccountsService,
    private readonly dealsService: DealsService,
  ) {}

  private generateQuoteNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `QTE-${year}${month}-${random}`;
  }

  private generateInvoiceNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `INV-${year}${month}-${random}`;
  }

  async findAllQuotes(): Promise<Quote[]> {
    return this.quoteRepository.find({ 
      order: { created: 'DESC' },
      relations: ['items'] 
    });
  }

  async findQuote(id: number): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({ 
      where: { id }, 
      relations: ['items'] 
    });
    if (!quote) throw new NotFoundException('Quote not found');
    return quote;
  }

  async createQuote(data: any): Promise<Quote> {
    // Manually construct to avoid TypeORM 'create' overload confusion with 'any'
    const quote = new Quote();
    Object.assign(quote, data);
    
    quote.quoteNumber = this.generateQuoteNumber();
    quote.subtotal = Number(data.subtotal) || 0;
    quote.taxAmount = Number(data.taxAmount) || 0;
    quote.total = Number(data.total) || 0;
    quote.grandTotal = Number(data.grandTotal) || Number(data.total) || 0;
    quote.status = data.status || QuoteStatus.DRAFT;

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

  async updateQuote(id: number, data: any): Promise<Quote> {
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

  async deleteQuote(id: number): Promise<void> {
    const quote = await this.findQuote(id);
    await this.quoteRepository.remove(quote);
  }

  async findAllInvoices(): Promise<Invoice[]> {
    return this.invoiceRepository.find({ 
      order: { created: 'DESC' },
      relations: ['items']
    });
  }

  async findInvoice(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({ 
      where: { id }, 
      relations: ['items'] 
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async createInvoice(data: any): Promise<Invoice> {
    const invoice = new Invoice();
    Object.assign(invoice, data);
    
    invoice.invoiceNumber = this.generateInvoiceNumber();
    invoice.subtotal = Number(data.subtotal) || 0;
    invoice.taxAmount = Number(data.taxAmount) || 0;
    invoice.total = Number(data.total) || 0;
    invoice.status = data.status || InvoiceStatus.DRAFT;

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

  async updateInvoice(id: number, data: any): Promise<Invoice> {
    const invoice = await this.findInvoice(id);
    Object.assign(invoice, data);
    const saved = await this.invoiceRepository.save(invoice);
    return this.findInvoice(saved.id);
  }

  async deleteInvoice(id: number): Promise<void> {
    const invoice = await this.findInvoice(id);
    await this.invoiceRepository.remove(invoice);
  }

  async createInvoiceFromQuote(quoteId: number): Promise<Invoice> {
    const quote = await this.findQuote(quoteId);
    
    const invoice = new Invoice();
    invoice.invoiceNumber = this.generateInvoiceNumber();
    invoice.title = quote.title || quote.subject || 'Sales Invoice';
    invoice.contactId = quote.contactId;
    invoice.contactName = quote.contactName;
    invoice.contactEmail = quote.contactEmail;
    invoice.accountId = quote.accountId;
    invoice.accountName = quote.accountName;
    invoice.status = InvoiceStatus.DRAFT;
    invoice.subtotal = Number(quote.subtotal);
    invoice.taxRate = Number(quote.taxRate);
    invoice.taxAmount = Number(quote.taxAmount);
    invoice.total = Number(quote.total);
    invoice.discount = Number(quote.discount || 0);
    invoice.notes = quote.notes;
    invoice.quoteId = quote.id;
    
    invoice.items = (quote.items || []).map(item => {
      const invItem = {
        productId: item.productId,
        productName: item.productName,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        discount: Number(item.discount),
        taxRate: Number(item.taxRate),
        amount: Number(item.amount),
        total: Number(item.total),
      } as any;
      return invItem;
    });

    const saved = await this.invoiceRepository.save(invoice);
    return this.findInvoice(saved.id);
  }
}
