use('ecomm');

const produtosCategorias = db.products.find({
    $or: [
        { categoria: 'LIVROS' },
        { categoria: 'CELULARES' }
    ]
});

console.log(produtosCategorias);