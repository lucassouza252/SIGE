'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('RespostaSubmissoes', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		resposta_texto: {
			allowNull: true,
			type: Sequelize.TEXT
		},
		resposta_radio: {
			allowNull: true,
			type: Sequelize.STRING
		},
		submissaoId: {
			type: Sequelize.INTEGER,
			references: { model: 'Submissoes', key: 'id' }
		},
		perguntasId: {
			type: Sequelize.INTEGER,
			references: { model: 'PerguntaTrilhas', key: 'id' }
		},
		inscritoId: {
			type: Sequelize.INTEGER,
			references: { model: 'Inscritos', key: 'id'}
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
    return queryInterface.dropTable('RespostaSubmissoes');
  }
};
