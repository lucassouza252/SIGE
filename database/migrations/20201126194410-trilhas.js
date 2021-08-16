'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trilhas', {
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
		eventoId: {
			type: Sequelize.INTEGER,
			references: { model: 'Eventos', key: 'id' }
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
	return queryInterface.dropTable('Trilhas');
  }
};
