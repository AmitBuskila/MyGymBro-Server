import { Request, Response } from 'express';
import { addWorkoutExercise } from '../dal/exercise.dal';
import { addSet } from '../dal/set.dal';
import {
  addTemplateDal,
  getUserTemplatesDal,
  updateTemplateDal,
} from '../dal/template.dal';
import { Set } from '../entities/set.entity';
import { Template } from '../entities/template.entity';
import { WorkoutExercise } from '../entities/workoutExercise.entity';
import { omit } from 'lodash';

const createWorkoutEntities = async (
  workoutExercises: any,
  templateId: number,
): Promise<WorkoutExercise[]> => {
  return Promise.all(
    workoutExercises.map(async (exercise: any) => {
      const { sets, ...exerciseInput } = exercise;
      const createdWorkoutExercise = await addWorkoutExercise({
        ...exerciseInput,
        template: { id: templateId },
      });
      const createdSets: Set[] = await Promise.all(
        sets.map(async (set: any) =>
          omit(
            await addSet({
              ...set,
              workoutExercise: { id: createdWorkoutExercise.id },
            }),
            'workoutExercise',
          ),
        ),
      );
      return { ...createdWorkoutExercise, sets: createdSets };
    }),
  );
};

export const addTemplate = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, description, image, userId, workoutExercises } = req.body;
  const createdTemplate: Template = await addTemplateDal({
    name,
    description,
    image,
    user: { id: userId },
  });
  const templateExercises: WorkoutExercise[] = await createWorkoutEntities(
    workoutExercises,
    createdTemplate.id,
  );
  return res
    .status(201)
    .send({ ...createdTemplate, workoutExercises: templateExercises });
};

export const updateTemplate = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { workoutExercises } = req.body;
  const templateExercises: WorkoutExercise[] = await createWorkoutEntities(
    workoutExercises,
    +req.params.templateId,
  );

  const updatedTemplate = await updateTemplateDal(
    {
      ...req.body,
      workoutExercises: templateExercises,
    },
    +req.params.templateId,
  );
  return res.status(200).send(updatedTemplate);
};

export const getTemplates = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const templates = await getUserTemplatesDal(Number(req.params.userId));
  return res.status(200).send(templates);
};
