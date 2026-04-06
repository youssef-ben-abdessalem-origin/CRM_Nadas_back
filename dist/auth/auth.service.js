"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function() {
        return AuthService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _jwtservice = require("./jwt.service");
const _userentity = require("../users/entities/user.entity");
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
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
let AuthService = class AuthService {
    async register(name, email, password, phone) {
        const existing = await this.userRepository.findOne({
            where: {
                email
            }
        });
        if (existing) {
            throw new _common.BadRequestException('Email already exists');
        }
        const hashedPassword = await _bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: _userentity.Role.USER,
            enabled: true
        });
        await this.userRepository.save(user);
        return this.generateTokens(user);
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new _common.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await _bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new _common.UnauthorizedException('Invalid credentials');
        }
        return this.generateTokens(user);
    }
    async refreshToken(refreshToken) {
        try {
            const payload = await this.jwtService.verifyToken(refreshToken);
            const user = await this.userRepository.findOne({
                where: {
                    id: payload.sub
                }
            });
            if (!user) {
                throw new _common.UnauthorizedException('User not found');
            }
            return this.generateTokens(user);
        } catch  {
            throw new _common.UnauthorizedException('Invalid refresh token');
        }
    }
    async getProfile(email) {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new _common.BadRequestException('User not found');
        }
        return this.mapToUserResponse(user);
    }
    async generateTokens(user) {
        const accessToken = await this.jwtService.generateToken({
            email: user.email,
            sub: user.id,
            role: user.role
        });
        const refreshToken = await this.jwtService.generateRefreshToken({
            email: user.email,
            sub: user.id
        });
        return {
            accessToken,
            tokenType: 'Bearer',
            accessTokenExpiresIn: 900,
            refreshTokenExpiresIn: 604800,
            refreshToken,
            user: this.mapToUserResponse(user)
        };
    }
    mapToUserResponse(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            enabled: user.enabled,
            phone: user.phone,
            avatar: user.avatar,
            createdAt: user.createdAt?.toISOString()
        };
    }
    constructor(userRepository, jwtService){
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
};
AuthService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_userentity.User)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _jwtservice.JwtService === "undefined" ? Object : _jwtservice.JwtService
    ])
], AuthService);

//# sourceMappingURL=auth.service.js.map