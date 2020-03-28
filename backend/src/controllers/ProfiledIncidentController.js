/*
  Following the MVC standards, we should not have more than five nor repeated method on each controller.
  That said, in order to create a "index" method restricted by NGO (profile restriction), the 
  ProfiledIncidentController.js module was created.
*/
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ngo_id = request.headers.authorization;
    incidents = await connection('incidents').select('*').where('ngo_id', ngo_id);

    return response.json(incidents);
  }
}