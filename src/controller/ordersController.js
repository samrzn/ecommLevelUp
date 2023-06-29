import Orders from '../model/order.js';
import { validateOrder } from './validationSchema/validation.js';

class orderController {

    static createOrder = async (req, res) => {
        try {
            await validateOrder(req.body);
            const order = new Orders(req.body);
            await order.save();
            res.status(201).json(order);
        } catch (err) {
            res.status(400).send({ errorMessage: err.message });
        }
    };

    static findOrderById = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await Orders.findById({ _id: id });
            res.status(200).json(response);
        } catch {
            res.status(404).send('Nenhum pedido encontrado com o ID informado.');
        }
    };
}

export default orderController;