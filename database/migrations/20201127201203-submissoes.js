'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Submissoes', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		titulo: {
			allowNull: false,
			type: Sequelize.STRING
		},
		texto: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		palavra_chave: {
			type: Sequelize.STRING,
			allowNull: false
		},
		autores: {
			allowNull: false,
			type: Sequelize.STRING
		},
		cpf_orientador: {
			allowNull: false,
			type: Sequelize.INTEGER
		},
		mensagem_apoio: {
			allowNull: true,
			type: Sequelize.TEXT
		},
		tipo_apresentacao: {
			allowNull: true,
			type: Sequelize.STRING
		},
		status_aprovacao: {
			allowNull: true,
			type: Sequelize.INTEGER
		},
		area_conhecimento: {
			allowNull: false,
			type: Sequelize.STRING
		},
		feedback: {
			allowNull: true,
			type: Sequelize.TEXT
		},
		inscritoId: {
			type: Sequelize.INTEGER,
			references: { model: 'Inscritos', key: 'id' }
		},
		eventoId: {
			type: Sequelize.INTEGER,
			references: { model: 'Eventos', key: 'id' }
		},
		trilhaId: {
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
    return queryInterface.dropTable('Submissoes');
  }
};
