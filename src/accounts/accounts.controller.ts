import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { AuthGuard } from '@nestjs/passport';
import { Account } from './entities/account.entity';
import { AccountType } from './entities/account-type.entity';
import { AccountStatus } from './entities/account-status.entity';
import { AccountTier } from './entities/account-tier.entity';

const createAccountExample = {
  name: "Acme Corp",
  website: "https://acme.com",
  industry: "Technology",
  accountTypeId: 1,
  accountStatusId: 1,
  accountTierId: 1,
  annualRevenue: 10000000,
  employeeCount: 500,
  phone: "+1 555-123-4567",
  email: "contact@acme.com",
  location: "San Francisco, CA",
  address: "123 Market St",
  city: "San Francisco",
  state: "CA",
  country: "USA",
  zipCode: "94105",
  owner: "John Doe <john@acme.com>",
  description: "Leading technology company",
  notes: "Enterprise customer",
};

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  // Account Types - must come before :id routes
  @Get('types')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all account types' })
  getTypes(): Promise<AccountType[]> {
    return this.accountsService.getTypes();
  }

  @Post('types')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create account type' })
  createType(@Body() data: { name: string; color?: string }): Promise<AccountType> {
    return this.accountsService.createType(data.name, data.color);
  }

  @Put('types/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update account type' })
  updateType(@Param('id') id: string, @Body() data: Partial<AccountType>): Promise<AccountType> {
    return this.accountsService.updateType(+id, data);
  }

  @Delete('types/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete account type' })
  deleteType(@Param('id') id: string): Promise<void> {
    return this.accountsService.deleteType(+id);
  }

  // Account Statuses - must come before :id routes
  @Get('statuses')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all account statuses' })
  getStatuses(): Promise<AccountStatus[]> {
    return this.accountsService.getStatuses();
  }

  @Post('statuses')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create account status' })
  createStatus(@Body() data: { name: string; color?: string }): Promise<AccountStatus> {
    return this.accountsService.createStatus(data.name, data.color);
  }

  @Put('statuses/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update account status' })
  updateStatus(@Param('id') id: string, @Body() data: Partial<AccountStatus>): Promise<AccountStatus> {
    return this.accountsService.updateStatus(+id, data);
  }

  @Delete('statuses/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete account status' })
  deleteStatus(@Param('id') id: string): Promise<void> {
    return this.accountsService.deleteStatus(+id);
  }

  // Account Tiers - must come before :id routes
  @Get('tiers')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all account tiers' })
  getTiers(): Promise<AccountTier[]> {
    return this.accountsService.getTiers();
  }

  @Post('tiers')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create account tier' })
  createTier(@Body() data: { name: string; color?: string }): Promise<AccountTier> {
    return this.accountsService.createTier(data.name, data.color);
  }

  @Put('tiers/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update account tier' })
  updateTier(@Param('id') id: string, @Body() data: Partial<AccountTier>): Promise<AccountTier> {
    return this.accountsService.updateTier(+id, data);
  }

  @Delete('tiers/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete account tier' })
  deleteTier(@Param('id') id: string): Promise<void> {
    return this.accountsService.deleteTier(+id);
  }

  // Account CRUD - comes after specific routes
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<Account> {
    return this.accountsService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ type: Object, description: 'Account data', examples: { example: { value: createAccountExample } } })
  create(@Body() data: Partial<Account>): Promise<Account> {
    console.log('[Controller] Received data, owner:', data?.owner);
    return this.accountsService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() data: Partial<Account>): Promise<Account> {
    return this.accountsService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  delete(@Param('id') id: string): Promise<void> {
    return this.accountsService.delete(+id);
  }

  @Post('bulk-delete')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk delete accounts' })
  bulkDelete(@Body('ids') ids: number[]): Promise<void> {
    return this.accountsService.bulkDelete(ids);
  }

  @Put('bulk-update')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk update accounts' })
  bulkUpdate(@Body() data: { ids: number[]; updates: Partial<Account> }): Promise<Account[]> {
    return this.accountsService.bulkUpdate(data.ids, data.updates);
  }
}
