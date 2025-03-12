import { Router } from 'express';
import {
  addWorkout,
  getLatestWorkout,
  getWorkouts,
} from '../controllers/workout.controller';
import authenticateToken from '../middlewares/auth.middleware';

const workoutsRouter = Router();

workoutsRouter.post('/addWorkout', authenticateToken, addWorkout);
workoutsRouter.get('/getWorkouts/:userId', authenticateToken, getWorkouts);
workoutsRouter.get(
  '/getLatestWorkout/:templateId',
  authenticateToken,
  getLatestWorkout,
);

export default workoutsRouter;
