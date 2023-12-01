const { Sequelize } = require('sequelize');

const pass  = process.env.DB_PASS;
const user = process.env.DB_USER;
const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;

const sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${database}`);

const conectarDB = async() => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sequelize;