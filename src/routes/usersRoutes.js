import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getUserWithStoriesSchema } from '../validations/userValidation.js';
import { getUserWithStories, updateUserAvatar } from '../controllers/users/userController.js';
import { paginationSchema } from '../validations/storyValidation.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { getMySavedStories } from '../controllers/stories/storyController.js';
import { upload } from '../middleware/multer.js';

const router = Router();

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


export default router;
