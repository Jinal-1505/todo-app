import { Router } from 'express';
const indexRouter = Router();

import authRouter from './auth.route.js';
import todoRouter from './todo.route.js';
import userRouter from './user.route.js';

indexRouter.use('/auth', authRouter);
indexRouter.use('/todo', todoRouter);
indexRouter.use('/user', userRouter);

export default indexRouter;
