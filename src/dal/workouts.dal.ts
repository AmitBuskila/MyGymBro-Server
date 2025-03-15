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
    .leftJoinAndSelect('workout.workoutExercises', 'workoutExercises')
    .leftJoinAndSelect('workoutExercises.exercise', 'exercise')
    .leftJoinAndSelect('workoutExercises.sets', 'sets')
    .where('workout.userId = :userId', { userId })
    .orderBy('workout.startDate', 'DESC')
    .getMany();
};

export const getWorkoutById = async (workoutId: number): Promise<Workout> => {
  return workoutsRepository
    .createQueryBuilder('workout')
    .leftJoinAndSelect('workout.workoutExercises', 'workoutExercises')
    .leftJoinAndSelect('workoutExercises.exercise', 'exercise')
    .leftJoinAndSelect('workoutExercises.sets', 'sets')
    .where('workout.id = :workoutId', { workoutId })
    .getOneOrFail();
};

export const getLatestWorkoutDal = async (
  templateId: number,
): Promise<Workout | null> => {
  return workoutsRepository
    .createQueryBuilder('workout')
    .leftJoinAndSelect('workout.workoutExercises', 'workoutExercises')
    .leftJoinAndSelect('workoutExercises.exercise', 'exercise')
    .leftJoinAndSelect('workoutExercises.sets', 'sets')
    .where('workout.templateId = :templateId', { templateId })
    .orderBy('workout.startDate', 'DESC')
    .getOne();
};
