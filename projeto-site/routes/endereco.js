var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Endereco = require('../models').endereco;

router.post('/criaEndereco', function(req, res, next) {
	console.log('Criando um usuário');

	Endereco.create({
		cep: req.body.cep,
		logradouro: req.body.logradouro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        bairro: req.body.bairro
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;