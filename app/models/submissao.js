'use strict';

module.exports = function(sequelize, DataTypes){
	const Submissoes = sequelize.define('Submissoes', {
		titulo: DataTypes.STRING,
		texto: DataTypes.TEXT,
		palavra_chave: DataTypes.STRING,
		autores: DataTypes.STRING,
		cpf_orientador: DataTypes.BIGINT,
		mensagem_apoio: DataTypes.TEXT,
		tipo_apresentacao: DataTypes.STRING,
		status_aprovacao: DataTypes.INTEGER,
		area_conhecimento: DataTypes.STRING,
		feedback: DataTypes.TEXT
	});
	
	Submissoes.associate = function(models){
		Submissoes.belongsTo(models.Inscritos, {foreignKey: 'inscritoId', as: 'inscrito'});
		Submissoes.belongsTo(models.Eventos, {foreignKey: 'eventoId', as: 'evento'});
		Submissoes.belongsTo(models.Trilhas, {foreignKey: 'trilhaId', as: 'trilha'});
		Submissoes.hasMany(models.RespostaSubmissoes, {as: 'respostas', onDelete: 'CASCADE'});
	}

	return Submissoes;
}