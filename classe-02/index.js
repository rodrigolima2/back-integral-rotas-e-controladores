const express = require('express');
const app = express();
const routes = require('./routes');
const middlewares = require('./middlewares');

app.use(express.json());
app.use(middlewares.validarSenha);
app.use(routes);

app.listen(8000);