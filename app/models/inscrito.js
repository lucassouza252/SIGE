module.exports = function(sequelize, DataTypes){
	
	const Inscritos = sequelize.define('Inscritos', {
		nome: DataTypes.STRING,
		cpf: DataTypes.BIGINT,
		email: DataTypes.STRING,
		senha: DataTypes.STRING,
		deficiencia: DataTypes.BOOLEAN,
		tipo_deficiencia: DataTypes.STRING,
		papel: DataTypes.INTEGER,
		jwt: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	});
	
	Inscritos.associate = function(models){
		Inscritos.belongsToMany(models.Eventos, {through: 'inscritoEventos', as: 'eventos', foreignKey: 'eventoId'});
		Inscritos.hasMany(models.Submissoes, {as: 'submissoes', onDelete: 'CASCADE'});
		Inscritos.hasMany(models.RespostaSubmissoes, {as: 'respostas_submissoes', onDelete: 'CASCADE'});
		Inscritos.hasMany(models.EventoParticipacoes, {as: 'participacoes', onDelete: 'CASCADE'});
		Inscritos.hasMany(models.Certificados, {as: 'certificados', onDelete: 'CASCADE'});
	}
	
	return Inscritos;
	
}

