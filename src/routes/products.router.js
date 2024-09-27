import express from 'express';
import productController from '../controller/productsController.js';

const router = express.Router();

router
    .get('/api/products', productController.findProducts)
    .get('/api/products/:id', productController.findProductById)
    .post('/api/admin/products', productController.createProduct)
    .put('/api/admin/products/update/:id', productController.updateProduct)
    .delete('/api/admin/products/remove/:id', productController.deleteProduct);

export default router;