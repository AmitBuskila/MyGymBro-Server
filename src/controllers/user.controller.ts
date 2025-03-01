import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { addUser, findUserByEmail } from '../dal/user.dal';
import { User } from '../entities/user.entity';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword: string = await bcrypt.hash(password, 10);
    await addUser({ firstName, lastName, email, password: hashedPassword });
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send((error as Error).message || 'Error registering user');
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user: User | undefined = await findUserByEmail(email);
    if (!user) return res.status(404).send('User not found');

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: '2 days',
    });
    return res.send({ token });
  } catch (error) {
    return res.status(500).send((error as Error).message || 'Error logging in');
  }
};
