'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PerguntaTrilhas', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		pergunta: {allowNull: true,
			type: Sequelize.STRING,
			allowNull: true
		},
		campoUm: {
			allowNull: true,
			type: Sequelize.STRING,
			allowNull: true
		},
		campoDois: {
			allowNull: true,
			type: Sequelize.STRING,
			allowNull: true
		},
		opcaoPergunta: {
			allowNull: true,
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
		trilhaId: {
			allowNull: true,
			type: Sequelize.INTEGER,
			references: { model: 'Trilhas', key: 'id' }
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
    return queryInterface.dropTable('PerguntaTrilhas');
  }
};
