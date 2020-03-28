const knex = require('knex');
const config = require('../../knexfile');

// Performing a knex connection using "development" properties from the knexfile.js
const connection = knex(config.development);

module.exports = connection;