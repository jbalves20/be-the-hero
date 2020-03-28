const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query; // Pagination, gotten from url query. If empty, uses page 1.
    
    const [count] = await connection('incidents').count(); // Total count of incidents registered.

    const incidents = await connection('incidents')
      .join('ngos', 'ngos.id', '=', 'incidents.ngo_id') // Adding data from the NGO on the result.
      .limit(5) // Limiting to 5 registers at a time.
      .offset((page - 1) * 5) // Getting the respective 5 registers according to the page.
      .select([ // Selecting all from incidents and some from NGO.
        'incidents.*', 
        'ngos.name', 
        'ngos.email', 
        'ngos.whatsapp', 
        'ngos.city', 
        'ngos.state_abreviation'
      ]);

    // Returning, on the header, the total number of incidents as "X-Total-Count" (the value is "count(*) in count").
    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },
  async create(request, response) {
    const { title, description, value } = request.body;
    // Since the ngo_id depends on the ngo logged in, it is in authentication data (data from the context of the user).
    // As default, authentication data are carried over on the request.headers:
    const ngo_id = request.headers.authorization; // Authorization is the name we gave, for it's the default in this case.

    /*
      The increment is returned when there's a successful insertion. Using [id], we get the first
      (and only, in this case) position of the array of increments.
    */
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ngo_id
    });

    return response.json({ id });
  },
  async delete(request, response) {
    // const id = request.params.id;
    const { id } = request.params; // I do find this way more sophisticated, so replaced mine (above) with it.
    const ngo_id = request.headers.authorization;

    const incident = await connection('incidents').where('id', id).select('ngo_id').first();

    if(!incident){
      return response.status(422).json({ error: 'No register matches this id code.' }) // 422: Unprocessable Entity
    } else if(incident.ngo_id !== ngo_id) {
      return response.status(401).json({ error: 'Operation not permited.' }); // Error 401: Unauthorized.
    }

    await connection('incidents').where('id', id).del();

    return response.status(204).send(); // Status 204: No content (successful, but has no return).
  }
}