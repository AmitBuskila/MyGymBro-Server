import { Exercise } from '../entities/exercise.entity';
import { Workout } from '../entities/workout.entity';
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

//unused
export const getLatestWorkoutPerExercise = (
  userId: number,
  exerciseIds: number[],
) => {
  const rankedWorkoutsQuery = AppDataSource.getRepository(Workout)
    .createQueryBuilder('workout')
    .select([
      'workout_exercise.exerciseId AS exerciseId',
      'workout.id AS workoutId',
      'workout.startDate AS workoutDate',
      'ROW_NUMBER() OVER (PARTITION BY workout_exercise.exerciseId ORDER BY workout.startDate DESC) AS rowNumber',
    ])
    .innerJoin('workout.workoutExercises', 'workout_exercise')
    .where('workout.userId = :userId', { userId })
    .andWhere('workout_exercise.exerciseId IN (:...exerciseIds)', {
      exerciseIds,
    });

  return AppDataSource.createQueryBuilder()
    .select(['ranked.exerciseId', 'ranked.workoutId'])
    .from(`(${rankedWorkoutsQuery.getQuery()})`, 'ranked')
    .where('ranked.rowNumber = 1')
    .setParameters(rankedWorkoutsQuery.getParameters())
    .getRawMany();
};
