import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { addUser, findUserByEmail, getUserDataDal } from '../dal/user.dal';
import { User } from '../entities/user.entity';
import { ServerError } from '../utils/customError';

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword: string = await bcrypt.hash(password, 10);
  await addUser({ firstName, lastName, email, password: hashedPassword });
  return res
    .status(201)
    .send({ message: 'User registered successfully', success: true });
};

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { email, password } = req.body;
  const user: User | undefined = await findUserByEmail(email);
  if (!user)
    throw new ServerError(404, 'User doesnt exist', {
      email,
    });

  const isMatch: boolean = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new ServerError(401, 'User tried to log in. Invalid Credentials', {
      email,
    });

  const token: string = jwt.sign({ id: user.id }, config.jwtSecret);
  return res.send({ token });
};

export const getUserData = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const user: User | null = await getUserDataDal(+req.params.userId);
  return res.send(user);
};
