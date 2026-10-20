import { celebrate } from 'celebrate';
import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';

import {
  getRecommendedStoriesSchema,
  getAllStoriesSchema,
  getStoryByIdSchema,
  createStorySchema,
} from '../validations/storyValidation.js';

import {
  getRecommendedStories,
  getAllStories,
  getStoryById,
  createStory,
} from '../controllers/stories/storyController.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/', celebrate(getAllStoriesSchema), getAllStories);

router.get(
  '/recommended',
  celebrate(getRecommendedStoriesSchema),
  getRecommendedStories,
);

router.get('/:storyId', celebrate(getStoryByIdSchema), getStoryById);

router.post(
  '/',
  authenticate,
  upload.single('img'),
  celebrate(createStorySchema),
  createStory,
);

export default router;
