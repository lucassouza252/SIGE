'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventoParticipacoes', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		instituicao_inscrito: {
			allowNull: false,
			type: Sequelize.STRING
		},
		categoria: {
			allowNull: false,
			type: Sequelize.STRING
		},
		tipo_participante: {
			allowNull: false,
			type: Sequelize.STRING
		},
		numero_celular: {
			allowNull: false,
			type: Sequelize.INTEGER
		},
		inscritoId: {
			type: Sequelize.INTEGER,
			references: { model: 'Inscritos', key: 'id' }
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
    return queryInterface.dropTable('EventoParticipacoes');
  }
};
