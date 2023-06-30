import request from 'supertest';
import {
    describe, it, expect, beforeAll, afterAll,
} from '@jest/globals';
import app from '../../main.js';

let server;
beforeAll(async () => {
    const port = 3000;
    server = app.listen(port);
});
afterAll(() => {
    server.close();
});

describe('Testes de integração', () => {
    describe('Retorno da rota padrão', () => {
        it('Deverá retornar uma mensagem padrão', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
        });
    });

    let id;
    describe('POST em /api/admin/categories/', () => {
        it('Deverá criar uma nova categoria', async () => {
            const mockCategoria = { nome: 'Categoria1', status: 'INATIVA' };
            const response = await request(app).post('/api/admin/categories').send(mockCategoria);
            expect(response.status).toBe(201);

            id = response.body._id;
        });
        it('Não Deverá criar uma nova categoria se o nome não for um formato válido', async () => {
            const mockCategoria = { nome: 'CA', status: 'INATIVA' };
            const response = await request(app).post('/api/admin/categories').send(mockCategoria);
            expect(response.status).toBe(400);
        });
    });

    describe('GET em /api/categories/ quando há algo cadastrado', () => {
        it('Deverá retornar uma lista de categorias', async () => {
            const response = await request(app).get('/api/categories');
            expect(response.status).toBe(200);
        });
    });

    describe('GET em /api/categories/:id', () => {
        it('Deverá retornar uma categoria específica', async () => {
            const response = await request(app).get(`/api/categories/${id}`);
            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro, caso o id não exista', async () => {
            const response = await request(app).get('/api/categories/1');
            expect(response.status).toBe(404);
        });
    });

    describe('PUT em /api/admin/categories/update/:id', () => {
        it('Deverá atualizar uma categoria', async () => {
            const response = await request(app)
                .put(`/api/admin/categories/update/${id}`)
                .send({ nome: 'Atualizada', status: 'INATIVA' });

            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro caso o id não seja encontrado', async () => {
            const response = await request(app)
                .put('/api/admin/categories/update/1')
                .send({ nome: 'Atualizada', status: 'INATIVA' });

            expect(response.status).toBe(404);
        });
        it('Deverá retornar um erro se o nome atualizado tiver menos de 3 caracteres', async () => {
            const response = await request(app)
                .put(`/api/admin/categories/update/${id}`)
                .send({ nome: 'CA', status: 'INATIVA' });

            expect(response.status).toBe(400);
        });
    });
    describe('PUT em /api/admin/categories/active/:id', () => {
        it('Deverá ativar uma categoria', async () => {
            const response = await request(app)
                .put(`/api/admin/categories/active/${id}`);

            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro caso o id não seja encontrado', async () => {
            const response = await request(app)
                .put('/api/admin/categories/active/1');

            expect(response.status).toBe(404);
        });
    });
    describe('DELETE em /api/admin/categories/remove/:id', () => {
        it('Deverá deletar uma categoria', async () => {
            const response = await request(app)
                .delete(`/api/admin/categories/remove/${id}`);

            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro caso o id não seja encontrado', async () => {
            const response = await request(app)
                .delete('/api/admin/categories/remove/1');

            expect(response.status).toBe(404);
        });
    });
});