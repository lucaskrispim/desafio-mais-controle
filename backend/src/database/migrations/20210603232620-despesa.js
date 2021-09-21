'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('despesa', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      obra_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'obra', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('despesa');

  }
};
