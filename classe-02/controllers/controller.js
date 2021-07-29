const alunos = require('../data/alunos');

function idValido(parms) {
    if (isNaN(Number(parms))) {
        return;
    } else {
        return Number(parms);
    }
}

function dadosPreenchidos(body) {
    if (body.nome) {
        if (body.sobrenome) {
            if (body.idade) {
                if (body.curso) {
                    return true;
                }
            }
        }
    }
    return false;
}

function stringComEspacos(body) {
    nome = true;
    sobrenome = true;
    curso = true;

    for (i = 0; i < body.nome.length; i++) {
        if (body.nome[i] !== " ") {
            nome = false;
            break;
        }
    }
    for (i = 0; i < body.sobrenome.length; i++) {
        if (body.sobrenome[i] !== " ") {
            sobrenome = false;
            break;
        }
    }
    for (i = 0; i < body.curso.length; i++) {
        if (body.curso[i] !== " ") {
            curso = false;
            break;
        }
    }

    if (nome || sobrenome || curso) {
        return true;
    } else {
        return false;
    }
}

function tipoDeDadosValidos(body) {
    if (typeof (body.nome) === 'string') {
        if (typeof (body.sobrenome) === 'string') {
            if (typeof (body.curso) === 'string') {
                if (typeof (body.idade) === 'number') {
                    return true;
                }
            }
        }
    }
    return false;
}

function consultar(req, res) {
    res.status(200);
    res.json(alunos);
}

function consultarPorId(req, res) {
    const id = idValido(req.params.id);

    if (!id) {
        res.status(400);
        res.json({ mensagem: "O Id deve ser um número válido" });
    } else {
        const aluno = alunos.find(x => x.id === id);

        if (!aluno) {
            res.status(404);
            res.json({ mensagem: "O aluno não foi encontrado" });
        } else {
            res.status(200);
            res.json(aluno);
        }
    }
}

function novoAluno(req, res) {
    const id = alunos.length + 1;

    if (!dadosPreenchidos(req.body)) {
        res.status(400);
        res.json({ mensagem: "Você deve inserir todos os dados." });
        return;
    }
    if (!tipoDeDadosValidos(req.body)) {
        res.status(400);
        res.json({ mensagem: "Os tipos de dados precisam estar corretos." });
        return;
    }
    if (stringComEspacos(req.body)) {
        res.status(400);
        res.json({ mensagem: "Você não pode preencher dados com apenas com espaços vazios." });
        return;
    }
    if (req.body.idade < 18) {
        res.status(400);
        res.json({ mensagem: "O aluno não pode ser menor de idade." });
        return;
    }

    console.log(req.body.curso.length);
    alunos.push({
        id: id,
        nome: req.body.nome.trim(),
        sobrenome: req.body.sobrenome.trim(),
        idade: req.body.idade,
        curso: req.body.curso.trim()
    });
    res.status(200);
    res.json({ mensagem: "Aluno adicionado" });
}

function deletarAluno(req, res) {
    const id = idValido(req.params.id);

    if (!id) {
        res.status(400);
        res.json({ mensagem: "O Id deve ser um número válido" });
    } else {
        const aluno = alunos.find(x => x.id === id);

        if (!aluno) {
            res.status(404);
            res.json({ mensagem: "O aluno a ser excluído não foi encontrado" });
        } else {
            res.status(200);
            res.json(aluno);
            alunos.splice(alunos.indexOf[aluno], 1);
        }
    }
}

module.exports = {
    consultar,
    consultarPorId,
    novoAluno,
    deletarAluno,
};