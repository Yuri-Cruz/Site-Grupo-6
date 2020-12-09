module.exports = (sequelize, DataTypes) => {
    let Filial = sequelize.define('filial',{
		idFilial: {
			field: 'idFilial',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		fkEndereco: {
			field: 'fkEndereco',
			type: DataTypes.UUID,
			allowNull: false
		},		
		fkEmpresa: {
			field: 'fkEmpresa',
            type: DataTypes.UUID,
            allowNull: false
		},
		numero: {
			field: 'numero',
			type: DataTypes.BIGINT,
			allowNull: false
		},
		complemento: {
			field: 'complemento',
			type: DataTypes.STRING,
			allowNull: true
		},
	}, 
	{
		tableName: 'filial', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});
    return Filial;
};