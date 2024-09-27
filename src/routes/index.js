import express from 'express';
import accounts from './accounts.router.js';
import categories from './categories.router.js';
import orders from './orders.router.js';
import products from './products.router.js';

const routes = (app) => {
    app.route('/').get((_req, res) => {
        res.status(200).send({ Titulo: 'Alura - LevelUp: ECOMM | PagoNxt <NxtDev/> - T3' });
    });

    app.use(
        express.json(),
        accounts,
        categories,
        orders,
        products
    );
};

export default routes;