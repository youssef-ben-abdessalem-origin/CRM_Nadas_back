"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProfileService", {
    enumerable: true,
    get: function() {
        return ProfileService;
    }
});
const _common = require("@nestjs/common");
const _settingsservice = require("../settings/settings.service");
const _typeorm = require("@nestjs/typeorm");
const _userentity = require("../users/entities/user.entity");
const _typeorm1 = require("typeorm");
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
let ProfileService = class ProfileService {
    async getCurrencyInfo(user) {
        if (user?.currency) {
            const currencies = await this.settingsService.getCurrencies();
            const match = currencies.find((c)=>c.code === user.currency);
            if (match) return {
                currency: match.code,
                symbol: match.symbol,
                symbolArabic: match.symbolArabic,
                symbolEnglish: match.symbolEnglish
            };
            return {
                currency: user.currency,
                symbol: '$'
            };
        }
        const def = await this.settingsService.getDefaultCurrencyInfo();
        return {
            currency: def.code,
            symbol: def.symbol,
            symbolArabic: def.symbolArabic,
            symbolEnglish: def.symbolEnglish
        };
    }
    async updateLanguage(userId, language) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
        if (!user) throw new _common.NotFoundException('User not found');
        user.language = language;
        return this.userRepository.save(user);
    }
    constructor(settingsService, userRepository){
        this.settingsService = settingsService;
        this.userRepository = userRepository;
    }
};
ProfileService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userentity.User)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _settingsservice.SettingsService === "undefined" ? Object : _settingsservice.SettingsService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ProfileService);

//# sourceMappingURL=profile.service.js.map