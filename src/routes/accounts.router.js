import express from 'express';
import accountController from '../controller/accountsController.js';

const router = express.Router();

router
    .post('/api/admin/users', accountController.createUser)
    .get('/api/admin/users', accountController.findUsers)
    .get('/api/users/:id', accountController.findUserById)
    .put('/api/admin/users/update/:id', accountController.updateUser)
    .delete('/api/admin/users/remove/:id', accountController.deleteUser);

export default router;