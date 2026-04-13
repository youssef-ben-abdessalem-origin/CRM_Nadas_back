"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SettingsService", {
    enumerable: true,
    get: function() {
        return SettingsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _currencyentity = require("./entities/currency.entity");
const _countryentity = require("./entities/country.entity");
const _industryentity = require("./entities/industry.entity");
const _tagentity = require("./entities/tag.entity");
const _activitytypeentity = require("./entities/activity-type.entity");
const _emailtemplateentity = require("./entities/email-template.entity");
const _notificationentity = require("./entities/notification.entity");
const _auditlogentity = require("./entities/audit-log.entity");
const _carrierentity = require("./entities/carrier.entity");
const _companysettingsentity = require("./entities/company-settings.entity");
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
let SettingsService = class SettingsService {
    async onModuleInit() {
        await this.seedDefaultData();
    }
    async seedDefaultData() {
        const currenciesCount = await this.currencyRepository.count();
        if (currenciesCount === 0) {
            const defaultCurrencies = [
                {
                    name: 'US Dollar',
                    code: 'USD',
                    symbol: '$',
                    symbolArabic: '$',
                    symbolEnglish: '$',
                    isDefault: true
                },
                {
                    name: 'Euro',
                    code: 'EUR',
                    symbol: '€',
                    symbolArabic: '€',
                    symbolEnglish: '€'
                },
                {
                    name: 'British Pound',
                    code: 'GBP',
                    symbol: '£',
                    symbolArabic: '£',
                    symbolEnglish: '£'
                },
                {
                    name: 'Japanese Yen',
                    code: 'JPY',
                    symbol: '¥',
                    symbolArabic: '¥',
                    symbolEnglish: '¥'
                },
                {
                    name: 'Tunisian Dinar',
                    code: 'TND',
                    symbol: 'د.ت',
                    symbolArabic: 'د.ت',
                    symbolEnglish: 'TND'
                },
                {
                    name: 'Canadian Dollar',
                    code: 'CAD',
                    symbol: 'C$',
                    symbolArabic: 'C$',
                    symbolEnglish: 'C$'
                },
                {
                    name: 'Australian Dollar',
                    code: 'AUD',
                    symbol: 'A$',
                    symbolArabic: 'A$',
                    symbolEnglish: 'A$'
                }
            ];
            for (const currency of defaultCurrencies){
                await this.currencyRepository.save(currency);
            }
        } else {
            // Patch existing records if symbols are missing
            const existing = await this.currencyRepository.find();
            const defaults = [
                {
                    code: 'USD',
                    ar: '$',
                    en: '$'
                },
                {
                    code: 'EUR',
                    ar: '€',
                    en: '€'
                },
                {
                    code: 'GBP',
                    ar: '£',
                    en: '£'
                },
                {
                    code: 'JPY',
                    ar: '¥',
                    en: '¥'
                },
                {
                    code: 'TND',
                    ar: 'د.ت',
                    en: 'TND'
                },
                {
                    code: 'CAD',
                    ar: 'C$',
                    en: 'C$'
                },
                {
                    code: 'AUD',
                    ar: 'A$',
                    en: 'A$'
                }
            ];
            for (const curr of existing){
                if (!curr.symbolArabic || !curr.symbolEnglish) {
                    const match = defaults.find((d)=>d.code === curr.code);
                    if (match) {
                        await this.currencyRepository.update(curr.id, {
                            symbolArabic: curr.symbolArabic || match.ar,
                            symbolEnglish: curr.symbolEnglish || match.en
                        });
                    }
                }
            }
        }
        const countriesCount = await this.countryRepository.count();
        if (countriesCount === 0) {
            const defaultCountries = [
                {
                    name: 'United States',
                    code: 'US',
                    phoneCode: '+1',
                    isDefault: true
                },
                {
                    name: 'United Kingdom',
                    code: 'GB',
                    phoneCode: '+44'
                },
                {
                    name: 'France',
                    code: 'FR',
                    phoneCode: '+33'
                },
                {
                    name: 'Germany',
                    code: 'DE',
                    phoneCode: '+49'
                },
                {
                    name: 'Tunisia',
                    code: 'TN',
                    phoneCode: '+216'
                },
                {
                    name: 'Canada',
                    code: 'CA',
                    phoneCode: '+1'
                },
                {
                    name: 'Australia',
                    code: 'AU',
                    phoneCode: '+61'
                },
                {
                    name: 'Japan',
                    code: 'JP',
                    phoneCode: '+81'
                },
                {
                    name: 'China',
                    code: 'CN',
                    phoneCode: '+86'
                },
                {
                    name: 'India',
                    code: 'IN',
                    phoneCode: '+91'
                },
                {
                    name: 'Brazil',
                    code: 'BR',
                    phoneCode: '+55'
                },
                {
                    name: 'Spain',
                    code: 'ES',
                    phoneCode: '+34'
                },
                {
                    name: 'Italy',
                    code: 'IT',
                    phoneCode: '+39'
                },
                {
                    name: 'Netherlands',
                    code: 'NL',
                    phoneCode: '+31'
                },
                {
                    name: 'Belgium',
                    code: 'BE',
                    phoneCode: '+32'
                },
                {
                    name: 'Switzerland',
                    code: 'CH',
                    phoneCode: '+41'
                },
                {
                    name: 'Austria',
                    code: 'AT',
                    phoneCode: '+43'
                },
                {
                    name: 'Poland',
                    code: 'PL',
                    phoneCode: '+48'
                },
                {
                    name: 'Sweden',
                    code: 'SE',
                    phoneCode: '+46'
                },
                {
                    name: 'Norway',
                    code: 'NO',
                    phoneCode: '+47'
                }
            ];
            for (const country of defaultCountries){
                await this.countryRepository.save(country);
            }
        }
        const industriesCount = await this.industryRepository.count();
        if (industriesCount === 0) {
            const defaultIndustries = [
                {
                    name: 'Technology',
                    description: 'Software, IT services, and tech companies',
                    isDefault: true
                },
                {
                    name: 'Healthcare',
                    description: 'Medical, pharmaceutical, and healthcare services'
                },
                {
                    name: 'Finance',
                    description: 'Banking, insurance, and financial services'
                },
                {
                    name: 'Manufacturing',
                    description: 'Manufacturing and industrial production'
                },
                {
                    name: 'Retail',
                    description: 'Retail and e-commerce'
                },
                {
                    name: 'Education',
                    description: 'Schools, universities, and training'
                },
                {
                    name: 'Real Estate',
                    description: 'Property development and management'
                },
                {
                    name: 'Construction',
                    description: 'Building and construction services'
                },
                {
                    name: 'Agriculture',
                    description: 'Farming and agricultural products'
                },
                {
                    name: 'Energy',
                    description: 'Oil, gas, and renewable energy'
                },
                {
                    name: 'Telecommunications',
                    description: 'Telecom and internet providers'
                },
                {
                    name: 'Transport',
                    description: 'Logistics and transportation'
                },
                {
                    name: 'Food & Beverage',
                    description: 'Food production and hospitality'
                },
                {
                    name: 'Media',
                    description: 'Entertainment and media companies'
                },
                {
                    name: 'Consulting',
                    description: 'Business and professional consulting'
                }
            ];
            for (const industry of defaultIndustries){
                await this.industryRepository.save(industry);
            }
        }
        const tagsCount = await this.tagRepository.count();
        if (tagsCount === 0) {
            const defaultTags = [
                {
                    name: 'VIP',
                    color: '#ef4444'
                },
                {
                    name: 'Hot Lead',
                    color: '#f97316'
                },
                {
                    name: 'Follow Up',
                    color: '#eab308'
                },
                {
                    name: 'New',
                    color: '#22c55e'
                },
                {
                    name: 'Pending',
                    color: '#3b82f6'
                },
                {
                    name: 'Urgent',
                    color: '#dc2626'
                },
                {
                    name: 'Partner',
                    color: '#8b5cf6'
                },
                {
                    name: 'Competitor',
                    color: '#64748b'
                }
            ];
            for (const tag of defaultTags){
                await this.tagRepository.save(tag);
            }
        }
        const activityTypesCount = await this.activityTypeRepository.count();
        if (activityTypesCount === 0) {
            const defaultActivityTypes = [
                {
                    name: 'Call',
                    icon: 'phone'
                },
                {
                    name: 'Email',
                    icon: 'mail'
                },
                {
                    name: 'Meeting',
                    icon: 'calendar'
                },
                {
                    name: 'Note',
                    icon: 'file-text'
                },
                {
                    name: 'Task',
                    icon: 'check-square'
                },
                {
                    name: 'Follow-up',
                    icon: 'clock'
                }
            ];
            for (const type of defaultActivityTypes){
                await this.activityTypeRepository.save(type);
            }
        }
        const emailTemplatesCount = await this.emailTemplateRepository.count();
        if (emailTemplatesCount === 0) {
            const defaultEmailTemplates = [
                {
                    name: 'Lead Follow-up',
                    subject: 'Following up on our conversation',
                    body: 'Hi {{name}},\n\nI wanted to follow up on our recent conversation about {{company}}. Let me know if you have any questions.\n\nBest regards'
                },
                {
                    name: 'Meeting Request',
                    subject: 'Meeting Request',
                    body: 'Hi {{name}},\n\nI would like to schedule a meeting to discuss {{topic}}. Please let me know your availability.\n\nBest regards'
                },
                {
                    name: 'Proposal Sent',
                    subject: 'Proposal for {{company}}',
                    body: 'Hi {{name}},\n\nPlease find attached our proposal for {{company}}. We look forward to hearing from you.\n\nBest regards'
                }
            ];
            for (const template of defaultEmailTemplates){
                await this.emailTemplateRepository.save(template);
            }
        }
        const carriersCount = await this.carrierRepository.count();
        if (carriersCount === 0) {
            const defaultCarriers = [
                {
                    name: 'FedEX',
                    code: 'FEDEX',
                    trackingUrlTemplate: 'https://www.fedex.com/fedextrack/?trknbr={{trackingNumber}}'
                },
                {
                    name: 'DHL Express',
                    code: 'DHL',
                    trackingUrlTemplate: 'https://www.dhl.com/en/express/tracking.html?AWB={{trackingNumber}}'
                },
                {
                    name: 'UPS Worldwide',
                    code: 'UPS',
                    trackingUrlTemplate: 'https://www.ups.com/track?loc=en_US&tracknum={{trackingNumber}}'
                },
                {
                    name: 'Aramex',
                    code: 'ARAMEX',
                    trackingUrlTemplate: 'https://www.aramex.com/track/results?shipmentNumber={{trackingNumber}}'
                }
            ];
            for (const carrier of defaultCarriers){
                await this.carrierRepository.save(carrier);
            }
        }
        const companySettingsCount = await this.companySettingsRepository.count();
        if (companySettingsCount === 0) {
            await this.companySettingsRepository.save({
                name: 'Nadas Group',
                legalName: 'Nadas Group SARL',
                taxId: '1234567/A/M/000',
                commercialRegistration: 'B0123456789',
                industry: 'Logistics & Supply Chain',
                logoUrl: 'https://www.nadas-group.com/wp-content/uploads/2023/07/logo-nadas-avec-contour.webp',
                primaryColor: '#003366',
                officeAddress: 'Avenue Habib Bourguiba, Tunis 1001, Tunisia',
                phone: '+216 71 000 000',
                email: 'contact@nadas-group.com',
                website: 'https://www.nadas-group.com',
                defaultCurrency: 'TND',
                defaultTaxRate: 19.00,
                quoteNumberPrefix: 'QT-{{YYYY}}-{{0000}}',
                termsAndConditions: 'All deployments and vector asset engagements are subject to Nadas Group executive validation. Payment terms are net 14 days unless otherwise specified in the project dossier.'
            });
        }
    }
    async getCurrencies(includeInactive = false) {
        return this.currencyRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                isDefault: 'DESC',
                name: 'ASC'
            }
        });
    }
    async getDefaultCurrencyInfo() {
        const currency = await this.currencyRepository.findOne({
            where: {
                isDefault: true,
                isActive: true
            }
        });
        if (!currency) {
            // Fallback if none found
            const first = await this.currencyRepository.findOne({
                where: {
                    isActive: true
                }
            });
            if (first) return first;
            return {
                code: 'USD',
                symbol: '$',
                name: 'US Dollar',
                isDefault: true
            };
        }
        return currency;
    }
    async getCurrencyById(id) {
        const currency = await this.currencyRepository.findOne({
            where: {
                id
            }
        });
        if (!currency) throw new _common.NotFoundException('Currency not found');
        return currency;
    }
    async createCurrency(data) {
        if (data.isDefault) {
            await this.currencyRepository.update({
                isDefault: true
            }, {
                isDefault: false
            });
        }
        return this.currencyRepository.save(data);
    }
    async updateCurrency(id, data) {
        const currency = await this.getCurrencyById(id);
        if (data.isDefault) {
            await this.currencyRepository.update({
                isDefault: true
            }, {
                isDefault: false
            });
        }
        Object.assign(currency, data);
        return this.currencyRepository.save(currency);
    }
    async deleteCurrency(id) {
        const currency = await this.getCurrencyById(id);
        if (currency.isDefault) {
            throw new Error('Cannot delete default currency');
        }
        await this.currencyRepository.remove(currency);
    }
    async getCountries(includeInactive = false) {
        return this.countryRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                isDefault: 'DESC',
                name: 'ASC'
            }
        });
    }
    async getCountryById(id) {
        const country = await this.countryRepository.findOne({
            where: {
                id
            }
        });
        if (!country) throw new _common.NotFoundException('Country not found');
        return country;
    }
    async createCountry(data) {
        if (data.isDefault) {
            await this.countryRepository.update({
                isDefault: true
            }, {
                isDefault: false
            });
        }
        return this.countryRepository.save(data);
    }
    async updateCountry(id, data) {
        const country = await this.getCountryById(id);
        if (data.isDefault) {
            await this.countryRepository.update({
                isDefault: true
            }, {
                isDefault: false
            });
        }
        Object.assign(country, data);
        return this.countryRepository.save(country);
    }
    async deleteCountry(id) {
        const country = await this.getCountryById(id);
        if (country.isDefault) {
            throw new Error('Cannot delete default country');
        }
        await this.countryRepository.remove(country);
    }
    async getIndustries(includeInactive = false) {
        return this.industryRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                isDefault: 'DESC',
                name: 'ASC'
            }
        });
    }
    async getIndustryById(id) {
        const industry = await this.industryRepository.findOne({
            where: {
                id
            }
        });
        if (!industry) throw new _common.NotFoundException('Industry not found');
        return industry;
    }
    async createIndustry(data) {
        if (data.isDefault) {
            await this.industryRepository.update({
                isDefault: true
            }, {
                isDefault: false
            });
        }
        return this.industryRepository.save(data);
    }
    async updateIndustry(id, data) {
        const industry = await this.getIndustryById(id);
        if (data.isDefault) {
            await this.industryRepository.update({
                isDefault: true
            }, {
                isDefault: false
            });
        }
        Object.assign(industry, data);
        return this.industryRepository.save(industry);
    }
    async deleteIndustry(id) {
        const industry = await this.getIndustryById(id);
        if (industry.isDefault) {
            throw new Error('Cannot delete default industry');
        }
        await this.industryRepository.remove(industry);
    }
    async getTags(includeInactive = false) {
        return this.tagRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                name: 'ASC'
            }
        });
    }
    async getTagById(id) {
        const tag = await this.tagRepository.findOne({
            where: {
                id
            }
        });
        if (!tag) throw new _common.NotFoundException('Tag not found');
        return tag;
    }
    async createTag(data) {
        return this.tagRepository.save(data);
    }
    async updateTag(id, data) {
        const tag = await this.getTagById(id);
        Object.assign(tag, data);
        return this.tagRepository.save(tag);
    }
    async deleteTag(id) {
        const tag = await this.getTagById(id);
        await this.tagRepository.remove(tag);
    }
    async getActivityTypes(includeInactive = false) {
        return this.activityTypeRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                name: 'ASC'
            }
        });
    }
    async getActivityTypeById(id) {
        const type = await this.activityTypeRepository.findOne({
            where: {
                id
            }
        });
        if (!type) throw new _common.NotFoundException('Activity type not found');
        return type;
    }
    async createActivityType(data) {
        return this.activityTypeRepository.save(data);
    }
    async updateActivityType(id, data) {
        const type = await this.getActivityTypeById(id);
        Object.assign(type, data);
        return this.activityTypeRepository.save(type);
    }
    async deleteActivityType(id) {
        const type = await this.getActivityTypeById(id);
        await this.activityTypeRepository.remove(type);
    }
    async getEmailTemplates(includeInactive = false) {
        return this.emailTemplateRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                name: 'ASC'
            }
        });
    }
    async getEmailTemplateById(id) {
        const template = await this.emailTemplateRepository.findOne({
            where: {
                id
            }
        });
        if (!template) throw new _common.NotFoundException('Email template not found');
        return template;
    }
    async createEmailTemplate(data) {
        return this.emailTemplateRepository.save(data);
    }
    async updateEmailTemplate(id, data) {
        const template = await this.getEmailTemplateById(id);
        Object.assign(template, data);
        return this.emailTemplateRepository.save(template);
    }
    async deleteEmailTemplate(id) {
        const template = await this.getEmailTemplateById(id);
        await this.emailTemplateRepository.remove(template);
    }
    async getNotifications(userId) {
        const where = userId ? {
            userId
        } : {};
        return this.notificationRepository.find({
            where,
            order: {
                createdAt: 'DESC'
            },
            take: 50
        });
    }
    async getUnreadNotificationCount(userId) {
        return this.notificationRepository.count({
            where: {
                userId,
                isRead: false
            }
        });
    }
    async createNotification(data) {
        return this.notificationRepository.save(data);
    }
    async markNotificationAsRead(id) {
        await this.notificationRepository.update(id, {
            isRead: true
        });
    }
    async markAllNotificationsAsRead(userId) {
        await this.notificationRepository.update({
            userId,
            isRead: false
        }, {
            isRead: true
        });
    }
    async deleteNotification(id) {
        const notification = await this.notificationRepository.findOne({
            where: {
                id
            }
        });
        if (!notification) throw new _common.NotFoundException('Notification not found');
        await this.notificationRepository.remove(notification);
    }
    async getAuditLogs(entityType, entityId) {
        const where = {};
        if (entityType) where.entityType = entityType;
        if (entityId) where.entityId = entityId;
        return this.auditLogRepository.find({
            where,
            order: {
                createdAt: 'DESC'
            },
            take: 100,
            relations: [
                'user'
            ]
        });
    }
    async getAuditLogsPaginated(page = 1, limit = 10, search, entityType, entityId) {
        const safePage = Math.max(1, page || 1);
        const safeLimit = Math.max(1, Math.min(100, limit || 10));
        const qb = this.auditLogRepository.createQueryBuilder('audit').leftJoinAndSelect('audit.user', 'user');
        if (entityType) {
            qb.andWhere('audit.entityType = :entityType', {
                entityType
            });
        }
        if (entityId) {
            qb.andWhere('audit.entityId = :entityId', {
                entityId
            });
        }
        if (search) {
            qb.andWhere(`(audit.action ILIKE :search
          OR audit.entityType ILIKE :search
          OR audit.changes ILIKE :search
          OR user.name ILIKE :search
          OR user.email ILIKE :search)`, {
                search: `%${search}%`
            });
        }
        const total = await qb.getCount();
        const data = await qb.orderBy('audit.createdAt', 'DESC').skip((safePage - 1) * safeLimit).take(safeLimit).getMany();
        return {
            data,
            total,
            page: safePage,
            limit: safeLimit,
            totalPages: Math.ceil(total / safeLimit)
        };
    }
    async createAuditLog(data) {
        return this.auditLogRepository.save(data);
    }
    async getCarriers(includeInactive = false) {
        return this.carrierRepository.find({
            where: includeInactive ? {} : {
                isActive: true
            },
            order: {
                name: 'ASC'
            }
        });
    }
    async getCarrierById(id) {
        const carrier = await this.carrierRepository.findOne({
            where: {
                id
            }
        });
        if (!carrier) throw new _common.NotFoundException('Carrier not found');
        return carrier;
    }
    async createCarrier(data) {
        return this.carrierRepository.save(data);
    }
    async updateCarrier(id, data) {
        const carrier = await this.getCarrierById(id);
        Object.assign(carrier, data);
        return this.carrierRepository.save(carrier);
    }
    async deleteCarrier(id) {
        const carrier = await this.getCarrierById(id);
        await this.carrierRepository.remove(carrier);
    }
    async getCompanySettings() {
        const settings = await this.companySettingsRepository.find();
        if (settings.length > 0) return settings[0];
        // Create default if somehow missing
        return this.companySettingsRepository.save({
            name: 'Nadas Group',
            primaryColor: '#003366'
        });
    }
    async updateCompanySettings(data) {
        const settings = await this.getCompanySettings();
        // If the currency code is being changed, synchronize the default flag in the Currency table
        if (data.defaultCurrency && data.defaultCurrency !== settings.defaultCurrency) {
            const currency = await this.currencyRepository.findOne({
                where: {
                    code: data.defaultCurrency
                }
            });
            if (currency) {
                // Set this as the only global default
                await this.currencyRepository.update({
                    isDefault: true
                }, {
                    isDefault: false
                });
                await this.currencyRepository.update(currency.id, {
                    isDefault: true
                });
            }
        }
        Object.assign(settings, data);
        return this.companySettingsRepository.save(settings);
    }
    constructor(currencyRepository, countryRepository, industryRepository, tagRepository, activityTypeRepository, emailTemplateRepository, notificationRepository, auditLogRepository, carrierRepository, companySettingsRepository){
        this.currencyRepository = currencyRepository;
        this.countryRepository = countryRepository;
        this.industryRepository = industryRepository;
        this.tagRepository = tagRepository;
        this.activityTypeRepository = activityTypeRepository;
        this.emailTemplateRepository = emailTemplateRepository;
        this.notificationRepository = notificationRepository;
        this.auditLogRepository = auditLogRepository;
        this.carrierRepository = carrierRepository;
        this.companySettingsRepository = companySettingsRepository;
    }
};
SettingsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_currencyentity.Currency)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_countryentity.Country)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_industryentity.Industry)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_tagentity.Tag)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_activitytypeentity.ActivityType)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_emailtemplateentity.EmailTemplate)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_notificationentity.Notification)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_auditlogentity.AuditLog)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_carrierentity.Carrier)),
    _ts_param(9, (0, _typeorm.InjectRepository)(_companysettingsentity.CompanySettings)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], SettingsService);

//# sourceMappingURL=settings.service.js.map