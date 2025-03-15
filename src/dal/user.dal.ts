import { User } from '../entities/user.entity';
import { AppDataSource } from '../helpers/dataSource';
import { AddUserInput } from '../types/types';

const usersRepository = AppDataSource.getRepository(User);

export const addUser = async (user: AddUserInput): Promise<User> => {
  const newUser = new User();
  Object.assign(newUser, user);
  return usersRepository.save(user);
};

export const findUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  return usersRepository.findOneOrFail({ where: { email } });
};

export const getUserDataDal = async (userId: number): Promise<User | null> => {
  return usersRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.templates', 'templates')
    .leftJoinAndSelect('templates.workoutExercises', 'workoutExercises')
    .addOrderBy('workoutExercises.index')
    .leftJoinAndSelect('workoutExercises.exercise', 'exercise')
    .leftJoinAndSelect('workoutExercises.sets', 'sets')
    .where('user.id = :id', { id: userId })
    .getOne();
};
