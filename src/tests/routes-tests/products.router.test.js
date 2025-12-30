import request from 'supertest';
import {
    describe, it, expect, beforeAll, afterAll,
} from '@jest/globals';
import app from '../../main.js';

let server;
let idCategory;
beforeAll(async () => {
    const port = 3000;
    server = app.listen(port);

    const mockCategoria = { nome: 'TESTE', status: 'ATIVA' };
    const category = await request(app).post('/api/admin/categories').send(mockCategoria);

    idCategory = category.body._id;
});
afterAll(async () => {
    await request(app)
        .delete(`/api/admin/categories/remove/${idCategory}`);
    server.close();
});

describe('Testes de integração', () => {
    let idProduct;
    describe('POST em /api/admin/products/', () => {
        it('Deverá criar um novo produto', async () => {
            const mockProduto = {
                nome: 'Smartphone Samsung Galaxy S23',
                descricao: 'Smartphone Samsung Galaxy S23 128GB creme 5G 8GB RAM',
                estoque: 164,
                categoria: `${idCategory}`,
                preco: 3899,
                slug: 'Smartphone-Samsung-Galaxy-S23',
            };
            const response = await request(app).post('/api/admin/products').send(mockProduto);
            expect(response.status).toBe(201);

            idProduct = response.body._id;
        });
        it('Não deve criar um novo produto se o nome não for um formato valido', async () => {
            const mockProduto = {
                nome: 'Sm',
                descricao: 'Smartphone Samsung Galaxy S23 128GB creme 5G 8GB RAM',
                estoque: 164,
                categoria: idCategory,
                preco: 3899,
                slug: 'Smartphone-Samsung-Galaxy-S23',
            };
            const response = await request(app).post('/api/admin/products').send(mockProduto);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo produto se o slug não for um formato valido', async () => {
            const mockProduto = {
                nome: 'Smartphone Samsung Galaxy S23',
                descricao: 'Smartphone Samsung Galaxy S23 128GB creme 5G 8GB RAM',
                estoque: 164,
                categoria: idCategory,
                preco: 3899,
                slug: 'Smartphone Samsung Galaxy S23',
            };
            const response = await request(app).post('/api/admin/products').send(mockProduto);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo produto se o preço for menor ou igual a zero', async () => {
            const mockProduto = {
                nome: 'Smartphone Samsung Galaxy S23',
                descricao: 'Smartphone Samsung Galaxy S23 128GB creme 5G 8GB RAM',
                estoque: 164,
                categoria: idCategory,
                preco: 0,
                slug: 'Smartphone-Samsung-Galaxy-S23',
            };
            const response = await request(app).post('/api/admin/products').send(mockProduto);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo produto se o estoque não estiver entre 1 e 9999', async () => {
            const mockProduto = {
                nome: 'Smartphone Samsung Galaxy S23',
                descricao: 'Smartphone Samsung Galaxy S23 128GB creme 5G 8GB RAM',
                estoque: 16400,
                categoria: idCategory,
                preco: 3899,
                slug: 'Smartphone-Samsung-Galaxy-S23',
            };
            const response = await request(app).post('/api/admin/products').send(mockProduto);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo produto se a categoria não existir', async () => {
            const mockProduto = {
                nome: 'Smartphone Samsung Galaxy S23',
                descricao: 'Smartphone Samsung Galaxy S23 128GB creme 5G 8GB RAM',
                estoque: 164,
                categoria: '1',
                preco: 3899,
                slug: 'Smartphone-Samsung-Galaxy-S23',
            };
            const response = await request(app).post('/api/admin/products').send(mockProduto);
            expect(response.status).toBe(400);
        });
    });

    describe('GET em /api/products/ quando há algo cadastrado', () => {
        it('Deverá retornar uma lista de produtos', async () => {
            const response = await request(app).get('/api/products');
            expect(response.status).toBe(200);
        });
    });

    describe('GET em /api/products/:idProduct', () => {
        it('Deverá retornar um produto específica', async () => {
            const response = await request(app).get(`/api/products/${idProduct}`);
            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro, caso o idProduct não exista', async () => {
            const response = await request(app).get('/api/products/1');
            expect(response.status).toBe(404);
        });
    });

    describe('PUT em /api/admin/products/update/:idProduct', () => {
        it('Deverá atualizar um produto', async () => {
            const mockProduto = {
                nome: 'Smartphone Samsung Galaxy S23 Plus',
                descricao: 'Smartphone Samsung Galaxy S23 Plus 256GB creme 5G 8GB RAM',
                estoque: 164,
                categoria: `${idCategory}`,
                preco: 4599,
                slug: 'Smartphone-Samsung-Galaxy-S23-Plus',
            };
            const response = await request(app)
                .put(`/api/admin/products/update/${idProduct}`)
                .send(mockProduto);

            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro caso o idProduct não seja encontrado', async () => {
            const mockProduto = {
                nome: 'Smartphone Samsung Galaxy S23 Plus',
                descricao: 'Smartphone Samsung Galaxy S23 Plus 256GB creme 5G 8GB RAM',
                estoque: 164,
                categoria: `${idCategory}`,
                preco: 4599,
                slug: 'Smartphone-Samsung-Galaxy-S23-Plus',
            };
            const response = await request(app)
                .put('/api/admin/products/update/1')
                .send(mockProduto);

            expect(response.status).toBe(404);
        });
        it('Deverá retornar um erro se o nome atualizado não tiver um formato valido', async () => {
            const response = await request(app)
                .put(`/api/admin/products/update/${idProduct}`)
                .send({ nome: 'Sm' });

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se o slug atualizado não tiver um formato valido', async () => {
            const response = await request(app)
                .put(`/api/admin/products/update/${idProduct}`)
                .send({ slug: 'Smartphone Samsung Galaxy S23' });

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se o preço atualizado for menor ou igual a zero', async () => {
            const response = await request(app)
                .put(`/api/admin/products/update/${idProduct}`)
                .send({ preco: 0 });

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se o estoque atualizado não estiver entre 0 e 9999', async () => {
            const response = await request(app)
                .put(`/api/admin/products/update/${idProduct}`)
                .send({ preco: 16000 });

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se a categoria atualizada não for encontrada', async () => {
            const response = await request(app)
                .put(`/api/admin/products/update/${idProduct}`)
                .send({ categoria: '123' });

            expect(response.status).toBe(400);
        });
    });
    describe('DELETE em /api/admin/products/remove/:idProduct', () => {
        it('Deverá deletar um produto', async () => {
            const response = await request(app)
                .delete(`/api/admin/products/remove/${idProduct}`);

            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro caso o idProduct não seja encontrado', async () => {
            const response = await request(app)
                .delete('/api/admin/products/remove/1');

            expect(response.status).toBe(404);
        });
    });
});