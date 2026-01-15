import Accounts from '../model/account.js';
import { validateAccount } from './validationSchema/validation.js';

class accountController {

    static createUser = async (req, res) => {
        try {
            validateAccount(req.body);
            const account = new Accounts(req.body);
            await account.save();
            res.status(201).json(account);
        } catch (err) {
            res.status(400).send({ errorMessage: err.message });
        }
    };

    static findUsers = async (_req, res) => {
        const response = await Accounts.find();
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).send('Nenhum usuário encontrado.');
        }
    };

    static findUserById = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await Accounts.findById({ _id: id });
            console.log(response);
            res.status(200).json(response);
        } catch {
            res.status(404).send('Nenhum usuário encontrado com o ID informado.');
        }
    };

    static updateUser = async (req, res) => {
        const { id } = req.params;
        try {
            validateAccount(req.body);
            try {
                await Accounts.findByIdAndUpdate({ _id: id }, req.body);
                res.status(200).send('Usuário atualizado com sucesso.');
            } catch {
                res.status(404).send('Usuário não encontrado.');
            }
        } catch (err) {
            res.status(400).send({ errorMessage: err.message });
        }
    };

    static deleteUser = async (req, res) => {
        const { id } = req.params;
        try {
            await Accounts.findByIdAndDelete({ _id: id });
            res.status(200).send('Usuário removido com sucesso.');
        } catch {
            res.status(404).send('Usuário não encontrado.');
        }
    };
}

export default accountController;