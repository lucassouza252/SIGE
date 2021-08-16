'use strict';

module.exports = function(sequelize, DataTypes){
	
	const Trilhas = sequelize.define('Trilhas', {
		nome: DataTypes.STRING
	});
	
	Trilhas.associate = function(models){
		Trilhas.belongsTo(models.Eventos, {foreignKey: 'eventoId', as: 'evento'});
		Trilhas.hasMany(models.PerguntaTrilhas, {as: 'perguntas_extras', onDelete: 'CASCADE'});
		Trilhas.hasMany(models.Submissoes, {as: 'trilha_submissoes', onDelete: 'CASCADE'});
		Trilhas.hasMany(models.Certificados, {as: 'certificado', onDelete: 'CASCADE'});
	}
	
	return Trilhas;
}