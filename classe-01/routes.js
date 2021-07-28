const express = require('express');
const routes = express();
const controller = require('./controllers/controller');

routes.get('/imoveis', controller.consultar);

module.exports = routes;