const {connect, connection} = require('mongoose');

const connectionString = process.env.MONGODV_URI || 'mongodb://localhost:27017/todo-react-DB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;