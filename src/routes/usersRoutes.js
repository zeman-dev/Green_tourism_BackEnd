import { Router } from 'express';
import { celebrate } from 'celebrate';
import {authenticate} from '../middleware/authenticate.js';
import { savedArticleParamsSchema } from '../validations/userValidation.js';
import {
    addSavedArticle,
    removeSavedArticle,
} from '../controllers/users/savedArticlesController.js';



const router = Router();

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
