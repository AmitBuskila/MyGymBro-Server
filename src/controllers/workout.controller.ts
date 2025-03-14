import { Request, Response } from 'express';
import {
  addWorkoutDal,
  getLatestWorkoutDal,
  getUserWorkoutsDal,
} from '../dal/workouts.dal';
import { Workout } from '../entities/workout.entity';
import { addWorkoutExercise } from '../dal/exercise.dal';
import { addSet } from '../dal/set.dal';

export const addWorkout = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { startDate, totalTime, templateId, userId, workoutExercises } =
    req.body;
  const createdWorkout: Workout = await addWorkoutDal({
    template: { id: templateId },
    user: { id: userId },
    startDate,
    totalTime,
  });
  const createdWorkoutExercises = await Promise.all(
    workoutExercises.map(async (exercise: any) => {
      const { sets, ...exerciseInput } = exercise;
      const createdWorkoutExercise = await addWorkoutExercise({
        ...exerciseInput,
        workout: { id: createdWorkout.id },
      });
      const createdSets = sets.map((set: any, index: number) =>
        addSet({
          ...set,
          index,
          workoutExercise: { id: createdWorkoutExercise.id },
        }),
      );

      return { ...createdWorkoutExercise, sets: createdSets };
    }),
  );

  return res
    .status(201)
    .send({ ...createdWorkout, workoutExercises: createdWorkoutExercises });
};

export const getWorkouts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const workouts = await getUserWorkoutsDal(+req.params.userId);
  return res.status(200).send(workouts);
};

export const getLatestWorkout = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const workout = await getLatestWorkoutDal(+req.params.templateId);
  return res.status(200).send(workout);
};
