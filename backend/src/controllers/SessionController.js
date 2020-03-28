const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ngo = await connection('ngos').select('name').where('id', id).first();

    if(!ngo) {
      return response.status(400).json({ error: 'No NGO found for the given ID.' });
    }

    return response.json(ngo);
  }
};