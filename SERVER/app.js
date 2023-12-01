require('dotenv').config();
// require('./src/models');
const Server = require('./src/server');

const server = new Server();

server.listen();