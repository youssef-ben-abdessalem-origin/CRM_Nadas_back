import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { AuthGuard } from '@nestjs/passport';
import { Currency } from './entities/currency.entity';
import { Country } from './entities/country.entity';
import { Industry } from './entities/industry.entity';
import { Tag } from './entities/tag.entity';
import { ActivityType } from './entities/activity-type.entity';
import { EmailTemplate } from './entities/email-template.entity';
import { Notification } from './entities/notification.entity';
import { AuditLog } from './entities/audit-log.entity';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get('currencies')
  @ApiOperation({ summary: 'Get all currencies' })
  getCurrencies() {
    return this.settingsService.getCurrencies();
  }

  @Post('currencies')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create currency' })
  createCurrency(@Body() body: { 
    name: string; 
    code: string; 
    symbol?: string; 
    symbolArabic?: string; 
    symbolEnglish?: string; 
    isDefault?: boolean 
  }) {
    return this.settingsService.createCurrency(body);
  }

  @Put('currencies/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update currency' })
  updateCurrency(@Param('id') id: string, @Body() body: Partial<Currency>) {
    return this.settingsService.updateCurrency(+id, body);
  }

  @Delete('currencies/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete currency' })
  deleteCurrency(@Param('id') id: string) {
    return this.settingsService.deleteCurrency(+id);
  }

  @Get('countries')
  @ApiOperation({ summary: 'Get all countries' })
  getCountries() {
    return this.settingsService.getCountries();
  }

  @Post('countries')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create country' })
  createCountry(@Body() body: { name: string; code: string; phoneCode?: string; isDefault?: boolean }) {
    return this.settingsService.createCountry(body);
  }

  @Put('countries/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update country' })
  updateCountry(@Param('id') id: string, @Body() body: Partial<Country>) {
    return this.settingsService.updateCountry(+id, body);
  }

  @Delete('countries/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete country' })
  deleteCountry(@Param('id') id: string) {
    return this.settingsService.deleteCountry(+id);
  }

  @Get('industries')
  @ApiOperation({ summary: 'Get all industries' })
  getIndustries() {
    return this.settingsService.getIndustries();
  }

  @Post('industries')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create industry' })
  createIndustry(@Body() body: { name: string; description?: string; isDefault?: boolean }) {
    return this.settingsService.createIndustry(body);
  }

  @Put('industries/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update industry' })
  updateIndustry(@Param('id') id: string, @Body() body: Partial<Industry>) {
    return this.settingsService.updateIndustry(+id, body);
  }

  @Delete('industries/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete industry' })
  deleteIndustry(@Param('id') id: string) {
    return this.settingsService.deleteIndustry(+id);
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get all tags' })
  getTags() {
    return this.settingsService.getTags();
  }

  @Post('tags')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create tag' })
  createTag(@Body() body: { name: string; color?: string }) {
    return this.settingsService.createTag(body);
  }

  @Put('tags/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update tag' })
  updateTag(@Param('id') id: string, @Body() body: Partial<Tag>) {
    return this.settingsService.updateTag(+id, body);
  }

  @Delete('tags/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete tag' })
  deleteTag(@Param('id') id: string) {
    return this.settingsService.deleteTag(+id);
  }

  @Get('activity-types')
  @ApiOperation({ summary: 'Get all activity types' })
  getActivityTypes() {
    return this.settingsService.getActivityTypes();
  }

  @Post('activity-types')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create activity type' })
  createActivityType(@Body() body: { name: string; icon?: string }) {
    return this.settingsService.createActivityType(body);
  }

  @Put('activity-types/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update activity type' })
  updateActivityType(@Param('id') id: string, @Body() body: Partial<ActivityType>) {
    return this.settingsService.updateActivityType(+id, body);
  }

  @Delete('activity-types/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete activity type' })
  deleteActivityType(@Param('id') id: string) {
    return this.settingsService.deleteActivityType(+id);
  }

  @Get('email-templates')
  @ApiOperation({ summary: 'Get all email templates' })
  getEmailTemplates() {
    return this.settingsService.getEmailTemplates();
  }

  @Post('email-templates')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create email template' })
  createEmailTemplate(@Body() body: { name: string; subject?: string; body?: string }) {
    return this.settingsService.createEmailTemplate(body);
  }

  @Put('email-templates/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update email template' })
  updateEmailTemplate(@Param('id') id: string, @Body() body: Partial<EmailTemplate>) {
    return this.settingsService.updateEmailTemplate(+id, body);
  }

  @Delete('email-templates/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete email template' })
  deleteEmailTemplate(@Param('id') id: string) {
    return this.settingsService.deleteEmailTemplate(+id);
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Get notifications' })
  getNotifications(@Query('userId') userId?: string) {
    return this.settingsService.getNotifications(userId ? +userId : undefined);
  }

  @Get('notifications/unread-count')
  @ApiOperation({ summary: 'Get unread notification count' })
  getUnreadNotificationCount(@Query('userId') userId: string) {
    return this.settingsService.getUnreadNotificationCount(+userId);
  }

  @Post('notifications')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create notification' })
  createNotification(@Body() body: { title: string; message?: string; type?: string; userId?: number; link?: string }) {
    return this.settingsService.createNotification(body);
  }

  @Put('notifications/:id/read')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark notification as read' })
  markNotificationAsRead(@Param('id') id: string) {
    return this.settingsService.markNotificationAsRead(+id);
  }

  @Put('notifications/read-all')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark all notifications as read' })
  markAllNotificationsAsRead(@Query('userId') userId: string) {
    return this.settingsService.markAllNotificationsAsRead(+userId);
  }

  @Delete('notifications/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete notification' })
  deleteNotification(@Param('id') id: string) {
    return this.settingsService.deleteNotification(+id);
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Get audit logs' })
  getAuditLogs(
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string,
  ) {
    return this.settingsService.getAuditLogs(
      entityType,
      entityId ? +entityId : undefined,
    );
  }

  @Get('audit-logs/paginated')
  @ApiOperation({ summary: 'Get paginated audit logs' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'entityType', required: false, type: String })
  @ApiQuery({ name: 'entityId', required: false, type: Number })
  getAuditLogsPaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string,
  ) {
    return this.settingsService.getAuditLogsPaginated(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
      search,
      entityType,
      entityId ? +entityId : undefined,
    );
  }

  @Post('audit-logs')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create audit log' })
  createAuditLog(@Body() body: { action: string; entityType?: string; entityId?: number; userId?: number; ipAddress?: string; changes?: string }) {
    return this.settingsService.createAuditLog(body);
  }

  @Get('carriers')
  @ApiOperation({ summary: 'Get all carriers' })
  getCarriers() {
    return this.settingsService.getCarriers();
  }

  @Post('carriers')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create carrier' })
  createCarrier(@Body() body: { name: string; code?: string; trackingUrlTemplate?: string; isActive?: boolean }) {
    return this.settingsService.createCarrier(body);
  }

  @Put('carriers/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update carrier' })
  updateCarrier(@Param('id') id: string, @Body() body: any) {
    return this.settingsService.updateCarrier(+id, body);
  }

  @Delete('carriers/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete carrier' })
  deleteCarrier(@Param('id') id: string) {
    return this.settingsService.deleteCarrier(+id);
  }

  @Get('company')
  @ApiOperation({ summary: 'Get company settings' })
  getCompanySettings() {
    return this.settingsService.getCompanySettings();
  }

  @Put('company')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update company settings' })
  updateCompanySettings(@Body() body: any) {
    return this.settingsService.updateCompanySettings(body);
  }
}
