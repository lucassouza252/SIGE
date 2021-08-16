'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
	return queryInterface.createTable('Eventos', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		nome: {
			allowNull: false,
			type: Sequelize.STRING
		},
		url: {
			allowNull: true,
			type: Sequelize.STRING
		},
		instituicao: {
			allowNull: false,
			type: Sequelize.STRING
		},
		maximo_inscritos: {
			allowNull: false,
			type: Sequelize.INTEGER
		},
		sigla: {
			allowNull: false,
			type: Sequelize.STRING
		},
		virtual: {
			allowNull: false,
			type: Sequelize.BOOLEAN
		},
		descricao: {
			allowNull: false,
			type:Sequelize.TEXT 
		},
		submissao: {
			allowNull: true,
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		inicio_evento: {
			allowNull: false,
			type:Sequelize.DATE 
		},
		fim_evento: {
			allowNull: false,
			type:Sequelize.DATE 
		},
		inicio_submissao: {
			allowNull: true,
			type:Sequelize.DATE 
		},
		fim_submissao: {
			allowNull: true,
			type:Sequelize.DATE 
		},
		inicio_revisao: {
			allowNull: true,
			type:Sequelize.DATE 
		},
		fim_revisao: {
			allowNull: true,
			type:Sequelize.DATE 
		},
		pago: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		valor_inscricao: {
			allowNull: true,
			type:Sequelize.FLOAT 
		},
		max_ativ_inscrito: {
			allowNull: true,
			type: Sequelize.INTEGER
		},
		createdAt: {
			allowNull: true,
			type: Sequelize.DATE,
			defaultValue: new Date()
		},
		updatedAt: {
			allowNull: true,
			type: Sequelize.DATE,
			defaultValue: new Date()
      }
	});
  },

  down: async (queryInterface, Sequelize) => {
	return queryInterface.dropTable('Eventos');
  }
};
