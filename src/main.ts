import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global compression middleware
  app.use(
    compression({
      level: 6, // Compression level (0-9)
      filter: (req) => req.headers['accept-encoding']?.includes('gzip'), // Only compress certain content types or based on other criteria
      threshold: 1024 // Compress responses larger than 1KB
    })
  );

  await app.listen(8080);
}
bootstrap();
