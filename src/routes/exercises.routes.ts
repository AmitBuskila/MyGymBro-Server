import { Router } from 'express';
import {
  getExercises,
  getPreviousExercisesResults,
} from '../controllers/exercises.controller';
import authenticateToken from '../middlewares/auth.middleware';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.middleware';

const exercisesRouter = Router();

exercisesRouter.get(
  '/getExercises',
  authenticateToken,
  asyncErrorHandler(getExercises),
);
// exercisesRouter.post('/getLatestResults', authenticateToken,asyncErrorHandler(getPreviousExercisesResults));

export default exercisesRouter;
