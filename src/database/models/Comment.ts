import { DataTypes } from "sequelize";
import sq from ".."

export default sq.define('Comment', {
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
  }
});