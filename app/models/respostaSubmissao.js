module.exports = function(sequelize, DataTypes){
	
	const RespostaSubmissoes = sequelize.define('RespostaSubmissoes', {
		resposta_texto: DataTypes.STRING,
		resposta_radio: DataTypes.STRING,

		usuarioId:DataTypes.INTEGER
	});
	
	RespostaSubmissoes.associate = function(models){
		RespostaSubmissoes.belongsTo(models.PerguntaTrilhas, {foreignKey: 'perguntasId', as: 'Perguntas'});
		RespostaSubmissoes.belongsTo(models.Submissoes, {foreignKey: 'submissaoId', as: 'submissao'});
		RespostaSubmissoes.belongsTo(models.Inscritos, {foreignKey: 'inscritoId', as: 'inscrito'});
	}

	return RespostaSubmissoes;
}