import { Router } from 'express';
import {
  loginUser,
  registerUser,
  getUserData,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getData/:userId', getUserData);

export default userRouter;
