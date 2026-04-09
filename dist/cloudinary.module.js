"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CloudinaryModule", {
    enumerable: true,
    get: function() {
        return CloudinaryModule;
    }
});
const _common = require("@nestjs/common");
const _cloudinary = require("cloudinary");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
_cloudinary.v2.config({
    cloud_name: 'dp1lir8kc',
    api_key: '565189924782621',
    api_secret: 'I771l-EUZqsnrXOf38dgXNs1Dps'
});
let CloudinaryModule = class CloudinaryModule {
};
CloudinaryModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            {
                provide: 'CLOUDINARY',
                useValue: _cloudinary.v2
            }
        ],
        exports: [
            'CLOUDINARY'
        ]
    })
], CloudinaryModule);

//# sourceMappingURL=cloudinary.module.js.map