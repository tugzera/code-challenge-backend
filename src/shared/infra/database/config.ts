import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config();

export const typeormConfig: DataSourceOptions = {
  database: process.env.DB_NAME,
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  migrationsRun: false,
  dropSchema: false,
  migrations: [`${__dirname}/migrations/*.{js,ts}`],
  entities: [`${__dirname}/models/*.{js,ts}`],
  logging: false,
};
