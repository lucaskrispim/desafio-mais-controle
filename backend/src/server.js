const express = require('express');
const cors = require('cors');
const routes = require('./routes/controllers');
//const databaseService = require('./services/database');
const bodyParser = require('body-parser');

require('./database/index');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // parser de mensagens (JSON)

app.use(express.json());
app.use('/api', routes); // porta de entrada para a api (localhost://porta/api ...)

const server = require('http').createServer(app) // Cria o servidor
server.listen(3333);