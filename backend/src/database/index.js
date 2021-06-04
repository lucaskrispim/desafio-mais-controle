const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
/*
const User = require('../models/User');
const Position = require('../models/Position');
const Truck = require('../models/Truck');
*/
const Obra = require('../models/obra');
const Despesa = require('../models/despesa');

const connection = new Sequelize(dbConfig);
/*
User.init(connection);
Position.init(connection);
Truck.init(connection);

Position.associate(connection.models);
*/

Obra.init(connection);
Despesa.init(connection);
//Obra.associate(connection.models);


(async () => {
  try {
    await connection.authenticate();
    // eslint-disable-next-line no-console
    console.log('Database connection has been established successfully.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Unable to connect to the database: ${err}`);
  }
})();

module.exports = {connection};