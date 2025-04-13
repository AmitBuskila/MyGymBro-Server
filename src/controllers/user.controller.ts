import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../config';
import {
  deleteExpiredCodes,
  getLatestUserCode,
  updateResetCode,
} from '../dal/resetCode.dal';
import {
  addUser,
  findUserByEmail,
  getUserDataDal,
  updateUserDal,
} from '../dal/user.dal';
import { User } from '../entities/user.entity';
import { ServerError } from '../utils/customError';

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword: string = await bcrypt.hash(password, 10);
  await addUser({ firstName, lastName, email, password: hashedPassword });
  res
    .status(201)
    .send({ message: 'User registered successfully', success: true });
};

export const loginUser = async (req: Request, res: Response) => {
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

  const token: string = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: '12 hours',
  });
  res.send({ token });
};

export const refreshToken = async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
  } else {
    const decodedToken: JwtPayload = (jwt.decode(token) as JwtPayload)!;
    if (decodedToken.id) {
      const newAccessToken: string = jwt.sign(
        { id: decodedToken.id },
        config.jwtSecret,
        {
          expiresIn: '12 hours',
        },
      );
      res.json({ accessToken: newAccessToken });
    } else {
      res.sendStatus(403);
    }
  }
};

export const getUserData = async (req: Request, res: Response) => {
  const user: User | null = await getUserDataDal(+req.params.userId);
  res.send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user: User | undefined = await findUserByEmail(req.body.email);
  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }
  if (req.body.password) {
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
  }
  const updatedUser: User | null = await updateUserDal({
    id: user.id,
    ...req.body,
  });
  console.log('Updated user:', updatedUser);
  console.log('Updated user:', updatedUser);
  res.send(updatedUser);
};

export const sendEmailCode = async (req: Request, res: Response) => {
  const { username } = req.body;
  const user: User | undefined = await findUserByEmail(username);
  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }
  const code: string = Math.floor(100000 + Math.random() * 900000).toString();
  const expiration: Date = new Date(Date.now() + 60 * 60 * 1000);
  await updateResetCode({ code, expiration }, user.id);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.email,
      pass: config.emailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"MyGymBro App" <no-reply@MyGymBro.com>',
    to: username,
    subject: 'Your Verification Code',
    html: `
    <div style="font-family: sans-serif; max-width: 400px; margin: auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
      <h2 style="text-align: center; color: #4A90E2;">🔐 Verify Your Email</h2>
      <p style="font-size: 16px; color: #333;">
        Your 6-digit verification code is:
      </p>
      <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; text-align: center; margin: 20px 0; color: #4A90E2;">
        ${code}
      </div>
      <p style="font-size: 14px; color: #777;">
        This code will expire in 1 hour. If you didn’t request this, you can safely ignore this email.
      </p>
      <p style="font-size: 12px; color: #bbb; text-align: center; margin-top: 30px;">
        &copy; ${new Date().getFullYear()} MyGymBro
      </p>
    </div>
  `,
  };
  await transporter.sendMail(mailOptions);
  console.log(`Verification code sent to ${username}`);
  deleteExpiredCodes(); // instead of cronjob, cleanup
  res.json({ message: 'Verification code sent successfully', status: 200 });
};

export const validateUserCode = async (req: Request, res: Response) => {
  const { code, username } = req.body;
  const user: User | undefined = await findUserByEmail(username);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  const latestCode = await getLatestUserCode(user.id);
  if (!latestCode) {
    res.status(404).json({ message: 'No code found for this user' });
    return;
  }
  if (latestCode.code === code) {
    res.json({ message: 'Code is valid', status: 200 });
  } else {
    res.status(400).json({ message: 'Invalid code' });
  }
  deleteExpiredCodes(); // instead of cronjob, cleanup
  res.json({ message: 'Verification code sent successfully', status: 200 });
};
