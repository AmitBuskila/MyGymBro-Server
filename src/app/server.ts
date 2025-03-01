import 'reflect-metadata';
import config from '../config';
import { connectDB } from '../helpers/db';
import app from './app';

(async () => {
  try {
    await connectDB();
    app.listen(config.port, () =>
      console.log(`APP RUNNING ON PORT: ${config.port}`),
    );
  } catch (error) {
    console.error('Failed to Start the Server:', error);
    process.exit(1);
  }
})();
