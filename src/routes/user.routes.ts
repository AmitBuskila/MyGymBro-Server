import { Router } from 'express';
import {
  loginUser,
  registerUser,
  getUserData,
  refreshToken,
  updateUser,
  sendEmailCode,
  validateUserCode,
} from '../controllers/user.controller';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.middleware';
import authenticateToken from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.post('/register', asyncErrorHandler(registerUser));
userRouter.post('/login', asyncErrorHandler(loginUser));
userRouter.post('/refreshToken', asyncErrorHandler(refreshToken));
userRouter.post('/getResetCode', asyncErrorHandler(sendEmailCode));
userRouter.post('/validateCode', asyncErrorHandler(validateUserCode));
userRouter.get(
  '/getData/:userId',
  authenticateToken,
  asyncErrorHandler(getUserData),
);
userRouter.put('/updateUser', asyncErrorHandler(updateUser));

export default userRouter;
