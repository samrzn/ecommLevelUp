import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
    {
        _id: { type: String, auto: false },
        bairro: { type: String, required: true },
        rua: { type: String, required: true },
        numero: { type: String, required: true },
        complemento: { type: String },
        cidade: { type: String, required: true },
        cep: { type: String, required: true },
        uf: { type: String, required: true }
    },
    {
        versionKey: false
    },
);

const accountSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        senha: { type: String, required: true },
        dataCriacao: { type: Date, required: true },
        cpf: { type: String, required: true },
        telefone: { type: String, required: true },
        endereco: { type: addressSchema, required: true }
    },
    {
        versionKey: false
    },
);

const Accounts = mongoose.model('accounts', accountSchema);

export default Accounts;