'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Inscritos', {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nome: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			cpf: {
				allowNull: false,
				type: Sequelize.BIGINT,
				unique: true
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},
			senha: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			deficiencia: {
				allowNull: true,
				type: Sequelize.BOOLEAN
			},
			tipo_deficiencia: {
				allowNull: true,
				type: Sequelize.STRING
			},
			papel: {
				allowNull: true,
				type: Sequelize.INTEGER
			},
			jwt: {
				allowNull: true,
				type: Sequelize.STRING
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
	return queryInterface.dropTable('Inscritos');
  }
};
