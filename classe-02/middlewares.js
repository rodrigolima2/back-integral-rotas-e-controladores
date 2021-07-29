function validarSenha(req, res, next) {
    const senha = req.query.senha;

    if (senha !== 'cubos123') {
        res.status(401);
        res.json({ mensagem: 'Senha incorreta' });
    } else {
        next();
    }
}

module.exports = { validarSenha };