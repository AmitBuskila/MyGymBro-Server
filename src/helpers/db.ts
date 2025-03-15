import { AppDataSource } from './dataSource';

export const connectDB = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('✅ Database connected successfully!');
    })
    .catch((error) => console.error('❌ Database connection failed:', error));
};
