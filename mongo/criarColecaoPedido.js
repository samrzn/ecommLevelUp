use('ecomm');

const colecaoPedidos = db.createCollection("orders",
    {
        validator: {
            $jsonSchema: {
                title: 'Modelagem de pedidos',
                description: 'Esquema para validação dos pedidos de usuários.',
                bsonType: 'object',
                additionalProperties: false,
                required: [
                    '_id',
                    'dataPedido',
                    'account',
                    'enderecoEntrega',
                    'itensPedido'
                ],
                properties: {
                    _id: {
                        bsonType: 'objectId',
                        description: 'Identificador exclusivo por pedido.'
                    },
                    dataPedido: {
                        bsonType: 'date',
                        description: 'Data de criação do pedido.'
                    },
                    account: {
                        bsonType: 'object',
                        required: [
                            'accountId',
                            'nomeCliente'
                        ],
                        properties: {
                            accountID: {
                                bsonType: 'objectId',
                            },
                            nomeCliente: {
                                bsonType: 'string',
                            }
                        },
                        description: 'Informações de cliente e usuário.'
                    },
                    enderecoEntrega: {
                        bsonType: 'object',
                        required: [
                            'bairro',
                            'rua',
                            'numero',
                            'complemento',
                            'cep',
                            'cidade',
                            'uf'
                        ],
                        properties: {
                            bairro: {
                                bsonType: 'string',
                                minLength: 1
                            },
                            rua: {
                                bsonType: 'string',
                                minLength: 1
                            },
                            numero: {
                                bsonType: 'string',
                                minLength: 1
                            },
                            complemento: {
                                bsonType: 'string',
                            },
                            cep: {
                                bsonType: 'string',
                                pattern: "^[0-9]{8}$"
                            },
                            cidade: {
                                bsonType: 'string',
                                minLength: 5
                            },
                            uf: {
                                bsonType: 'string',
                                pattern: "^[A-Z]{2}$"
                            }
                        },
                        description: 'Endereço completo do usuário.'
                    },
                    itensPedido: {
                        bsonType: 'array',
                        minItems: 1,
                        items: {
                            bsonType: 'object',
                            required: [
                                'productId',
                                'quantidade',
                                'preco_unitario'
                            ],
                            properties: {
                                productId: {
                                    bsonType: 'objectId'
                                },
                                quantidade: {
                                    bsonType: 'number',
                                    minimum: 1
                                },
                                desconto: {
                                    bsonType: 'number',
                                    minimum: 0,
                                    exclusiveMinimum: true
                                },
                                preco_unitario: {
                                    bsonType: 'decimal',
                                    minimum: 0,
                                    exclusiveMinimum: true
                                },
                                description: 'Informações sobre o pedido.'
                            }
                        }
                    }
                }
            }
        }
    }
);

console.log(colecaoPedidos);