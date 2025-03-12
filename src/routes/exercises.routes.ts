import { Router } from 'express';
import {
  getExercises,
  getPreviousExercisesResults,
} from '../controllers/exercises.controller';
import authenticateToken from '../middlewares/auth.middleware';

const exercisesRouter = Router();

exercisesRouter.get('/getExercises', authenticateToken, getExercises);
// exercisesRouter.post('/getLatestResults', authenticateToken,getPreviousExercisesResults);

export default exercisesRouter;
