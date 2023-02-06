const User = require('./User');
const Pet = require('./Pet');
const Record = require('./Record');
const Image = require('./image');

User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id'
});

Pet.hasOne(Record, {
  foreignKey: 'animal_id',
  onDelete: 'CASCADE'
});

Record.belongsTo(Pet, {
  foreignKey: 'animal_id'
});

Pet.hasOne(Image, {
  foreignKey: 'pet_id'
});

Image.hasOne(Pet, {
  foreignKey: 'pet_id',
});



module.exports = { User, Pet, Record, Image };
