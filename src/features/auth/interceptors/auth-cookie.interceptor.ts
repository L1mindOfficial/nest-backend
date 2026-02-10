import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap((token: string) => {
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 * 1000
        });
      })
    );
  }
}
