import { Request, Response } from 'express';
import { addTemplateDal, getUserTemplatesDal } from '../dal/template.dal';

export const addTemplate = async (req: Request, res: Response) => {
  try {
    const { name, description, image, userId } = req.body;
    await addTemplateDal({ name, description, image, user: { id: userId } });
    res.status(201).send('Template added successfully');
  } catch (error) {
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
