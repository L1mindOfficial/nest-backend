import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'auth/decorators/public.decorator';

/**
 * The `JwtAuthGuard` class is a custom guard that extends the
 * built-in Passport `AuthGuard` for JWT authentication.
 *
 * It checks whether the current route is public (i.e., does not require authentication)
 * by utilizing a reflector to retrieve the metadata defined by the `@Public()` decorator.
 * If the route is public, it allows the request to proceed; otherwise, it invokes the
 * default JWT authentication mechanism.
 *
 * @extends AuthGuard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super(); // Calls the parent constructor to set up the JWT strategy
  }

  /**
   * Determines if the request can be activated.
   *
   * @param context - The execution context for the request.
   * @returns A boolean indicating whether the request is allowed.
   */
  canActivate(context: ExecutionContext) {
    // Check if the current route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    // If the route is public, allow access without authentication
    if (isPublic) return true;

    // Otherwise, use the default JWT authentication mechanism
    return super.canActivate(context);
  }
}
