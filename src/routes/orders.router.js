import express from 'express';
import orderController from '../controller/ordersController.js';

const router = express.Router();

router
    .post('/api/orders', orderController.createOrder)
    .get('/api/orders/:id', orderController.findOrderById);

export default router;