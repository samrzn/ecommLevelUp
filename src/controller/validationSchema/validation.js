import Categories from '../../model/category.js';
import Accounts from '../../model/account.js';
import Products from '../../model/product.js';

function validateCategory(body) {
    const regEx = /^(?![0-9])[\p{L}\d\s]{3,}$/u;
    if (!regEx.test(body.nome)) {
        throw new Error('Invalid argument: "nome".');
    }
}

async function categoryValidation(id) {
    try {
        await Categories.findById({ _id: id });
        return true;
    } catch {
        return false;
    }
}

async function accountValidation(id) {
    try {
        await Accounts.findById({ _id: id });
        return true;
    } catch {
        return false;
    }
}

async function validateProduct(id) {
    try {
        await Products.findById({ _id: id });
        return true;
    } catch {
        return false;
    }
}

async function productValidation(body) {
    const regExNome = /^(?![0-9])[\p{L}\d\s]{3,}$/u;
    const regExSlug = /^[a-zA-Z0-9-]+$/;
    if (!regExNome.test(body.nome)) {
        throw new Error('Invalid argument: "nome".');
    }
    if (!regExSlug.test(body.slug)) {
        throw new Error('Invalid argument: "slug" deve conter letras maiúsculas, minúsculas, números e/ou hífens.');
    }
    if (body.preco <= 0) {
        throw new Error('Invalid argument: "preço" deve ser maior que zero.');
    }
    if (body.estoque <= 0 || body.estoque >= 1000) {
        throw new Error('Invalid argument: "quantidade" em estoque obrigatoriamente de 1 a 9999.');
    }

    const id = body.categoria;
    const category = await categoryValidation(id);

    if (!category) {
        throw new Error('Invalid argument: "categoria" não encontrada.');
    }
}

function validateAddress(body) {
    const regExNum = /^\d|S\/N$/i;
    const regExCep = /^[0-9]{8}$/;
    const uf = [
        'AC',
        'AL',
        'AM',
        'AP',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MG',
        'MS',
        'MT',
        'PA',
        'PB',
        'PE',
        'PI',
        'PR',
        'RJ',
        'RN',
        'RO',
        'RR',
        'RS',
        'SC',
        'SE',
        'SP',
        'TO',
    ];

    if (body.endereco.bairro.length < 1) {
        throw new Error('Invalid argument: "bairro".');
    }
    if (body.endereco.rua.length < 1) {
        throw new Error('Invalid argument: "rua".');
    }
    if (!regExNum.test(body.endereco.numero)) {
        throw new Error('Invalid argument: "numero".');
    }
    if (!regExCep.test(body.endereco.cep)) {
        throw new Error('Invalid argument: "cep".');
    }
    if (body.endereco.cidade.length < 5) {
        throw new Error('Invalid argument: "cidade".');
    }
    if (!uf.includes(body.endereco.uf)) {
        throw new Error('Invalid argument: "uf".');
    }
}

function validateAccount(body) {
    const regExNome = /^(?![0-9])[\p{L}\d\s]{5,}$/u;
    const regExEmail = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    const regExCpfECel = /^[0-9]{11}$/;

    if (!regExNome.test(body.username)) {
        throw new Error('Invalid argument: "username".');
    }
    if (!regExEmail.test(body.email)) {
        throw new Error('Invalid argument: "email".');
    }
    if (body.senha.length < 5) {
        throw new Error('Invalid argument: "senha".');
    }
    if (!regExCpfECel.test(body.cpf)) {
        throw new Error('Invalid argument: "cpf".');
    }
    if (!regExCpfECel.test(body.telefone)) {
        throw new Error('Invalid argument: "telefone".');
    }
    validateAddress(body);
}

async function validateOrder(body) {
    const regExNome = /^(?![0-9])[\p{L}\d\s]{5,}$/u;
    const id = body.account.accountId;
    const user = await accountValidation(id);
    const size = body.itens.length;
    for (let i = 0; i < size; i += 1) {
        const idProduto = body.itens[i].productId;
        const product = await validateProduct(idProduto);
        if (!product) {
            throw new Error('Invalid argument: produto não encontrado.');
        }
        if (body.itens[i].quantidade < 1) {
            throw new Error('Invalid argument: "quantidade".');
        }
        if (body.itens[i].desconto <= 0) {
            throw new Error('Invalid argument: "desconto".');
        }
        if (body.itens[i].preco_unitario <= 0) {
            throw new Error('Invalid argument: "preço unitario".');
        }
    }

    if (!user) {
        throw new Error('Invalid argument: usuário não encontrado.');
    }
    if (!regExNome.test(body.account.nomeCliente)) {
        throw new Error('Invalid argument: "username".');
    }
    validateAddress(body);
}

export {
    validateCategory, productValidation, validateAccount, validateOrder,
};