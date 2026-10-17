import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getRecommendedStoriesSchema, getAllStoriesSchema } from '../validations/storyValidation.js';
import { getRecommendedStories, getAllStories } from '../controllers/stories/storyController.js';

const router = Router();

router.get(
  '',
  celebrate(getAllStoriesSchema),
  getAllStories,
);

router.get(
  '/recommended',
  celebrate(getRecommendedStoriesSchema),
  getRecommendedStories,
);

export default router;
