const db = require('./connection');
const { User, ToDo } = require('../models');

db.once('open', async () => {
    await User.deleteMany();
    await ToDo.deleteMany();
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
    await ToDo.create(
        {
            todoText: 'do this first',
            username: 'todo',
            createdAt: ''
        },
        {
            todoText: 'do this second',
            username: 'todo',
            createdAt: ''
        }
    );
    console.log("Seeds have been seeded");
    process.exit();
});