import { Router } from 'express';
import { paginationSchema } from '../validations/storyValidation.js';
import { celebrate } from 'celebrate';
import {authenticate} from "../middleware/authenticate.js"
import { getMySavedStories } from '../controllers/stories/storyController.js';

const router = Router();

router.get("/me/saved-stories", authenticate, celebrate(paginationSchema), getMySavedStories);

export default router;
