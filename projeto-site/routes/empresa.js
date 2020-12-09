var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Empresa = require('../models').empresa;

router.post('/criaEmpresa', function(req, res, next) {
	console.log('Criando um usuário');

	Empresa.create({
		cnpj : req.body.cnpj,
		nomeEmpresa: req.body.nomeEmpresa,
        telefonePrincipal: req.body.telefonePrincipal,
		telefoneSecundario: req.body.telefoneSecundario,
		plano: req.body.plano
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;