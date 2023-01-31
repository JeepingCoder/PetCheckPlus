const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Record extends Model { }

Record.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    chip_number: {
      type: DataTypes.STRING,
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
    animal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pets',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'records',
  }
);

module.exports = Record;