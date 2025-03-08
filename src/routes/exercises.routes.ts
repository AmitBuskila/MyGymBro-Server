import { Router } from 'express';
import { getExercises } from '../controllers/exercises.controller';
import authenticateToken from '../middlewares/auth.middleware';

const exercisesRouter = Router();

exercisesRouter.post('/getExercises', authenticateToken, getExercises);

export default exercisesRouter;
