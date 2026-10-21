import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  getUsers,
  getUserWithStories,
  updateUserAvatar,
} from '../controllers/users/userController.js';
import { getCurrentUser } from '../controllers/users/userController.js';
import { paginationSchema } from '../validations/storyValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  getUsersSchema,
  getUserWithStoriesSchema,
  savedArticleParamsSchema,
  updateUserSchema,
  confirmEmailSchema,
} from '../validations/userValidation.js';
import {
  getMySavedStories,
  getMyStories,
} from '../controllers/stories/storyController.js';
import {
  addSavedArticle,
  removeSavedArticle,
} from '../controllers/users/savedArticlesController.js';
import {
  updateUser,
  confirmEmailChange,
} from '../controllers/users/profileController.js';

const router = Router();

router.get('/me', authenticate, getCurrentUser);
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

router.get('/', celebrate(getUsersSchema), getUsers);

router.patch(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

router.patch('/me', authenticate, celebrate(updateUserSchema), updateUser);

router.post(
  '/confirm-email',
  celebrate(confirmEmailSchema),
  confirmEmailChange,
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
