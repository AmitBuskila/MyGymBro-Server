import { Workout } from '../entities/workout.entity';
import { AppDataSource } from '../helpers/dataSource';
import { AddWorkoutInput } from '../types/types';

const workoutRepository = AppDataSource.getRepository(Workout);

export const addWorkoutDal = async (
  workout: AddWorkoutInput,
): Promise<Workout> => {
  const newWorkout = new Workout();
  Object.assign(newWorkout, workout);
  return workoutRepository.save(newWorkout);
};

export const getUserWorkoutsDal = async (
  userId: number,
): Promise<Workout[]> => {
  return workoutRepository
    .createQueryBuilder('workout')
    .where('workout.userId = :userId', { userId })
    .getMany();
};
