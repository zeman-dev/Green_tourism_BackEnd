import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getUserWithStoriesSchema } from '../validations/userValidation.js';
import { getUserWithStories } from '../controllers/users/userController.js';

const router = Router();

router.get('/:userId', celebrate(getUserWithStoriesSchema), getUserWithStories);

export default router;
