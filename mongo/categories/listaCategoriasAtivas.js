use('ecomm');

const categories = db.categories.find({ status: "ATIVA" });

console.log(categories);