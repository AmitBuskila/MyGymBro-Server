import { Request, Response } from 'express';
import {
  addTemplateDal,
  getUserTemplatesDal,
  updateTemplateDal,
} from '../dal/template.dal';
import { Template } from '../entities/template.entity';
import { addSet } from '../dal/set.dal';
import { addWorkoutExercise } from '../dal/exercise.dal';

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
  const templateExercises = await Promise.all(
    workoutExercises.map(async (exercise: any) => {
      const { sets, ...exerciseInput } = exercise;
      const createdWorkoutExercise = await addWorkoutExercise({
        ...exerciseInput,
        template: { id: createdTemplate.id },
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
    .send({ ...createdTemplate, workoutExercises: templateExercises });
};

export const updateTemplate = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { template } = req.body;
  const updatedTemplate = await updateTemplateDal(
    template,
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
