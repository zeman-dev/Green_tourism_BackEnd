import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/auth/authController.js';

import { authenticate } from '../middleware/authenticate.js';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const authRouter = Router();

authRouter.post('/register', celebrate(registerUserSchema), registerUser);

authRouter.post('/login', celebrate(loginUserSchema), loginUser);

authRouter.post('/logout', authenticate, logoutUser);

authRouter.post('/refresh', refreshUserSession);

export default authRouter;
