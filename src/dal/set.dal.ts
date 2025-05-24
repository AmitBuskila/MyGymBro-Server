import { Set } from '../entities/set.entity';
import { AppDataSource } from '../helpers/dataSource';
import { AddSetInput } from '../types/types';

const setsRepository = AppDataSource.getRepository(Set);

export const addSet = async (set: AddSetInput): Promise<Set> => {
  const newSet = new Set();
  Object.assign(newSet, set);
  const addedSet = await setsRepository.save(newSet);
  console.log('new set has been added', { addedSet });
  return addedSet;
};
