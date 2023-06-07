use('ecomm');

const produtosPorPreco = db.products.find({
    $and: [
        { preco_unitario: { $gte: 1000 } },
        { preco_unitario: { $lte: 2000 } }
    ]
},
    { nome: 1, preco_unitario: 1 }
);

console.log(produtosPorPreco);