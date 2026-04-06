import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { AuthGuard } from '@nestjs/passport';
import { Contact } from './entities/contact.entity';
import { ContactStatus } from './entities/contact-status.entity';
import { ContactTier } from './entities/contact-tier.entity';

const createContactExample = {
  name: "John Doe",
  email: "john.doe@acme.com",
  phone: "+1 555-123-4567",
  company: "Acme Corp",
  title: "CEO",
  accountId: 1,
  contactStatusId: 1,
  contactTierId: 1,
  location: "San Francisco, CA",
  industry: "Technology",
  website: "https://acme.com",
  notes: "Key decision maker",
  dealValue: 50000,
};

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Get('statuses')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all contact statuses' })
  getStatuses(): Promise<ContactStatus[]> {
    return this.contactsService.getStatuses();
  }

  @Post('statuses')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create contact status' })
  createStatus(@Body() body: { name: string; color?: string }): Promise<ContactStatus> {
    return this.contactsService.createStatus(body.name, body.color);
  }

  @Put('statuses/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update contact status' })
  updateStatus(@Param('id') id: string, @Body() body: Partial<ContactStatus>): Promise<ContactStatus> {
    return this.contactsService.updateStatus(+id, body);
  }

  @Delete('statuses/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete contact status' })
  deleteStatus(@Param('id') id: string): Promise<void> {
    return this.contactsService.deleteStatus(+id);
  }

  @Get('tiers')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all contact tiers' })
  getTiers(): Promise<ContactTier[]> {
    return this.contactsService.getTiers();
  }

  @Post('tiers')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create contact tier' })
  createTier(@Body() body: { name: string; color?: string }): Promise<ContactTier> {
    return this.contactsService.createTier(body.name, body.color);
  }

  @Put('tiers/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update contact tier' })
  updateTier(@Param('id') id: string, @Body() body: Partial<ContactTier>): Promise<ContactTier> {
    return this.contactsService.updateTier(+id, body);
  }

  @Delete('tiers/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete contact tier' })
  deleteTier(@Param('id') id: string): Promise<void> {
    return this.contactsService.deleteTier(+id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ type: Object, description: 'Contact data', examples: { example: { value: createContactExample } } })
  create(@Body() data: Partial<Contact>): Promise<Contact> {
    return this.contactsService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() data: Partial<Contact>): Promise<Contact> {
    return this.contactsService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  delete(@Param('id') id: string): Promise<void> {
    return this.contactsService.delete(+id);
  }
}
