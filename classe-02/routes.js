const express = require('express');
const routes = express();
const controller = require('./controllers/controller');

routes.get('/alunos', controller.consultar);
routes.get('/alunos/:id', controller.consultarPorId);
routes.post('/alunos', controller.novoAluno);
routes.delete('/alunos/:id', controller.deletarAluno);

module.exports = routes;