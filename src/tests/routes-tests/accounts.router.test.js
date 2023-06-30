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
afterAll(async () => {
    server.close();
});

describe('Testes de integração', () => {
    let idAccount;
    describe('POST em /api/admin/users/', () => {
        it('Deverá criar um novo usuário', async () => {
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
            expect(response.status).toBe(201);

            idAccount = response.body._id;
        });
        it('Não Deverá criar um novo usuário se algum campo obrigatório não for em formato válido', async () => {
            const mockUser = {
                username: '1john doe',
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
            expect(response.status).toBe(400);
        });
    });

    describe('GET em /api/admin/users quando há algo cadastrado', () => {
        it('Deverá retornar uma lista de usuários', async () => {
            const response = await request(app).get('/api/admin/users');
            expect(response.status).toBe(200);
        });
    });

    describe('GET em /api/users/:idAccount', () => {
        it('Deverá retornar um usuário específico', async () => {
            const response = await request(app).get(`/api/users/${idAccount}`);
            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro, caso o idAccount não exista', async () => {
            const response = await request(app).get('/api/users/1');
            expect(response.status).toBe(404);
        });
    });

    describe('PUT em /api/admin/users/update/:idAccount', () => {
        it('Deverá atualizar um usuários', async () => {
            const mockUser = {
                username: 'John Doe',
                email: 'john.doe@example.com',
                senha: 'password123',
                dataCriacao: '2023-06-23',
                cpf: '12345678901',
                telefone: '91234567890',
                endereco: {
                    bairro: 'Centro',
                    rua: 'Rua Principal',
                    numero: 'S/N',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
            };
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro caso o idAccount não seja encontrado', async () => {
            const mockUser = {
                username: 'John Doe',
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
            const response = await request(app)
                .put('/api/admin/users/update/1')
                .send(mockUser);

            expect(response.status).toBe(404);
        });
        it('Deverá retornar um erro se o username atualizado não tiver um formato valido', async () => {
            const mockUser = {
                username: '1John Doe',
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
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se o email atualizado não tiver um formato valido', async () => {
            const mockUser = {
                username: 'John Doe',
                email: 'john.doeexample.com',
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
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se a senha tiver menos de 5 digitos', async () => {
            const mockUser = {
                username: 'John Doe',
                email: 'john.doe@example.com',
                senha: '123',
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
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se o cpf não for um numero valido', async () => {
            const mockUser = {
                username: 'John Doe',
                email: 'john.doe@example.com',
                senha: 'password123',
                dataCriacao: '2023-06-23',
                cpf: '1234567890',
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
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se o telefone não for um numero valido', async () => {
            const mockUser = {
                username: 'John Doe',
                email: 'john.doe@example.com',
                senha: 'password123',
                dataCriacao: '2023-06-23',
                cpf: '12345678901',
                telefone: '1234567890',
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
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se o bairro não for definido', async () => {
            const mockUser = {
                username: 'John Doe',
                email: 'john.doe@example.com',
                senha: 'password123',
                dataCriacao: '2023-06-23',
                cpf: '12345678901',
                telefone: '91234567890',
                endereco: {
                    bairro: '',
                    rua: 'Rua Principal',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
            };
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se a rua não for definido', async () => {
            const mockUser = {
                username: 'John Doe',
                email: 'john.doe@example.com',
                senha: 'password123',
                dataCriacao: '2023-06-23',
                cpf: '12345678901',
                telefone: '91234567890',
                endereco: {
                    bairro: 'Centro',
                    rua: '',
                    numero: '123',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
            };
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se número não for um valor valido', async () => {
            const mockUser = {
                username: 'John Doe',
                email: 'john.doe@example.com',
                senha: 'password123',
                dataCriacao: '2023-06-23',
                cpf: '12345678901',
                telefone: '91234567890',
                endereco: {
                    bairro: 'Centro',
                    rua: 'Rua Principal',
                    numero: 'aa',
                    complemento: 'Apartment 4',
                    cep: '12345678',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
            };
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se o cep não for um valor valido', async () => {
            const mockUser = {
                username: 'John Doe',
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
                    cep: '1234567',
                    cidade: 'São Paulo',
                    uf: 'SP',
                },
            };
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se a cidade não for definida', async () => {
            const mockUser = {
                username: 'John Doe',
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
                    cidade: '',
                    uf: 'SP',
                },
            };
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
        it('Deverá retornar um erro se o uf não for um valor valido', async () => {
            const mockUser = {
                username: 'John Doe',
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
                    uf: 'II',
                },
            };
            const response = await request(app)
                .put(`/api/admin/users/update/${idAccount}`)
                .send(mockUser);

            expect(response.status).toBe(400);
        });
    });
    describe('DELETE em /api/admin/users/remove/:idAccount', () => {
        it('Deverá deletar um usuário', async () => {
            const response = await request(app)
                .delete(`/api/admin/users/remove/${idAccount}`);

            expect(response.status).toBe(200);
        });
        it('Deverá retornar um erro caso o idAccount não seja encontrado', async () => {
            const response = await request(app)
                .delete('/api/admin/users/remove/1');

            expect(response.status).toBe(404);
        });
    });
});