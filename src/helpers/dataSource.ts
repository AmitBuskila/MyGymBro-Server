import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Amit2004!',
  database: 'postgres',
  synchronize: true,
  logging: false,
  schema: 'dev',
  entities: ['src/entities/*.ts'],
});
