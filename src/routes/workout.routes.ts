import { Router } from 'express';
import {
  addWorkout,
  getLatestWorkout,
  getWorkouts,
  getExerciseResults,
  getWorkoutsExercisesResults,
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

workoutsRouter.get(
  '/users/:userId/exercises/:exerciseId/results',
  authenticateToken,
  asyncErrorHandler(getExerciseResults),
);

workoutsRouter.post(
  '/workoutsResults/users/:userId',
  authenticateToken,
  asyncErrorHandler(getWorkoutsExercisesResults),
);
export default workoutsRouter;
