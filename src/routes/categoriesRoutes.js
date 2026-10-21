import { Router } from 'express';
import { getCategories } from '../controllers/categories/categoriesController.js';


const router = Router();

router.get('/', getCategories);

export default router;
