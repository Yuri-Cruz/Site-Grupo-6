module.exports = (sequelize, DataTypes) => {
    let Empresa = sequelize.define('empresa',{
		cnpj: {
			field: 'cnpj',
			type: DataTypes.UUID,
			primaryKey: true,
			autoIncrement: false
		},		
		nomeEmpresa: {
			field: 'nomeEmpresa',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefonePrincipal: {
			field: 'telefonePrincipal',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefoneSecundario: {
			field: 'telefoneSecundario',
			type: DataTypes.STRING,
			allowNull: true
		},
		plano: {
			field: 'plano',
			type: DataTypes.STRING,
			allowNull: true
		},
	}, 
	{
		tableName: 'empresa', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});
    return Empresa;
};