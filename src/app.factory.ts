import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/infra/filters/http-exception.filter';

export const makeApp = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('NestJS API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      always: true,
      forbidUnknownValues: true,
    }),
  );
  app.enableCors({ origin: '*' });
  app.useGlobalFilters(new HttpExceptionFilter());
};
