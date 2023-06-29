import express from 'express';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import dbConnect from './config/dbConnection.js';
import routes from './routes/index.js';

dbConnect.on('error', console.log.bind(console, 'Erro de conexão.'));
dbConnect.once('open', () => {
    console.log('Conexão ao banco de dados realizada com sucesso.');
});

const app = express();
app.use(express.json());

const file = fs.readFileSync('./swagger/ecomm.YAML', 'utf-8');
const swaggerDocument = YAML.parse(file);

routes(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;