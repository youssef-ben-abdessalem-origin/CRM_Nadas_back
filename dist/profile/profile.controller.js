"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProfileController", {
    enumerable: true,
    get: function() {
        return ProfileController;
    }
});
const _common = require("@nestjs/common");
const _jwtauthguard = require("../auth/jwt-auth.guard");
const _express = require("express");
const _profileservice = require("./profile.service");
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
let ProfileController = class ProfileController {
    getDefaultCurrency(req) {
        const user = req.user;
        const currency = user?.currency ?? 'USD';
        const symbolMap = {
            USD: '$',
            EUR: '€',
            GBP: '£',
            JPY: '¥',
            INR: '₹',
            CAD: '$',
            AUD: '$',
            CHF: 'CHF',
            CNY: '¥'
        };
        const symbol = symbolMap[currency] ?? '$';
        // also return a CurrencyBadge-like object for frontend convenience
        return {
            currency,
            symbol
        };
    }
    constructor(profileService){
        this.profileService = profileService;
    }
};
_ts_decorate([
    (0, _common.Get)('currency'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", void 0)
], ProfileController.prototype, "getDefaultCurrency", null);
ProfileController = _ts_decorate([
    (0, _common.Controller)('profile'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _profileservice.ProfileService === "undefined" ? Object : _profileservice.ProfileService
    ])
], ProfileController);

//# sourceMappingURL=profile.controller.js.map