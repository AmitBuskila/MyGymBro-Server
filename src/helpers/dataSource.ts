import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  url: process.env.POSTGRES_URL,
  type: 'postgres',
  synchronize: true,
  logging: false,
  schema: 'dev',
  entities: ['src/entities/*.ts'],
});
