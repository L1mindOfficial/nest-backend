import { Controller, Delete, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { User } from 'features/auth/decorators/user.decorator';
import { CustomAuth } from 'infrastructure/http/interfaces/custom-request.interface';
import { SessionsService } from './sessions.service';

@Controller({
  path: 'sessions',
  version: '1'
})
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@User() customAuth: CustomAuth) {
    return this.sessionsService.list(customAuth);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  evoke(@User() { user, session }: CustomAuth) {
    return this.sessionsService.revoke(user, session.token);
  }

  @Delete('others')
  @HttpCode(HttpStatus.NO_CONTENT)
  terminateOther(@User() { user, session }: CustomAuth) {
    return this.sessionsService.terminateOthers(user, session.token);
  }
}
