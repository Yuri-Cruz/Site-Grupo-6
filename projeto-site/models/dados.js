'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Dados = sequelize.define('dados',{	
		id: {
			field: 'idDados',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		temperatura: {
			field: 'lumens',
			type: DataTypes.REAL,
			allowNull: false
		},
		umidade: {
			field: 'fkSensor',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		momento: {
			field: 'momento',
			type: DataTypes.DATE, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
		momento_grafico: {
			type: DataTypes.VIRTUAL, // campo 'falso' (não existe na tabela). Deverá ser preenchido 'manualmente' no select
			allowNull: true
		}
	}, 
	{
		tableName: 'dados', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Dados;
};
