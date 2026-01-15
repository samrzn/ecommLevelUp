import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        status: { type: String, required: true }
    },
    {
        versionKey: false
    },
);

const Categories = mongoose.model('categories', categoriesSchema);

export default Categories;