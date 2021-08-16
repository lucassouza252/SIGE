'use strict';

module.exports = function(sequelize, DataTypes){
	
	const EventoParticipacoes = sequelize.define('EventoParticipacoes', {
		instituicao_inscrito: DataTypes.STRING,
		categoria: DataTypes.STRING,
		tipo_participante: DataTypes.STRING,
		numero_celular: DataTypes.INTEGER
	});
	
	EventoParticipacoes.associate = function(models){
		EventoParticipacoes.belongsTo(models.Inscritos, {foreignKey: 'inscritoId', as: 'inscrito'});
		EventoParticipacoes.belongsTo(models.Eventos, {foreignKey: 'eventoId', as: 'eventos'});
	}
	
	return EventoParticipacoes;
}