import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Quote, Invoice } from './entities/billing.entity';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('quotes')
  findAllQuotes(): Promise<Quote[]> {
    return this.billingService.findAllQuotes();
  }

  @Get('quotes/:id')
  findQuote(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return this.billingService.findQuote(id);
  }

  @Post('quotes')
  createQuote(@Body() data: Partial<Quote>): Promise<Quote> {
    return this.billingService.createQuote(data);
  }

  @Put('quotes/:id')
  updateQuote(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Quote>,
  ): Promise<Quote> {
    return this.billingService.updateQuote(id, data);
  }

  @Delete('quotes/:id')
  deleteQuote(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.billingService.deleteQuote(id);
  }

  @Post('quotes/:id/revise')
  reviseQuote(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return this.billingService.reviseQuote(id);
  }

  @Post('quotes/:id/duplicate')
  duplicateQuote(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return this.billingService.duplicateQuote(id);
  }

  @Get('invoices')
  findAllInvoices(): Promise<Invoice[]> {
    return this.billingService.findAllInvoices();
  }

  @Get('invoices/:id')
  findInvoice(@Param('id', ParseIntPipe) id: number): Promise<Invoice> {
    return this.billingService.findInvoice(id);
  }

  @Post('invoices')
  createInvoice(@Body() data: Partial<Invoice>): Promise<Invoice> {
    return this.billingService.createInvoice(data);
  }

  @Put('invoices/:id')
  updateInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Invoice>,
  ): Promise<Invoice> {
    return this.billingService.updateInvoice(id, data);
  }

  @Delete('invoices/:id')
  deleteInvoice(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.billingService.deleteInvoice(id);
  }

  @Post('quotes/:id/create-invoice')
  createInvoiceFromQuote(@Param('id', ParseIntPipe) id: number): Promise<Invoice> {
    return this.billingService.createInvoiceFromQuote(id);
  }
}
