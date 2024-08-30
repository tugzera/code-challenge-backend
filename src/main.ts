import { NestFactory } from '@nestjs/core';
import { appFactory } from './app.factory';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appFactory(app);
  await app.listen(3000);
}
bootstrap();
