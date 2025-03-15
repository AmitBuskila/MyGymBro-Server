import { DataSource } from 'typeorm';
import config from '../config';

export const AppDataSource = new DataSource({
  url: config.postgresUrl,
  type: 'postgres',
  synchronize: true,
  logging: false,
  schema: 'dev',
  entities: [
    config.mode === 'production'
      ? 'dist/src/entities/*.js'
      : 'src/entities/*.ts',
  ],
});
