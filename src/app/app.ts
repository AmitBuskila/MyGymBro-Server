import cors from 'cors';
import type { Application, Request, Response } from 'express';
import express from 'express';
import config from '../config';
import userRoutes from '../routes/user.routes';
import templateRoutes from '../routes/template.routes';
import workoutRoutes from '../routes/workout.routes';
import { CustomError } from '../utils/customError';

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: [config.clientUrl || ''],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is Running! 🏃' });
});

app.use('/users', userRoutes);
app.use('/templates', templateRoutes);
app.use('/workouts', workoutRoutes);

app.use((req, res, next) => {
  const error = new CustomError('Requested URL Not Found', 404);
  next(error);
});

app.all('*', (_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Page Not Found' });
});

export default app;
