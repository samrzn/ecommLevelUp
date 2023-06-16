use('ecomm');

const result = db.categories.updateOne(
    { nome: 'ESPORTE' },
    { $set: { status: 'ATIVA' } }
);

console.log(result);