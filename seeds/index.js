const sequelize = require('../config/connection');
const { User, Pet, Record } = require('../models');

const userData = require('./userData.json');
const petData = require('./petData.json');
const recordData = require('./recordData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const pet of petData) {
    await Pet.create({
      ...pet,
    });
  }

  for (const record of recordData) {
    await Record.create({
      ...record,
    });
  }

  process.exit(0);
};

seedDatabase();
