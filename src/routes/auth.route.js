import { Router } from 'express';
import { signUp, signIn } from '../controllers/auth.controller.js';
const authRouter = Router();

export default authRouter;

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
