require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const sequelize = require('sequelize');

console.log('DB_DIALECT:', process.env.DB_DIALECT);

const connection = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT
  }
);

connection.authenticate()
  .then(() => {
    console.log(`Conectado ao mysql`);
    })
  .catch(err => {
    console.log(`Erro ao conectar | err | ${err}`);
  });

module.exports = { connection, sequelize };