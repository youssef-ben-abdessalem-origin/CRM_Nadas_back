import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote, Invoice, QuoteStatus, InvoiceStatus } from './entities/billing.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
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
    return this.quoteRepository.find({ order: { created: 'DESC' } });
  }

  async findQuote(id: number): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({ where: { id }, relations: ['items'] });
    if (!quote) throw new NotFoundException('Quote not found');
    return quote;
  }

  async createQuote(data: Partial<Quote>): Promise<Quote> {
    const quote = this.quoteRepository.create({
      ...data,
      quoteNumber: this.generateQuoteNumber(),
      subtotal: data.subtotal || 0,
      taxAmount: data.taxAmount || 0,
      total: data.total || 0,
      status: data.status || QuoteStatus.DRAFT,
    });

    return this.quoteRepository.save(quote);
  }

  async updateQuote(id: number, data: Partial<Quote>): Promise<Quote> {
    const quote = await this.findQuote(id);
    Object.assign(quote, data);
    return this.quoteRepository.save(quote);
  }

  async deleteQuote(id: number): Promise<void> {
    const quote = await this.findQuote(id);
    await this.quoteRepository.remove(quote);
  }

  async findAllInvoices(): Promise<Invoice[]> {
    return this.invoiceRepository.find({ order: { created: 'DESC' } });
  }

  async findInvoice(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({ where: { id }, relations: ['items'] });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async createInvoice(data: Partial<Invoice>): Promise<Invoice> {
    const invoice = this.invoiceRepository.create({
      ...data,
      invoiceNumber: this.generateInvoiceNumber(),
      subtotal: data.subtotal || 0,
      taxAmount: data.taxAmount || 0,
      total: data.total || 0,
      status: data.status || InvoiceStatus.DRAFT,
    });

    return this.invoiceRepository.save(invoice);
  }

  async updateInvoice(id: number, data: Partial<Invoice>): Promise<Invoice> {
    const invoice = await this.findInvoice(id);
    Object.assign(invoice, data);
    return this.invoiceRepository.save(invoice);
  }

  async deleteInvoice(id: number): Promise<void> {
    const invoice = await this.findInvoice(id);
    await this.invoiceRepository.remove(invoice);
  }

  async createInvoiceFromQuote(quoteId: number): Promise<Invoice> {
    const quote = await this.findQuote(quoteId);
    
    const invoice = this.invoiceRepository.create({
      invoiceNumber: this.generateInvoiceNumber(),
      title: quote.title,
      contactId: quote.contactId,
      contactName: quote.contactName,
      contactEmail: quote.contactEmail,
      accountId: quote.accountId,
      accountName: quote.accountName,
      status: InvoiceStatus.DRAFT,
      subtotal: quote.subtotal,
      taxRate: quote.taxRate,
      taxAmount: quote.taxAmount,
      total: quote.total,
      notes: quote.notes,
      quoteId: quote.id,
    });

    return this.invoiceRepository.save(invoice);
  }
}
