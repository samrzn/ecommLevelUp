import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        descricao: { type: String, required: true },
        slug: { tybe: String },
        estoque: { type: Number },
        preco_unitario: { tybe: Number },
        categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true }
    },
    {
        versionKey: false
    },
);

const Products = mongoose.model('products', productSchema);

export default Products;