'use strict';

module.exports = function(sequelize, DataTypes){
	
	const PerguntaTrilhas = sequelize.define('PerguntaTrilhas', {
		pergunta: DataTypes.STRING,
		opcaoPergunta: DataTypes.BOOLEAN, // True = Text, False = Binary
		campoUm: DataTypes.STRING,
		campoDois: DataTypes.STRING
	});
	
	PerguntaTrilhas.associate = function(model){
		PerguntaTrilhas.belongsTo(model.Trilhas, { foreignKey: 'trilhaId', as: 'trilha'});
		PerguntaTrilhas.hasOne(model.RespostaSubmissoes, {as: 'respostas', onDelete: 'CASCADE'});
	}
	
	return PerguntaTrilhas;
}