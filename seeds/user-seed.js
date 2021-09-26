const { User } = require('../model');

const userData = [
    {
        username: 'MaziveVelocity',
        email: 'cayman.g@hotmail.com',
        password: 'password'
    },
    {
        username: 'Divided',
        email: 'divideds@email.com',
        password: 'password'
    },
    {
        username: 'Hunter88',
        email: 'huners@email.com',
        password: 'password'
    },
    {
        username: 'Trashman',
        email: 'trashys@email.com',
        password: 'password'
    }
]

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;