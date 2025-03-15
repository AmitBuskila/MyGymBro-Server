import { Request, Response } from 'express';
import {
  getAllExercisesDal,
  getLatestWorkoutPerExercise,
} from '../dal/exercise.dal';
import { getWorkoutById } from '../dal/workouts.dal';

export const getExercises = async (req: Request, res: Response) => {
  const exercises = await getAllExercisesDal();
  return res.send(exercises);
};

//unused
export const getPreviousExercisesResults = async (
  req: Request,
  res: Response,
) => {
  const { userId, exerciseIds } = req.body;
  const latestWorkouts = await getLatestWorkoutPerExercise(userId, exerciseIds);
  const previousResults = await Promise.all(
    latestWorkouts.map(async (latestWorkout) => ({
      exerciseId: latestWorkout.exerciseid,
      workoutExercise: (
        await getWorkoutById(latestWorkout.workoutid)
      ).workoutExercises.find(
        (workoutExercise) =>
          workoutExercise.exercise?.id === latestWorkout.exerciseid,
      ),
    })),
  );
  return res.send(previousResults);
};
