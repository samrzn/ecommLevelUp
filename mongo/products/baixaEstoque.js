use('ecomm');

const baixaEstoque = db.products.updateOne(
    { nome: 'Galaxy Tab S8' },
    { $inc: { estoque: -2 } }
);

console.log(baixaEstoque);