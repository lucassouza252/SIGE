'use strict';

module.exports = function(sequelize, DataTypes){
	
	const Certificados = sequelize.define('Certificados', {
		codigo: DataTypes.STRING,
	});
	
	Certificados.associate = function(models){
		Certificados.belongsTo(models.Inscritos, {foreignKey: 'inscritoId', as: 'inscrito'});
		Certificados.belongsTo(models.Trilhas, {foreignKey: 'trilhaId', as: 'trilha'});
		Certificados.belongsTo(models.CertificadoConfiguracoes, {foreignKey: 'modeloId', as: 'modelo'});
	}
	
	return Certificados;
}