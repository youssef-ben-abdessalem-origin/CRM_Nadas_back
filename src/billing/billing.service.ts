import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote, Invoice, Payment, QuoteStatus, InvoiceStatus } from './entities/billing.entity';
import { ContactsService } from '../contacts/contacts.service';
import { AccountsService } from '../accounts/accounts.service';
import { DealsService } from '../deals/deals.service';
import { GmailService } from '../gmail/gmail.service';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly contactsService: ContactsService,
    private readonly accountsService: AccountsService,
    private readonly dealsService: DealsService,
    private readonly gmailService: GmailService,
  ) {}

  async dispatchQuote(quoteId: number, userId: number): Promise<Quote> {
    const quote = await this.updateQuote(quoteId, { status: QuoteStatus.SENT });
    
    if (quote.contactEmail) {
      const subject = `Proposal Dossier: ${quote.subject || quote.quoteNumber}`;
      const body = `
Dear ${quote.contactName},

Please find the details for proposal ${quote.quoteNumber} synchronized for your review.

Total Amount: ${quote.currency} ${quote.total}

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

  async duplicateQuote(id: number): Promise<Quote> {
    const original = await this.findQuote(id);
    const clone = new Quote();
    
    // Copy all basic fields except ID and Numbers
    const { id: oldId, quoteNumber, items, ...rest } = original;
    Object.assign(clone, rest);
    
    clone.quoteNumber = this.generateQuoteNumber();
    clone.status = QuoteStatus.DRAFT;
    clone.created = new Date();
    clone.updated = new Date();
    
    // Clone items
    if (original.items) {
      clone.items = original.items.map(it => {
        const item = { ...it } as any;
        delete item.id;
        delete item.quoteId;
        return item;
      });
    }

    const saved = await this.quoteRepository.save(clone);
    return this.findQuote(saved.id);
  }

  async reviseQuote(id: number): Promise<Quote> {
    // Similar to duplicate but specifically for revision logic
    // In a real system we might link them, but for now cloning as draft is the requirement
    return this.duplicateQuote(id);
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
    invoice.total = Number(data.total) || Number(data.grandTotal) || 0;
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
    const invoiceItems = (quote.items || []).map(item => {
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

    invoice.items = invoiceItems;
    
    // Pro-active calculation to ensure data integrity
    const calculatedSubtotal = invoiceItems.reduce((acc, it) => acc + (it.unitPrice * it.quantity), 0);
    const calculatedTotal = invoiceItems.reduce((acc, it) => acc + it.total, 0);
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

  private generatePaymentNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `PAY-${year}${month}-${random}`;
  }

  async findAllPayments(): Promise<Payment[]> {
    return this.paymentRepository.find({ order: { created: 'DESC' } });
  }

  async findPayment(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async createPayment(data: any): Promise<Payment> {
    const payment = new Payment();
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

  async deletePayment(id: number): Promise<void> {
    const payment = await this.findPayment(id);
    await this.paymentRepository.remove(payment);
  }
}
