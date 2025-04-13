import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || '',
  jwtSecret: process.env.ACCESS_TOKEN || '',
  postgresUrl: process.env.POSTGRES_URL || '',
  mode: process.env.NODE_ENV || '',
  email: process.env.EMAIL || '',
  emailPassword: process.env.EMAIL_PASSWORD || '',
};
