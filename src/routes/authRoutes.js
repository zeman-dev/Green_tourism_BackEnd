import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser } from '../controllers/auth/authController.js';
import { registerUserSchema } from '../validations/authValidation.js';

const authRouter = Router();
authRouter.post(
  '/register',
  celebrate(registerUserSchema),
  registerUser,
);

export default authRouter;









