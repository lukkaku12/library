import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    console.log('API Key from headers:', apiKey);  // Log del header
    console.log('API Key from config:', this.configService.get('API_KEY')); 
    if (apiKey !== this.configService.get('API_KEY')) {
      return false;
    }

    return true;
  }
}
