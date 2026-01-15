import categoryService from './categoryService.js';

const args = process.argv;

async function processarComando(path) {
    const id = path[3];
    const arquivo = path[3];
    const atualiza = path[4];
    const categoria = '';
    switch (path[2]) {
        case '--listarCategorias':
            await categoryService.findCategories();
            break;
        case '--recuperarCategoriaPorId':
            await categoryService.findCategoryById(id);
            break;
        case '--inserirCategoria':
            if (await categoryService.readJSON(arquivo) === undefined) {
                break;
            } else {
                await categoryService.createCategory(categoria);
                break;
            }
        case '--atualizarCategoria':
            if (await categoryService.readJSON(atualiza) === undefined) {
                break;
            } else {
                await categoryService.updateCategory(id, update);
                break;
            }
        case '--excluirCategoria':
            await categoryService.deleteCategory(id);
            break;
        default:
            console.log(`${path[2]} não encontrado`);
    }
}

processarComando(args);

// comando para rodar o server (arquivo db.json) via terminal 'npx json-server --watch src/cli/db.json'

// comando 'npm install express' no diretório do projeto para instalar o Express
