"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuditInterceptor", {
    enumerable: true,
    get: function() {
        return AuditInterceptor;
    }
});
const _common = require("@nestjs/common");
const _operators = require("rxjs/operators");
const _settingsservice = require("../../settings/settings.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AuditInterceptor = class AuditInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, user, ip } = request;
        // We only want to log state-changing operations
        const isStateChanging = [
            'POST',
            'PUT',
            'DELETE',
            'PATCH'
        ].includes(method);
        if (!isStateChanging) {
            return next.handle();
        }
        // Skip audit logging for login/auth routes to avoid logging credentials
        if (url.includes('/auth/login') || url.includes('/auth/register')) {
            return next.handle();
        }
        return next.handle().pipe((0, _operators.tap)(async (response)=>{
            try {
                // Determine entity type from URL (e.g., /api/v1/leads -> leads)
                const urlParts = url.split('/');
                const entityType = urlParts.find((part)=>[
                        'leads',
                        'deals',
                        'accounts',
                        'contacts',
                        'products',
                        'users',
                        'roles',
                        'activities'
                    ].includes(part)) || 'system';
                // Determine entity ID from response or URL params
                const entityId = response?.id || request.params?.id || null;
                // Create notification for significant events
                if (method === 'POST' || method === 'DELETE' || method === 'PATCH' && entityType === 'roles') {
                    await this.settingsService.createNotification({
                        userId: user?.id || null,
                        title: `${method === 'POST' ? 'New' : method === 'DELETE' ? 'Deleted' : 'Modified'} ${entityType.slice(0, -1)}`,
                        message: `A ${entityType.slice(0, -1)} was ${method === 'POST' ? 'created' : method === 'DELETE' ? 'deleted' : 'updated'} by ${user?.name || 'System'}.`,
                        type: method === 'POST' ? 'success' : method === 'DELETE' ? 'error' : 'info',
                        isRead: false,
                        link: `/${entityType}`
                    });
                }
                await this.settingsService.createAuditLog({
                    action: `${method} ${url}`,
                    entityType,
                    entityId: entityId ? Number.parseInt(entityId) : null,
                    userId: user?.id || null,
                    ipAddress: ip || request.headers['x-forwarded-for'] || request.connection.remoteAddress,
                    changes: JSON.stringify({
                        payload: this.sanitizeBody(body),
                        result: response ? 'success' : 'failure'
                    })
                });
            } catch (error) {
                console.error('Failed to create audit log:', error);
            }
        }));
    }
    sanitizeBody(body) {
        if (!body) return null;
        const sanitized = {
            ...body
        };
        const sensitiveFields = [
            'password',
            'token',
            'refreshToken',
            'secret'
        ];
        sensitiveFields.forEach((field)=>{
            if (sanitized[field]) sanitized[field] = '********';
        });
        return sanitized;
    }
    constructor(settingsService){
        this.settingsService = settingsService;
    }
};
AuditInterceptor = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _settingsservice.SettingsService === "undefined" ? Object : _settingsservice.SettingsService
    ])
], AuditInterceptor);

//# sourceMappingURL=audit.interceptor.js.map