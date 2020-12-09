module.exports = (sequelize, DataTypes) => {
    let Endereco = sequelize.define('endereco',{
		cep: {
			field: 'cep',
			type: DataTypes.UUID,
			primaryKey: true,
			autoIncrement: false
		},		
		logradouro: {
			field: 'logradouro',
			type: DataTypes.STRING,
			allowNull: false
		},
		cidade: {
			field: 'cidade',
			type: DataTypes.STRING,
			allowNull: false
		},
		estado: {
			field: 'estado',
			type: DataTypes.STRING,
			allowNull: false
        },
        bairro: {
			field: 'bairro',
			type: DataTypes.STRING,
			allowNull: false
		},
	}, 
	{
		tableName: 'endereco', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});
    return Endereco;
};