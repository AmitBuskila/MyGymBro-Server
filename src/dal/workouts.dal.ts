import { Workout } from '../entities/workout.entity';
import { WorkoutExercise } from '../entities/workoutExercise.entity';
import { AppDataSource } from '../helpers/dataSource';
import { AddWorkoutInput } from '../types/types';
import { WorkoutExerciseRepository } from './exercise.dal';

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
    .addOrderBy('workoutExercises.index')
    .leftJoinAndSelect('workoutExercises.exercise', 'exercise')
    .leftJoinAndSelect('workoutExercises.sets', 'sets')
    .where('workout.templateId = :templateId', { templateId })
    .addOrderBy('workout.startDate', 'DESC')
    .addOrderBy('sets.index')
    .getOne();
};

export const getExerciseResultsDal = async (
  userId: number,
  exerciseId: number,
): Promise<WorkoutExercise[]> => {
  return WorkoutExerciseRepository.createQueryBuilder('workoutExercises')
    .leftJoinAndSelect('workoutExercises.workout', 'workout')
    .leftJoinAndSelect('workoutExercises.sets', 'sets')
    .leftJoinAndSelect('workoutExercises.exercise', 'exercise')
    .where('workout.userId = :userId', { userId })
    .andWhere('workoutExercises.exerciseId = :exerciseId', { exerciseId })
    .andWhere('sets.isFake = false')
    .addOrderBy('workout.startDate')
    .addOrderBy('workoutExercises.index')
    .addOrderBy('sets.index')
    .getMany();
};
