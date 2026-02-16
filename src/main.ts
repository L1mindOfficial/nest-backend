// Import necessary modules from NestJS and compression middleware
import { HttpExceptionFilter } from '@core/common/filters/http-exception.filter';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The NestjsBackend API description')
    .setDescription('Use the base API URL at http://localhost:8080')
    .setTermsOfService('Connect with email: mohamadresaaa@gmail.com')
    .addServer('http://localhost:8080')
    .setVersion('1')
    .addTag('API routes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
    compression({
      level: 6,
      filter: (req) => req.headers['accept-encoding']?.includes('gzip'),
      threshold: 1024
    })
  );

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(8080);
}

bootstrap();
