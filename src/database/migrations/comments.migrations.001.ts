import { DataTypes, QueryInterface } from "sequelize"

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Comments', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      filmId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Comments')
  }
}