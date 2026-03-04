import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});
//tracking logs for debugging
console.log('Running in ENV:', process.env.NODE_ENV);
console.log('DB Host:', process.env.DATABASE_HOST);
console.log('DB Name:', process.env.DATABASE_NAME);
console.log('DB User:', process.env.DATABASE_USERNAME);
console.log('DB Port:', process.env.DATABASE_PORT);

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: process.env.DATABASE_NAME || 'PMS-dev',
  entities: [
    isProduction
      ? 'dist/**/*.entity.js'
      : 'src/**/*.entity.ts',
  ],
  migrations: [
    isProduction
      ? 'dist/database/migrations/*.js'
      : 'src/database/migrations/*.ts',
  ],
  synchronize: false,
});