import { celebrate } from 'celebrate';
import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUserWithStoriesSchema,
  savedArticleParamsSchema,
} from '../validations/userValidation.js';
import { getUserWithStories } from '../controllers/users/userController.js';
import { paginationSchema } from '../validations/storyValidation.js';
import { getMySavedStories } from '../controllers/stories/storyController.js';
import {
  addSavedArticle,
  removeSavedArticle,
} from '../controllers/users/savedArticlesController.js';

const router = Router();

router.get('/:userId', celebrate(getUserWithStoriesSchema), getUserWithStories);

router.get(
  '/me/saved-stories',
  authenticate,
  celebrate(paginationSchema),
  getMySavedStories,
);

router.post(
  '/saved-articles/:storyId',
  authenticate,
  celebrate(savedArticleParamsSchema),
  addSavedArticle,
);

router.delete(
  '/saved-articles/:storyId',
  authenticate,
  celebrate(savedArticleParamsSchema),
  removeSavedArticle,
);

export default router;