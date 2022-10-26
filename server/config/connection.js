const {connect, connection} = require('mongoose');

const connectionString = process.env.MONGODV_URI || 'mongodb://localhost:27017/todo-react-DB';

connect(connectionSring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;