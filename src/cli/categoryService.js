import fs from 'fs';

const url = 'http://localhost:3000/categories';

async function resposta(res) {
    const { status } = res;
    if (status === 200) {
        const json = await res.json();
        console.log(`Response status: ${status}\n`, json);
    } else if (status === 201) {
        const json = await response.json();
        console.log(`Categoria criada.\nResponse status: ${status}\n`, json);
    } else {
        console.log(`Response status: Erro - ${status}.`);
    }
}

class categoryService {
    static async readJSON(path) {
        try {
            const encoding = 'utf-8';
            const texto = await fs.promises.readFile(path, encoding);
            const json = JSON.parse(texto);
            return json;
        } catch (error) {
            console.log('Erro na leitura do arquivo.');
            return undefined;
        }
    }

    static async findCategories() {
        const response = await fetch(url);
        await resposta(response);
    }

    static async findCategoryById(id) {
        const response = await fetch(`${url}/${id}`);
        await resposta(response);
    }

    static async createCategory(categoria) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria),
        });

        await resposta(response);
    }

    static async updateCategory(id, update) {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        });

        await resposta(response);
    }

    static async deleteCategory(id) {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        await resposta(response);
    }
}

export default categoryService;