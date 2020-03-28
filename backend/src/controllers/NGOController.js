const connection = require('../database/connection');
const crypto = require('crypto');

// Each of these functions will be used for a respective route on routes.
// This is the abstraction of the implementation of the routes.
module.exports = {
  async index(request, response) { // "index" is the default name for the list method.
    const ngos = await connection('ngos').select('*');
  
    return response.json(ngos);
  },
  async create(request, response) {
    const { name, email, whatsapp, city, state_abreviation } = request.body;
  
    const id = crypto.randomBytes(4).toString('HEX');
  
    await connection('ngos').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      state_abreviation
    });
  
    return response.json({ id });
  }
};