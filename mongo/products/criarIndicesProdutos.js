use('ecomm');

const nomeIndice = db.products.createIndex({ nome: 1 });
const descricaoIndice = db.products.createIndex({ descricao: 1 });
const precoIndice = db.products.createIndex({ preco_unitario: 1 });
const categoriaIndice = db.products.createIndex({ categoria: 1 });

console.log(nomeIndice);
console.log(descricaoIndice);
console.log(precoIndice);
console.log(categoriaIndice);