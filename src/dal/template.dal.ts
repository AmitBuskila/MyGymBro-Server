import { DeleteResult } from 'typeorm';
import { Template } from '../entities/template.entity';
import { AppDataSource } from '../helpers/dataSource';
import { AddTemplateInput, UpdateTemplateInput } from '../types/types';
import { ServerError } from '../utils/customError';

const templatesRepository = AppDataSource.getRepository(Template);

export const removeTemplateDal = async (
  templateId: number,
): Promise<number> => {
  const deleted: DeleteResult = await templatesRepository.delete({
    id: templateId,
  });
  if (deleted.affected === 0) {
    throw new ServerError(404, 'Template dont exist', { templateId });
  }
  console.log('template has been deleted', { templateId });
  return templateId;
};

export const addTemplateDal = async (
  template: AddTemplateInput,
): Promise<Template> => {
  const newTemplate = new Template();
  Object.assign(newTemplate, template);
  return templatesRepository.save(newTemplate);
};

export const updateTemplateDal = async (
  template: UpdateTemplateInput,
  templateId: number,
): Promise<Template> => {
  const templateToUpdate = await templatesRepository.findOneByOrFail({
    id: templateId,
  });
  Object.assign(templateToUpdate, template);
  const updatedTemplate = await templatesRepository.save(templateToUpdate);
  console.log('template has been updated', { updatedTemplate });
  return updatedTemplate;
};

export const getUserTemplatesDal = async (
  userId: number,
): Promise<Template[]> => {
  return templatesRepository
    .createQueryBuilder('template')
    .where('template.userId = :userId', { userId })
    .getMany();
};
