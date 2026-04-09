import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SettingsService } from '../../settings/settings.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly settingsService: SettingsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user, ip } = request;

    // We only want to log state-changing operations
    const isStateChanging = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
    
    if (!isStateChanging) {
      return next.handle();
    }

    // Skip audit logging for login/auth routes to avoid logging credentials
    if (url.includes('/auth/login') || url.includes('/auth/register')) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (response) => {
        try {
          // Determine entity type from URL (e.g., /api/v1/leads -> leads)
          const urlParts = url.split('/');
          const entityType = urlParts.find(part => 
            ['leads', 'deals', 'accounts', 'contacts', 'products', 'users', 'roles', 'activities'].includes(part)
          ) || 'system';

          // Determine entity ID from response or URL params
          const entityId = response?.id || request.params?.id || null;

          // Create notification for significant events
          if (method === 'POST' || method === 'DELETE' || (method === 'PATCH' && entityType === 'roles')) {
            await this.settingsService.createNotification({
              userId: user?.id || null, // In a real app, you might notify OTHER users (e.g., manager)
              title: `${method === 'POST' ? 'New' : method === 'DELETE' ? 'Deleted' : 'Modified'} ${entityType.slice(0, -1)}`,
              message: `A ${entityType.slice(0, -1)} was ${method === 'POST' ? 'created' : method === 'DELETE' ? 'deleted' : 'updated'} by ${user?.name || 'System'}.`,
              type: method === 'POST' ? 'success' : method === 'DELETE' ? 'error' : 'info',
              isRead: false,
              link: `/${entityType}`,
            });
          }

          await this.settingsService.createAuditLog({
            action: `${method} ${url}`,
            entityType,
            entityId: entityId ? Number.parseInt(entityId as string) : null,
            userId: user?.id || null,
            ipAddress: ip || request.headers['x-forwarded-for'] || request.connection.remoteAddress,
            changes: JSON.stringify({
              payload: this.sanitizeBody(body),
              result: response ? 'success' : 'failure'
            }),
          });
        } catch (error) {
          console.error('Failed to create audit log:', error);
        }
      }),
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return null;
    const sanitized = { ...body };
    const sensitiveFields = ['password', 'token', 'refreshToken', 'secret'];
    
    sensitiveFields.forEach(field => {
      if (sanitized[field]) sanitized[field] = '********';
    });
    
    return sanitized;
  }
}
