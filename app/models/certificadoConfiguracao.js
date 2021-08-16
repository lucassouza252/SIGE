'use strict';

module.exports = function(sequelize, DataTypes){
	
	const CertificadoConfiguracoes = sequelize.define('CertificadoConfiguracoes', {
		nome_modelo: DataTypes.STRING
	});
	
	CertificadoConfiguracoes.associate = function(models){
		CertificadoConfiguracoes.belongsTo(models.Eventos, {foreignKey: 'eventoId', as: 'evento'});
		CertificadoConfiguracoes.hasMany(models.Certificados, {as: 'certificados', onDelete: 'CASCADE'});
	}
	
	return CertificadoConfiguracoes;
}