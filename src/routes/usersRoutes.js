import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  getUserWithStories,
  updateUserAvatar,
} from '../controllers/users/userController.js';
import { paginationSchema } from '../validations/storyValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  getUserWithStoriesSchema,
  savedArticleParamsSchema,
  updateUserSchema,
} from '../validations/userValidation.js';
import {
  getMySavedStories,
  getMyStories,
} from '../controllers/stories/storyController.js';
import {
  addSavedArticle,
  removeSavedArticle,
} from '../controllers/users/savedArticlesController.js';
import { updateUser } from '../controllers/users/profileController.js';

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
  upload.single('avatar'),
  updateUserAvatar,
);

router.patch('/me', authenticate, celebrate(updateUserSchema), updateUser);

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
