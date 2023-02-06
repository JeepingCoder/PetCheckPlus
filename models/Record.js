const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Record extends Model { }

Record.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    chip_number: {
      type: DataTypes.STRING,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
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
    pets_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "pets",
        key: "id",
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