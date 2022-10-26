import db from ('./connection');
import { User } from ('../models');

db.once('open', async () => {
    await User.deleteMany();
    await User.create(
        {
            email: 'todo@mustdo.com',
            password: 'password',
            profile: {
                firstName: 'Phil',
                lastName: 'Besse',
                age: 34,
                location: 'Massachuseetts',
                gender: 'man'
            }
        }
    );
});