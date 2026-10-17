import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser, loginUser } from '../controllers/auth/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const authRouter = Router();
authRouter.post('/register', celebrate(registerUserSchema), registerUser);

authRouter.post('/login', celebrate(loginUserSchema), loginUser);

export default authRouter;
