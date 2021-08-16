'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Certificados', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		codigo: {
			allowNull: false,
			type: Sequelize.STRING
		},
		inscritoId: {
			type: Sequelize.INTEGER,
			references: { model: 'Inscritos', key: 'id'}
		},
		modeloId: {
			type: Sequelize.INTEGER,
			references: { model: 'CertificadoConfiguracoes', key: 'id'}
		},
		trilhaId: {
			type: Sequelize.INTEGER,
			references: { model: 'Trilhas', key: 'id'}
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
     querreturnyInterface.dropTable('Certificados');
  }
};
