import express from 'express';
import userAuth from '../middlewares/user-auth.js';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category-controller.js';

const categoryRouter = express.Router();
categoryRouter.use(userAuth);
categoryRouter.get('/', getCategories);
categoryRouter.post('/', createCategory);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter; 