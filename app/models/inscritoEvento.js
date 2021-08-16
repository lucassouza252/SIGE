'use strict';

module.exports = function(sequelize, DataTypes){
	
	const InscritoEventos = sequelize.define('InscritoEventos', {
		inscritoId: DataTypes.INTEGER,
		eventoId: DataTypes.INTEGER
	});
	
	InscritoEventos.associate = function(models){
		InscritoEventos.belongsTo(models.Inscritos, {foreingKey: 'inscritoId'});
		InscritoEventos.belongsTo(models.Eventos, {foreignKey: 'eventoId'});
	}
		
	return InscritoEventos;
}