import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getUserWithStoriesSchema } from '../validations/userValidation.js';
import { getUserWithStories, updateUserAvatar } from '../controllers/users/userController.js';
import { paginationSchema } from '../validations/storyValidation.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { getMySavedStories } from '../controllers/stories/storyController.js';
import { upload } from '../middleware/multer.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUserWithStoriesSchema,
  savedArticleParamsSchema,
} from '../validations/userValidation.js';
import { getUserWithStories } from '../controllers/users/userController.js';
import { paginationSchema } from '../validations/storyValidation.js';
import {
  getMySavedStories,
  getMyStories,
} from '../controllers/stories/storyController.js';
import {
  addSavedArticle,
  removeSavedArticle,
} from '../controllers/users/savedArticlesController.js';

const router = Router();

router.get(
  '/me/stories',
  authenticate,
  celebrate(paginationSchema),
  getMyStories,
);

router.get('/:userId', celebrate(getUserWithStoriesSchema), getUserWithStories);

router.get(
  '/me/saved-stories',
  authenticate,
  celebrate(paginationSchema),
  getMySavedStories,
);

router.patch(
  '/me/avatar',
  authenticate,
  upload.single("avatar"),
  updateUserAvatar,
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
