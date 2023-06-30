import {
    describe, expect, it, jest,
} from '@jest/globals';
import categoryController from '../../controller/categoriesController.js';
import Categories from './../../model/category';

describe('GET em /api/admin/users/ quando não há cadastros', () => {
    const request = {};
    const response = {};
    it('Deverá retornar "404" se não houver categorias', async () => {
        response.status = jest.fn().mockReturnValue(response);
        response.send = jest.fn().mockReturnValue(response);

        jest.spyOn(Categories, 'find').mockResolvedValue([]);
        await categoryController.findCategorias(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
    });
});