use('ecomm');

const colecaoContas = db.createCollection("accounts",
    {
        validator: {
            $jsonSchema: {
                title: 'Modelagem de contas',
                description: 'Esquema para validação de contas de usuário.',
                bsonType: 'object',
                additionalProperties: false,
                required: [
                    '_id',
                    'nomeUsuario',
                    'email',
                    'senha',
                    'dataCriacao',
                    'cpf',
                    'telefone',
                    'endereco'
                ],
                properties: {
                    _id: {
                        bsonType: 'objectId',
                        description: 'Identificador exclusivo por usuário.'
                    },
                    nomeUsuario: {
                        bsonType: 'string',
                        minLength: 5,
                        description: 'Nome de usuário do cliente.'
                    },
                    email: {
                        bsonType: 'string',
                        minLength: 5,
                        description: 'Endereço de correio eletrônico do usuário.'
                    },
                    senha: {
                        bsonType: 'string',
                        minLength: 5,
                        description: 'Senha de acesso do usuário.'
                    },
                    dataCriacao: {
                        bsonType: 'date',
                        description: 'Data de criação conta usuário.'
                    },
                    cpf: {
                        bsonType: 'string',
                        pattern: "^[0-9]{11}$",
                        description: 'Registro de CPF do usuário.'
                    },
                    telefone: {
                        bsonType: 'string',
                        minLength: 10,
                        description: 'Número de telefone do usuário.'
                    },
                    endereco: {
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
                    }
                }
            }
        }
    }
);

console.log(colecaoContas);