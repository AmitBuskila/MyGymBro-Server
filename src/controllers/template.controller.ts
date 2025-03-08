import { Request, Response } from 'express';
import { addTemplateDal, getUserTemplatesDal } from '../dal/template.dal';
import { Template } from '../entities/template.entity';

export const addTemplate = async (req: Request, res: Response) => {
  try {
    const { name, description, image, userId, sets } = req.body;
    // console.log(req.body);
    const createdTemplate: Template = await addTemplateDal({
      name,
      description,
      image,
      user: { id: userId },
    });
    // await Promise.all(
    //   sets.map((set) =>
    //     addSet({ template: { id: createdTemplate.id }, ...set }),
    //   ),
    // );
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
