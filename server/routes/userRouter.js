import {Router} from 'express';
import { authUser } from '../controllers/user-controller.js';

export const userRouter = Router();

userRouter.post('/register', authUser.register);
userRouter.post('/login', authUser.login);