var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Dados = require('../models').Dados;

/* Recuperar as últimas N leituras */
router.get('/ultimas/:fkSensor', function (req, res, next) {

	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;
	const { fkSensor } = req.params
	console.log(`Recuperando as últimas ${limite_linhas} leituras`);

	let instrucaoSql = `select top ${limite_linhas} lumens, momento,FORMAT(momento,'HH:mm:ss') as momento_grafico from dados where fkSensor = ${fkSensor} order by idDados desc`;

	sequelize.query(instrucaoSql, {
			model: Dados,
			mapToModel: true
		})
		.then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});


// tempo real (último valor de cada leitura)
router.get('/tempo-real/:fkSensor', function (req, res, next) {

	console.log(`Recuperando a última leitura`);
	const { fkSensor } = req.params
	console.log(fkSensor);
	let instrucaoSql = `select top 1 lumens, FORMAT(momento,'HH:mm:ss') as momento_grafico  
	from dados where fkSensor = ${fkSensor} order by idDados desc`;

	sequelize.query(instrucaoSql, {
			type: sequelize.QueryTypes.SELECT
		})
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});


// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas', function (req, res, next) {

	console.log(`Recuperando as estatísticas atuais`);

	let instrucaoSql = `select 
							max(lumens) as lumens_maxima, 
							min(lumens) as lumens_minima, 
							avg(lumens) as lumens_media,
						from dados`;

	sequelize.query(instrucaoSql, {
			type: sequelize.QueryTypes.SELECT
		})
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});


module.exports = router;