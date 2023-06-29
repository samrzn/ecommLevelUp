import express from 'express';
import categoryController from '../controller/categoriesController.js';

const router = express.Router();

router
    .get('/api/categories', categoryController.findCategories)
    .get('/api/categories/:id', categoryController.findCategoriesById)
    .post('/api/admin/categories', categoryController.createCategory)
    .put('/api/admin/categories/update/:id', categoryController.updateCategory)
    .put('/api/admin/categories/active/:id', categoryController.activeCategory)
    .delete('/api/admin/categories/remove/:id', categoryController.deleteCategory);

export default router;