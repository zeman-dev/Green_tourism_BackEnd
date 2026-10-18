import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getRecommendedStoriesSchema, getAllStoriesSchema, getStoryByIdSchema } from '../validations/storyValidation.js';
import { getRecommendedStories, getAllStories, getStoryById } from '../controllers/stories/storyController.js';

const router = Router();

router.get(
  '/',
  celebrate(getAllStoriesSchema),
  getAllStories,
);

router.get(
  '/recommended',
  celebrate(getRecommendedStoriesSchema),
  getRecommendedStories,
);

router.get(
  '/:storyId',
  celebrate(getStoryByIdSchema),
  getStoryById,
);

export default router;
