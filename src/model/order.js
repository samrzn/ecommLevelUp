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
        _id: { type: String, auto: false },
        accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'accounts', required: true },
        nomeCliente: { type: String, required: true }
    },
    {
        versionKey: false
    },
);

const itensSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
        quantidade: { type: Number, required: true },
        desconto: { type: Number },
        preco_unitario: { type: Number, required: true }
    },
    {
        versionKey: false
    },
);

const orderSchema = new mongoose.Schema(
    {
        dataPedido: { type: Date, required: true },
        account: { type: accountSchema, required: true },
        endereco: { type: addressSchema, required: true },
        itens: { type: [itensSchema], required: true }
    },
    {
        versionKey: false
    },
);

const Orders = mongoose.model('orders', orderSchema);

export default Orders;