'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('TODO', 'PROGRESS', 'COMPLETE'),
        defaultValue: 'TODO',
        allowNull: false,
      },
      priority: {
        type: Sequelize.ENUM('HIGH', 'MODERATE', 'LOW'),
        defaultValue: 'LOW',
        allowNull: false,
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects', // Make sure the table name matches your `Project` model's table name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks');
  }
};
