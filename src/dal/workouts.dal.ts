import { Workout } from '../entities/workout.entity';
import { AppDataSource } from '../helpers/dataSource';
import { AddWorkoutInput } from '../types/types';

const workoutsRepository = AppDataSource.getRepository(Workout);

export const addWorkoutDal = async (
  workout: AddWorkoutInput,
): Promise<Workout> => {
  const newWorkout = new Workout();
  Object.assign(newWorkout, workout);
  return workoutsRepository.save(newWorkout);
};

export const getUserWorkoutsDal = async (
  userId: number,
): Promise<Workout[]> => {
  return workoutsRepository
    .createQueryBuilder('workout')
    .where('workout.userId = :userId', { userId })
    .getMany();
};
