import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { config } from 'dotenv';
import { makeApp } from 'src/app.factory';
import { AppModule } from 'src/app.module';
import { typeormConfig } from 'src/shared/infra/database/config';
import { TypeormConnection } from 'src/shared/infra/database/typeorm-connection';
import { DataSource } from 'typeorm';

config({
  path: '.env.test',
});

const setup = async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = moduleRef.createNestApplication();
  makeApp(app);
  await app.init();
  const dbConnection = new TypeormConnection({
    config: { ...typeormConfig, migrationsRun: true, dropSchema: true },
  });
  const databaseConnection = await dbConnection.connect();
  return {
    app,
    databaseConnection,
    dbConnection,
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
  await app.close();
  await databaseConnection.destroy();
});
