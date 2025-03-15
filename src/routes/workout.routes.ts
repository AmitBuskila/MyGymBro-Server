import { Router } from 'express';
import {
  addWorkout,
  getLatestWorkout,
  getWorkouts,
} from '../controllers/workout.controller';
import authenticateToken from '../middlewares/auth.middleware';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.middleware';

const workoutsRouter = Router();

workoutsRouter.post(
  '/addWorkout',
  authenticateToken,
  asyncErrorHandler(addWorkout),
);
workoutsRouter.get(
  '/getWorkouts/:userId',
  authenticateToken,
  asyncErrorHandler(getWorkouts),
);
workoutsRouter.get(
  '/getLatestWorkout/:templateId',
  authenticateToken,
  asyncErrorHandler(getLatestWorkout),
);

export default workoutsRouter;
