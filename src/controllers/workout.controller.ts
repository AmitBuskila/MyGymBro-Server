import { Request, Response } from 'express';
import {
  addWorkoutDal,
  getLatestWorkoutDal,
  getUserWorkoutsDal,
  getExerciseResultsDal,
} from '../dal/workouts.dal';
import { Workout } from '../entities/workout.entity';
import { addWorkoutExercise } from '../dal/exercise.dal';
import { addSet } from '../dal/set.dal';
import { WorkoutExercise } from '../entities/workoutExercise.entity';
import { Set } from '../entities/set.entity';

export const addWorkout = async (req: Request, res: Response) => {
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

  res
    .status(201)
    .send({ ...createdWorkout, workoutExercises: createdWorkoutExercises });
};

export const getWorkouts = async (req: Request, res: Response) => {
  const workouts = await getUserWorkoutsDal(+req.params.userId);
  res.status(200).send(workouts);
};

export const getLatestWorkout = async (req: Request, res: Response) => {
  const workout = await getLatestWorkoutDal(+req.params.templateId);
  res.status(200).send(workout);
};

export const getExerciseResults = async (req: Request, res: Response) => {
  const { userId, exerciseId } = req.params;
  const workoutExercises: WorkoutExercise[] = await getExerciseResultsDal(
    +userId,
    +exerciseId,
  );
  const workSets: Set[] = workoutExercises.flatMap((workoutExercise) =>
    workoutExercise.sets.map((set) => ({
      ...set,
      date: workoutExercise.workout?.startDate,
    })),
  );

  res.status(200).send(workSets);
};
