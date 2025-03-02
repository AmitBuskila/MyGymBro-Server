import { Template } from '../entities/template.entity';
import { AppDataSource } from '../helpers/dataSource';
import { AddTemplateInput } from '../types/types';

const templatesRepository = AppDataSource.getRepository(Template);

export const addTemplateDal = async (
  template: AddTemplateInput,
): Promise<Template> => {
  const newTemplate = new Template();
  Object.assign(newTemplate, template);
  return templatesRepository.save(newTemplate);
};

export const getUserTemplatesDal = async (
  userId: number,
): Promise<Template[]> => {
  return templatesRepository
    .createQueryBuilder('template')
    .where('template.userId = :userId', { userId })
    .getMany();
};
