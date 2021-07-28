const imoveis = require('../data/imoveis');

function validarQuery(query) {
    if (isNaN(Number(query))) {
        return;
    } else {
        return Number(query);
    }
}

function consultar(req, res) {
    const queryId = validarQuery(req.query.id);

    if (queryId) {
        const imovel = imoveis.find(x => x.id === queryId);
        if (imovel) {
            res.json(imovel);
        } else {
            res.status(400);
            res.json({ mensagem: "O imóvel pesquisado não existe." });
        }
    } else {
        res.json(imoveis);
    }
}

module.exports = { consultar };