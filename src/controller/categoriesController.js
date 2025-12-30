import Categories from '../model/category.js';
import { validateCategory } from './validationSchema/validation.js';

class categoryController {
    static findCategories = async (req, res) => {
        const response = await Categories.find();
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).send('Nenhuma categoria encontrada.');
        }
    };

    static findCategoriesById = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await Categories.findById({ _id: id });
            res.status(200).json(response);
        } catch {
            res.status(404).send('Nenhuma categoria com o ID informado foi encontrada.');
        }
    };

    static createCategory = async (req, res) => {
        try {
            validateCategory(req.body);
            const category = new Categories(req.body);
            await category.save();
            res.status(201).json(category);
        } catch (err) {
            res.status(400).send({ errorMessage: err.message });
        }
    };

    static updateCategory = async (req, res) => {
        const { id } = req.params;
        try {
            validateCategory(req.body);
            try {
                await Categories.findByIdAndUpdate({ _id: id }, { nome: req.body.nome });
                res.status(200).send('Categoria atualizada com sucesso.');
            } catch {
                res.status(404).send('Categoria não encontrada.');
            }
        } catch {
            res.status(400).send('Bad request!');
        }
    };

    static deleteCategory = async (req, res) => {
        const { id } = req.params;
        try {
            await Categories.findByIdAndDelete({ _id: id });
            res.status(200).send('Categoria removida com sucesso.');
        } catch {
            res.status(404).send('Categoria não encontrada.');
        }
    };

    static activeCategory = async (req, res) => {
        const { id } = req.params;
        try {
            await Categories.findByIdAndUpdate({ _id: id }, { status: 'ATIVA' });
            res.status(200).send('Categoria ativada com sucesso.');
        } catch {
            res.status(404).send('Categoria não encontrada.');
        }
    };
}

export default categoryController;