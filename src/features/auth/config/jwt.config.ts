import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt', () => {
  const config = {
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: '7d'
    }
  } as const satisfies JwtModuleOptions;

  return config;
});
