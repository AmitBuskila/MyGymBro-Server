import { Request, Response } from 'express';
import { addTemplateDal, getUserTemplatesDal } from '../dal/template.dal';
import { Template } from '../entities/template.entity';
import { addSet } from '../dal/set.dal';
import { addWorkoutExercise } from '../dal/exercise.dal';

export const addTemplate = async (req: Request, res: Response) => {
  try {
    const { name, description, image, userId, workoutExercises } = req.body;
    const createdTemplate: Template = await addTemplateDal({
      name,
      description,
      image,
      user: { id: userId },
    });
    workoutExercises.map(async (exercise: any) => {
      const { sets, ...exerciseInput } = exercise;
      const createdWorkoutExercise = await addWorkoutExercise({
        ...exerciseInput,
        template: { id: createdTemplate.id },
      });
      sets.map((set: any, index: number) =>
        addSet({
          ...set,
          index,
          workoutExercise: { id: createdWorkoutExercise.id },
        }),
      );
    });
    res.status(201).send('Template added successfully');
  } catch (error) {
    console.log(error);

    res.status(500).send((error as Error).message);
  }
};

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await getUserTemplatesDal(Number(req.params.userId));
    res.status(200).send(templates);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
