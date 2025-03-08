import { getAllExercisesDal } from '../dal/exercise.dal';
import { Request, Response } from 'express';

export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await getAllExercisesDal();
    return res.send(exercises);
  } catch (error) {
    return res
      .status(500)
      .send((error as Error).message || 'Error getting exercises');
  }
};
