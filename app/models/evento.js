'use strict';

module.exports = function(sequelize, DataTypes){
	
	const Eventos = sequelize.define('Eventos', {
		nome: DataTypes.STRING,
		url: DataTypes.STRING,
		instituicao: DataTypes.STRING,
		maximo_inscritos: DataTypes.INTEGER,
		sigla: DataTypes.STRING,
		virtual: DataTypes.BOOLEAN,
		descricao: DataTypes.TEXT,
		submissao: DataTypes.BOOLEAN,
		inicio_evento: DataTypes.DATE,
		fim_evento: DataTypes.DATE,
		inicio_submissao: DataTypes.DATE,
		fim_submissao: DataTypes.DATE,
		inicio_revisao: DataTypes.DATE,
		fim_revisao: DataTypes.DATE,
		pago: DataTypes.BOOLEAN,
		valor_inscricao: DataTypes.FLOAT,
		max_ativ_inscrito: DataTypes.INTEGER
	});
	
	Eventos.associate = function(models){
		Eventos.hasMany(models.Trilhas, {as: 'trilhas', onDelete: 'CASCADE'});
		Eventos.hasMany(models.Submissoes, {as: 'submissoes', onDelete: 'CASCADE'});
		Eventos.belongsToMany(models.Inscritos, {through: 'inscritoEventos', as: 'inscritos', foreignKey: 'inscritoId'});
		Eventos.hasMany(models.EventoParticipacoes, {as: 'participacoes', onDelete: 'CASCADE'});
	}
	
	return Eventos;
	
}