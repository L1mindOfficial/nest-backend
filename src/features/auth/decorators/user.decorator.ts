import { CustomRequest } from '@infrastructure/http/interfaces/custom-request.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: 'user' | 'session', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    return data ? request.user?.[data] : request.user;
  }
);
