import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';
import jwtConfig from 'auth/config/jwt.config';
import { JwtPayload } from 'auth/interfaces/jwt-payload.interface';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * The `JwtStrategy` class extends Passport's strategy for JWT authentication.
 * It extracts the JWT from the request's authorization header and validates the token's payload.
 * Upon validation, it invokes the AuthService to check the validity of the JWT and retrieve user information.
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService
  ) {
    super({
      // Extracts JWT from the Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Secret key for verifying the JWT
      secretOrKey: jwtConfiguration.secret,

      // Passes the request to the validation function
      passReqToCallback: true
    });
  }

  /**
   * Validates the JWT payload by calling the AuthService's validateJwt method.
   *
   * @param req - The incoming request object, used to retrieve the JWT.
   * @param payload - The decoded JWT payload containing user information.
   * @returns The result of the authentication process, including user and session data if valid.
   */
  validate(req: Request, payload: JwtPayload) {
    return this.authService.validateJwt(
      payload,
      // Extracts the JWT token
      req.headers?.authorization.replace('bearer ', '')
    );
  }
}
