import {
    describe, expect, it, jest,
} from '@jest/globals';
import Accounts from '../../model/account.js';
import accountController from '../../controller/accountsController.js';

describe('GET em /api/categories/ quando não há cadastros', () => {
    const request = {};
    const response = {};
    it('Deverá retornar "404" se não houver usuários', async () => {
        response.status = jest.fn().mockReturnValue(response);
        response.send = jest.fn().mockReturnValue(response);

        jest.spyOn(Accounts, 'find').mockResolvedValue([]);
        await accountController.findUsers(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
    });
});