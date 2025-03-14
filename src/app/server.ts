import 'reflect-metadata';
import config from '../config';
import { connectDB } from '../helpers/db';
import app from './app';

process
  .on('unhandledRejection', (reason, p) => {
    console.error(p);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

(async () => {
  await connectDB();
  app.listen(config.port, () =>
    console.log(`APP RUNNING ON PORT: ${config.port}`),
  );
})();
