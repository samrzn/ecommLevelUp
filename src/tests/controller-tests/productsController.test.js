import {
    describe, expect, it, jest,
} from '@jest/globals';
import Products from '../../model/product.js';
import productController from '../../controller/productsController.js';

describe('GET em /api/products/ quando não há cadastros', () => {
    const request = {};
    const response = {};
    it('Deverá retornar "404" se não houver produtos cadastrados', async () => {
        response.status = jest.fn().mockReturnValue(response);
        response.send = jest.fn().mockReturnValue(response);

        jest.spyOn(Products, 'find').mockResolvedValue([]);
        await productController.findProducts(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
    });
});