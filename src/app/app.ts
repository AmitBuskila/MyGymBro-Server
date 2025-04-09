import cors from 'cors';
import type { Application } from 'express';
import express, { Request, Response } from 'express';
import config from '../config';
import exerciseRoutes from '../routes/exercises.routes';
import templateRoutes from '../routes/template.routes';
import userRoutes from '../routes/user.routes';
import workoutRoutes from '../routes/workout.routes';
import { ServerError } from '../utils/customError';

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

app.use('/users', userRoutes);
app.use('/templates', templateRoutes);
app.use('/workouts', workoutRoutes);
app.use('/exercises', exerciseRoutes);

app.use((req, res, next) => {
  const error = new ServerError(404, 'Requested URL Not Found: ' + req.url);
  next(error);
});

app.all('*', (_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Page Not Found' });
});

export default app;
