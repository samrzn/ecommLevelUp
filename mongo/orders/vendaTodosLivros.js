use('ecomm');

const vendaLivros = db.products.updateMany(
    {
        categoria: 'LIVROS'
    },
    {
        $set: { estoque: 0 }
    }
);

console.log(vendaLivros);