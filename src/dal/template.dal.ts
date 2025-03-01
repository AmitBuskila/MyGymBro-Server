import { Template } from '../entities/template.entity';
import { AppDataSource } from '../helpers/dataSource';
import { AddTemplateInput } from '../types/types';

const templateRepository = AppDataSource.getRepository(Template);

export const addTemplateDal = async (
  template: AddTemplateInput,
): Promise<Template> => {
  const newTemplate = new Template();
  Object.assign(newTemplate, template);
  return templateRepository.save(newTemplate);
};

export const getUserTemplatesDal = async (
  userId: number,
): Promise<Template[]> => {
  return templateRepository
    .createQueryBuilder('template')
    .where('template.userId = :userId', { userId })
    .getMany();
};
