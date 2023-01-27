const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Record extends Model {}

Record.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      references: {
        model: 'pet',
        key: 'id',
      },
    },
    chip_id: {
      type: DataTypes.INTEGER,
    },
    birth_date: {
      type: DataTypes.DATE,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    vaccinations: {
      type: DataTypes.STRING,
    },
    sterilized: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'record',
  }
);

module.exports = Record;