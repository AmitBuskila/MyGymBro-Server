import { Request, Response } from 'express';
import {
  addWorkoutDal,
  getLatestWorkoutDal,
  getUserWorkoutsDal,
} from '../dal/workouts.dal';
import { Workout } from '../entities/workout.entity';
import { addWorkoutExercise } from '../dal/exercise.dal';
import { addSet } from '../dal/set.dal';

export const addWorkout = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send((error as Error).message);
  }
};

export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await getUserWorkoutsDal(+req.params.userId);
    res.status(200).send(workouts);
  } catch (error) {
    console.log(error);
    res.status(500).send((error as Error).message);
  }
};

export const getLatestWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await getLatestWorkoutDal(+req.params.templateId);
    res.status(200).send(workout);
  } catch (error) {
    console.log(error);
    res.status(500).send((error as Error).message);
  }
};
