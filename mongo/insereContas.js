use('ecomm');

const contasInseridas = db.accounts.insertMany([
    {
        nomeUsuario: 'Bryan Thomas Ribeiro',
        email: 'bryanthomasribeiro@mavex.com.br',
        senha: 'hFYiyMyYnx',
        dataCriacao: new Date(),
        cpf: '14676429088',
        telefone: '61997150988',
        endereco: {
            bairro: 'Setor Sul II',
            rua: 'Quadra Quadra F',
            numero: '862',
            complemento: 'Apartamento 202',
            cep: '72801890',
            cidade: 'Luziânia',
            uf: 'GO'
        }
    },
    {
        nomeUsuario: 'Augusto Ian das Neves',
        email: 'augusto-dasneves86@corpoclinica.com.br',
        senha: 'Jew4FTK2wf',
        dataCriacao: new Date(),
        cpf: '88345099190',
        telefone: '71999463229',
        endereco: {
            bairro: 'Federação',
            rua: '1ª Travessa Padre Domingos de Brito',
            numero: '44',
            complemento: '',
            cep: '40231185',
            cidade: 'Salvador',
            uf: 'BA'
        }
    },
    {
        nomeUsuario: 'Cauê Pinto',
        email: 'cauedavipinto@fingrs.com.br',
        senha: 'KnrjPqB4IJ',
        dataCriacao: new Date(),
        cpf: '58087093003',
        telefone: '4138980809',
        endereco: {
            bairro: 'Barreirinha',
            rua: 'Rua André Klug',
            numero: '935',
            complemento: 'Casa amarela',
            cep: '82700130',
            cidade: 'Curitiba',
            uf: 'PR'
        }
    }
]);

console.log(contasInseridas);