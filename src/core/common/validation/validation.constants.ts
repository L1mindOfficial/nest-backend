import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true
  },
  exceptionFactory: (errors) => {
    const firstError = errors[0];
    const firstConstraint = firstError?.constraints
      ? Object.values(firstError.constraints)[0]
      : 'Validation error';
    return new BadRequestException(firstConstraint);
  }
};
