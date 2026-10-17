import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getRecommendedStoriesSchema } from '../validations/storyValidation.js';
import { getRecommendedStories } from '../controllers/stories/storyController.js';

const router = Router();

router.get(
  '/recommended',
  celebrate(getRecommendedStoriesSchema),
  getRecommendedStories,
);

export default router;
