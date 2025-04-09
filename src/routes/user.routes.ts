import { Router } from 'express';
import {
  loginUser,
  registerUser,
  getUserData,
  refreshToken,
} from '../controllers/user.controller';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.middleware';
import authenticateToken from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.post('/register', asyncErrorHandler(registerUser));
userRouter.post('/login', asyncErrorHandler(loginUser));
userRouter.post('/refreshToken', asyncErrorHandler(refreshToken));
userRouter.get(
  '/getData/:userId',
  authenticateToken,
  asyncErrorHandler(getUserData),
);

export default userRouter;
