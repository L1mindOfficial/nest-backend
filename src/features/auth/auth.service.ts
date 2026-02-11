import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IDevice } from '@features/sessions/interfaces/device.interface';
import { ISessionsService } from '@features/sessions/interfaces/sessions.interface';
import { IUsersService } from '@features/users/interfaces/users.interface';
import { SESSIONS_SERVICE, USERS_SERVICE } from '@infrastructure/di/tokens';
import { CustomAuth } from '@infrastructure/http/interfaces/custom-request.interface';
import { ChangePasswordDto } from '../users/dto/change-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { IAuthService } from './interfaces/auth.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { HashingProvider } from './providers/hashing.provider';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(SESSIONS_SERVICE)
    private readonly sessionsService: ISessionsService,
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
    const password = await this.hashingProvider.hash(registerUserDto.password);

    return this.usersService.register({
      ...registerUserDto,
      password
    });
  }

  async loginUser(
    { email, password }: LoginUserDto,
    ip: string,
    device: IDevice
  ): Promise<string> {
    // Find the user by email or username
    const user = await this.usersService.findByIdentifierForAuth(email);

    if (!user) throw new UnauthorizedException('invalid credentials');

    const isMatch = await this.hashingProvider.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('invalid credentials');

    const payload: JwtPayload = { email };

    // Generate a JWT token
    const token: string = this.jwtService.sign(payload);

    // Create a session for the user
    await this.sessionsService.issue(user.id, token, ip, device);

    // Return the token
    return token;
  }

  async changeUserPassword(
    { user, session }: CustomAuth,
    { currentPassword, newPassword }: ChangePasswordDto
  ): Promise<void> {
    // Verify that the current password matches
    const isMatch = await this.hashingProvider.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) throw new BadRequestException('invalid current password');

    // If the passwords are different, update the user's password
    if (currentPassword !== newPassword) {
      // Hashing password
      const password = await this.hashingProvider.hash(newPassword);

      // Set new password
      await this.usersService.setPassword(user.id, password);

      // Remove the session after password change
      await this.sessionsService.terminateOthers(user, session.token);
    }
  }

  async validateUserJwt(email: string, token: string): Promise<CustomAuth> {
    // Find the user associated with the JWT email
    const user = await this.usersService.findByIdentifierForAuth(email);

    if (!user) throw new UnauthorizedException('invalid token');

    // Validate the session using the user's ID and token
    const session = await this.sessionsService.getActive(user.id, token);

    if (!session) throw new UnauthorizedException('session expired');

    // Return the authenticated user and session
    return { user, session };
  }
}
