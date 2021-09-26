const sequelize = require('../config/connection');

const seedUsers = require('./user-seed');
const seedPost = require('./post-seed');
const seedComments = require('./comment-seed');

const seedAll = async () => {
    console.log('--------------');
    await sequelize.sync({ force: true });
    console.log('--------------');

    await seedUsers();
    console.log('--------------');

    await seedPost();
    console.log('--------------');

    await seedComments();
    console.log('--------------');

    process.exit(0);
};

seedAll();