var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Filial = require('../models').filial;

router.post('/criaFilial', function(req, res, next) {
	console.log('Criando um usuário');

	Filial.create({
		fkEndereco: req.body.cep,
		fkEmpresa: req.body.cnpj,
        numero: req.body.numero,
        complemento: req.body.complemento
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;