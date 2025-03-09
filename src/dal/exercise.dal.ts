import { Exercise } from '../entities/exercise.entity';
import { WorkoutExercise } from '../entities/workoutExercise.entity';
import { AppDataSource } from '../helpers/dataSource';
import { addWorkoutExerciseInput } from '../types/types';

export const getAllExercisesDal = async (): Promise<Exercise[] | null> => {
  return AppDataSource.getRepository(Exercise).find();
};

export const addWorkoutExercise = async (
  template: addWorkoutExerciseInput,
): Promise<WorkoutExercise> => {
  const newTemplate = new WorkoutExercise();
  Object.assign(newTemplate, template);
  return AppDataSource.getRepository(WorkoutExercise).save(newTemplate);
};
