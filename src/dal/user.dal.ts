import { User } from '../entities/user.entity';
import { AppDataSource } from '../helpers/dataSource';
import { AddUserInput } from '../types/types';

const userRepository = AppDataSource.getRepository(User);

export const addUser = async (user: AddUserInput): Promise<User> => {
  const newUser = new User();
  Object.assign(newUser, user);
  return userRepository.save(user);
};

export const findUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  return userRepository.findOneOrFail({ where: { email } });
};
