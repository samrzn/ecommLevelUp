use('ecomm');

const pedidosInseridos = db.orders.insertMany([
    {
        dataPedido: new Date(),
        account: {
            accountId: ObjectId('648ca6ed5a382dc9876762db'),
            nomeCliente: 'Bryan Thomas Ribeiro',
        },
        enderecoEntrega: {
            bairro: 'Setor Sul II',
            rua: 'Quadra Quadra F',
            numero: '862',
            complemento: 'Apartamento 202',
            cep: '72801890',
            cidade: 'Luziânia',
            uf: 'GO'
        },
        itensPedido: [
            {
                productId: ObjectId('647f43c75219c037a4952ebc'),
                quantidade: 3,
                precoUnitario: 1889.00,
            },
            {
                productId: ObjectId('647f43c75219c037a4952ebb'),
                quantidade: 2,
                desconto: 450.50,
                precoUnitario: 9176.00,
            },
        ],
    },
    {
        dataPedido: new Date(),
        account: {
            accountId: ObjectId('648ca6ed5a382dc9876762dd'),
            nomeCliente: 'Cauê Pinto',
        },
        enderecoEntrega: {
            bairro: 'Barreirinha',
            rua: 'Rua André Klug',
            numero: '935',
            complemento: 'Casa amarela',
            cep: '82700130',
            cidade: 'Curitiba',
            uf: 'PR'
        },
        itensPedido: [
            {
                productId: ObjectId('647f43c75219c037a4952ebf'),
                quantidade: 1,
                precoUnitario: 95.17,
            },
            {
                productId: ObjectId('647f43c75219c037a4952ec0'),
                quantidade: 2,
                precoUnitario: 8549.10,
            },
        ],
    }
]);

console.log(pedidosInseridos);