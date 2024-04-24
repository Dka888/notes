import {Router} from 'express';
import { authUser } from '../controllers/user-controller.js';
import {verifyPassword} from '../middleware/middleware.js';

export const userRouter = Router();

userRouter.post('/register', verifyPassword, authUser.register);
userRouter.post('/login', authUser.login);
userRouter.delete('/:id', authUser.deleteById);
userRouter.get('/', authUser.getAllUsers);