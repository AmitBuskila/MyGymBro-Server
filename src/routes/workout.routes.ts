import { Router } from 'express';
import { addWorkout, getWorkouts } from '../controllers/workout.controller';
import authenticateToken from '../middlewares/auth.middleware';

const workoutsRouter = Router();

workoutsRouter.post('/addWorkout', authenticateToken, addWorkout);
workoutsRouter.get('/getWorkouts/:userId', authenticateToken, getWorkouts);

export default workoutsRouter;
