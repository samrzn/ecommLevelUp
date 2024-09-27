import request from 'supertest';
import {
    describe, it, expect, beforeAll, afterAll,
} from '@jest/globals';
import app from '../../main.js';

let server;
let idUser;
let idProduct;
beforeAll(async () => {
    const port = 3000;
    server = app.listen(port);

    const mockUser = {
        username: 'john doe',
        email: 'john.doe@example.com',
        senha: 'password123',
        dataCriacao: '2023-06-23',
        cpf: '12345678901',
        telefone: '91234567890',
        endereco: {
            bairro: 'Centro',
            rua: 'Rua Principal',
            numero: '123',
            complemento: 'Apartment 4',
            cep: '12345678',
            cidade: 'São Paulo',
            uf: 'SP',
        },
    };
    const response = await request(app).post('/api/admin/users').send(mockUser);

    idUser = response.body._id;

    const mockProduto = {
        slug: 'galaxy-s23',
        preco: 3860,
        nome: 'Galaxy s23',
        descricao: 'Smartfone Samsung Galaxy s23',
        estoque: 2,
        categoria: '6494b92d0ca3485157aa5bff',
    };
    const product = await request(app).post('/api/admin/products').send(mockProduto);

    idProduct = product.body._id;
});

afterAll(async () => {
    await request(app)
        .delete(`/api/admin/users/remove/${idUser}`);
    await request(app)
        .delete(`/api/admin/products/remove/${idProduct}`);
    server.close();
});

describe('Testes de integração', () => {
    let idOrder;
    describe('POST em /api/admin/products/', () => {
        it('Deverá criar um novo produto', async () => {
            const mockPedido = {
                dataPedido: '2023-06-23',
                account: {
                    accountId: `${idUser}`,
                    nomeCliente: 'John Doe',
                },
                endereco: {
                    bairro: 'Centro',
                    rua: 'Rua Principal',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
                itens: [
                    {
                        productId: `${idProduct}`,
                        quantidade: 2,
                        desconto: 89.50,
                        precoUnitario: 3860,
                    },
                ],
            };
            const response = await request(app).post('/api/orders').send(mockPedido);
            expect(response.status).toBe(201);

            idOrder = response.body._id;
        });
        it('Não deve criar um novo produto se o nome do Cliente não for um formato valido', async () => {
            const mockPedido = {
                dataPedido: '2023-06-23',
                account: {
                    accountId: `${idUser}`,
                    nomeCliente: '1John Doe',
                },
                endereco: {
                    bairro: 'Centro',
                    rua: 'Rua Principal',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
                itens: [
                    {
                        productId: `${idProduct}`,
                        quantidade: 2,
                        desconto: 89.50,
                        precoUnitario: 3860,
                    },
                ],
            };
            const response = await request(app).post('/api/orders').send(mockPedido);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo pedido se o bairro não for definido', async () => {
            const mockPedido = {
                dataPedido: '2023-06-23',
                account: {
                    accountId: `${idUser}`,
                    nomeCliente: 'John Doe',
                },
                endereco: {
                    bairro: '',
                    rua: 'Rua Principal',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
                itens: [
                    {
                        productId: `${idProduct}`,
                        quantidade: 2,
                        desconto: 89.50,
                        precoUnitario: 3860,
                    },
                ],
            };
            const response = await request(app).post('/api/orders').send(mockPedido);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo pedido se a quantidade for menor que 1', async () => {
            const mockPedido = {
                dataPedido: '2023-06-23',
                account: {
                    accountId: `${idUser}`,
                    nomeCliente: 'John Doe',
                },
                endereco: {
                    bairro: 'Centro',
                    rua: 'Rua Principal',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
                itens: [
                    {
                        productId: `${idProduct}`,
                        quantidade: 0,
                        desconto: 89.50,
                        precoUnitario: 3860,
                    },
                ],
            };
            const response = await request(app).post('/api/orders').send(mockPedido);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo pedido se o preço unitario for menor que 0', async () => {
            const mockPedido = {
                dataPedido: '2023-06-23',
                account: {
                    accountId: `${idUser}`,
                    nomeCliente: 'John Doe',
                },
                endereco: {
                    bairro: 'Centro',
                    rua: 'Rua Principal',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
                itens: [
                    {
                        productId: `${idProduct}`,
                        quantidade: 2,
                        desconto: 89.50,
                        precoUnitario: 0,
                    },
                ],
            };
            const response = await request(app).post('/api/orders').send(mockPedido);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo pedido se o desconto for menor que 0', async () => {
            const mockPedido = {
                dataPedido: '2023-06-23',
                account: {
                    accountId: `${idUser}`,
                    nomeCliente: 'John Doe',
                },
                endereco: {
                    bairro: 'Centro',
                    rua: 'Rua Principal',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
                itens: [
                    {
                        productId: `${idProduct}`,
                        quantidade: 2,
                        desconto: 0,
                        precoUnitario: 3860,
                    },
                ],
            };
            const response = await request(app).post('/api/orders').send(mockPedido);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo pedido se o usuario não for encontrado', async () => {
            const mockPedido = {
                dataPedido: '2023-06-23',
                account: {
                    accountId: '1',
                    nomeCliente: 'John Doe',
                },
                endereco: {
                    bairro: 'Centro',
                    rua: 'Rua Principal',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
                itens: [
                    {
                        productId: `${idProduct}`,
                        quantidade: 2,
                        desconto: 30,
                        precoUnitario: 3860,
                    },
                ],
            };
            const response = await request(app).post('/api/orders').send(mockPedido);
            expect(response.status).toBe(400);
        });
        it('Não deve criar um novo pedido se o produto não for encontrado', async () => {
            const mockPedido = {
                dataPedido: '2023-06-23',
                account: {
                    accountId: `${idUser}`,
                    nomeCliente: 'John Doe',
                },
                endereco: {
                    bairro: 'Centro',
                    rua: 'Rua Principal',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
                itens: [
                    {
                        productId: '1',
                        quantidade: 2,
                        desconto: 30,
                        precoUnitario: 3860,
                    },
                ],
            };
            const response = await request(app).post('/api/orders').send(mockPedido);
            expect(response.status).toBe(400);
        });
    });

    describe('GET em /api/orders/:idOrder', () => {
        it('Deverá retornar um produto específica', async () => {
            const response = await request(app).get(`/api/orders/${idOrder}`);
            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro, caso o idOrder não exista', async () => {
            const response = await request(app).get('/api/orders/1');
            expect(response.status).toBe(404);
        });
    });
});