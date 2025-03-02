import { Request, Response } from 'express';
import { addWorkoutDal, getUserWorkoutsDal } from '../dal/workouts.dal';

export const addWorkout = async (req: Request, res: Response) => {
  try {
    const { startDate, totalTime, userId } = req.body;
    await addWorkoutDal({ startDate, totalTime, user: { id: userId } });
    res.status(201).send('Workout added successfully');
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const templates = await getUserWorkoutsDal(Number(req.params.userId));
    res.status(200).send(templates);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
