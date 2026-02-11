import { CustomRequest } from '@infrastructure/http/interfaces/custom-request.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IpAddress = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();

    const ip = request.headers['x-forwarded-for'] as string;

    if (ip && process.env.NODE_ENV === 'production') {
      return ip.split(',')[0].replace(',', '');
    }

    return ip ?? '127.0.0.1';
  }
);
