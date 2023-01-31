const User = require('./User');
const Pets = require('./Pets');
const Record = require('./Record');

User.hasMany(Pets, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pets.belongsTo(User, {
  foreignKey: 'user_id'
});

Pets.hasMany(Record, {
  foreignKey: "pets_id",
  onDelete: 'CASCADE'
});

Record.belongsTo(Pets, {
  foreignKey: "pets_id",
});

module.exports = { User, Pets, Record };
