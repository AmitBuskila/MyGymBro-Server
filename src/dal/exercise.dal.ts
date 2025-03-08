import e from 'cors';
import { Exercise } from '../entities/exercise.entity';
import { AppDataSource } from '../helpers/dataSource';

export const getAllExercisesDal = async (): Promise<Exercise[] | null> => {
  return AppDataSource.getRepository(Exercise).find();
};
