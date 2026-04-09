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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ProfileService = class ProfileService {
    async getCurrencyInfo(user) {
        if (user?.currency) {
            // If user has a specific currency set, we should ideally fetch its symbol too
            // but for now let's at least try to match it against our currencies list
            const currencies = await this.settingsService.getCurrencies();
            const match = currencies.find((c)=>c.code === user.currency);
            if (match) return {
                currency: match.code,
                symbol: match.symbol
            };
            return {
                currency: user.currency,
                symbol: '$'
            };
        }
        // Default system currency
        const def = await this.settingsService.getDefaultCurrencyInfo();
        return {
            currency: def.code,
            symbol: def.symbol
        };
    }
    constructor(settingsService){
        this.settingsService = settingsService;
    }
};
ProfileService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _settingsservice.SettingsService === "undefined" ? Object : _settingsservice.SettingsService
    ])
], ProfileService);

//# sourceMappingURL=profile.service.js.map