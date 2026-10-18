import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getUserWithStoriesSchema } from '../validations/userValidation.js';
import { getUserWithStories } from '../controllers/users/userController.js';

const router = Router();

router.get('/:userId', celebrate(getUserWithStoriesSchema), getUserWithStories);
import { paginationSchema } from '../validations/storyValidation.js';
import { celebrate } from 'celebrate';
import {authenticate} from "../middleware/authenticate.js"
import { getMySavedStories } from '../controllers/stories/storyController.js';

const router = Router();

router.get("/me/saved-stories", authenticate, celebrate(paginationSchema), getMySavedStories);

export default router;
