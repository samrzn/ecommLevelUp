use('ecomm');

const alteraConta = db.runCommand({
    collMod: 'accounts',
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
                    pattern: "^\S+@\S+\.[a-z]{2,3}+$",
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
                    pattern: "^(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})$",
                    description: 'Registro de CPF do usuário.'
                },
                telefone: {
                    bsonType: 'string',
                    minLength: 10,
                    pattern: "^(\d{2})\s(\d{4,5})\-(\d{4})$",
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
                            minLength: 1,
                            pattern: "^\d{1,5}|[S/N]$"
                        },
                        complemento: {
                            bsonType: 'string',
                        },
                        cep: {
                            bsonType: 'string',
                            pattern: "^(\d{5})\-(\d{3})$"
                        },
                        cidade: {
                            bsonType: 'string',
                            minLength: 5
                        },
                        uf: {
                            bsonType: 'string',
                            enum: [
                                'AC',
                                'AL',
                                'AM',
                                'AP',
                                'BA',
                                'CE',
                                'DF',
                                'ES',
                                'GO',
                                'MA',
                                'MG',
                                'MS',
                                'MT',
                                'PA',
                                'PB',
                                'PE',
                                'PI',
                                'PR',
                                'RJ',
                                'RN',
                                'RO',
                                'RR',
                                'RS',
                                'SC',
                                'SE',
                                'SP',
                                'TO'
                            ]
                        }
                    },
                    description: 'Endereço completo do usuário.'
                }
            }
        }
    }
});

console.log(alteraConta);