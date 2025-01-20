import { ValidateUser } from '../middleware/validate-user.js';
import { getUser, deleteUser } from '../controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();

export default userRouter;

// User Management Routes
userRouter.route('/').get(ValidateUser, getUser);
userRouter.route('/:id').delete(ValidateUser, deleteUser);
