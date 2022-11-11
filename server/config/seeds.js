const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();
    await User.create(
        {
            email: 'todo@mustdo.com',
            password: 'password',
            username: 'todo',
            profile: {
                firstName: 'Phil',
                lastName: 'Besse',
                age: 34,
                location: 'Massachuseetts',
                gender: 'He/Him'
            }
        }
    );
    console.log("Seeds have been seeded");
    process.exit();
});