import Products from '../model/product.js';
import { productValidation } from './validationSchema/validation.js';

class productController {

    static createProduct = async (req, res) => {
        try {
            await productValidation(req.body);
            const product = new Products(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (err) {
            res.status(400).send({ errorMessage: err.message });
        }
    };

    static findProducts = async (_req, res) => {
        const response = await Products.find();
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).send('Nenhum produto encontrado.');
        }
    };

    static findProductById = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await Products.findById({ _id: id });
            res.status(200).json(response);
        } catch {
            res.status(404).send('Nenhum produto encontrado com o ID informado.');
        }
    };

    static updateProduct = async (req, res) => {
        const { id } = req.params;
        try {
            await productValidation(req.body);
            try {
                await Products.findByIdAndUpdate({ _id: id }, req.body);
                res.status(200).send('Produto atualizado com sucesso.');
            } catch {
                res.status(404).send('Produto não encontrado.');
            }
        } catch (err) {
            res.status(400).send({ errorMessage: err.message });
        }
    };

    static deleteProduct = async (req, res) => {
        const { id } = req.params;
        try {
            await Products.findByIdAndDelete({ _id: id });
            res.status(200).send('Produto removido com sucesso.');
        } catch {
            res.status(404).send('Produto não encontrado.');
        }
    };
}

export default productController;