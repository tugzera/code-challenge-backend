import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { config } from 'dotenv';
import { appFactory } from 'src/app.factory';
import { AppModule } from 'src/app.module';
import { typeormConfig } from 'src/shared/database/config';
import { TypeormConnection } from 'src/shared/database/typeorm-connection';
import { DataSource } from 'typeorm';

config({
  path: '.env.test',
});

const setup = async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = moduleRef.createNestApplication();
  appFactory(app);
  await app.init();
  const databaseConnection = await new TypeormConnection({
    config: { ...typeormConfig, migrationsRun: true, dropSchema: true },
  }).connect();
  return {
    app,
    databaseConnection,
  };
};

export let app: INestApplication;
export let databaseConnection: DataSource;

global.beforeAll(async () => {
  const { app: appSetup, databaseConnection: databaseConnectionSetup } =
    await setup();
  app = appSetup;
  databaseConnection = databaseConnectionSetup;
});

global.afterAll(async () => {
  await databaseConnection.destroy();
  await app.close();
});
