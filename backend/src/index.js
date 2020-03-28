const express = require('express'); // Default importation of the express.
const app = express(); // Creation of an instance of the express application for further use.
const routes = require('./routes'); // Importing the router file (routes.js).
const cors = require('cors'); // Used to limitate "who" can access your application.

/*
  - Route: the url for you application. Notice that it includes the host and the 
  respective path (i.e.: 'localhost:3300/users').
  - Resources: the functionalities to be accessed through a route. Are represented
  by the path ('/users' in the example above. On the method below, is the '/').
*/

/*
  HTTP methods (main four):
  
  - GET: requisition to access/recover data from the backend;
  - POST: requisition to create/insert data on the backend;
  - PUT: requisition to update/alter pre-existing data on the backend;
  - DELETE: requisition to "erase/remove" data from the backend.

  Below is an example of get method: when accessing localhost:3300/, you'll receive
  the respective response (an h1 element with "Hello World").
*/

/*
  Param types (ways of passing params from front to backend):

  - Query param: literally a query at the url, that is, named params passed with the route.
  It's put after an '?' at the url, and is generally used for filters, pagination and related.
  Multiple params can be passed with an '&' (ampersand) dividing them.
    Passing on the url: host/users?name=fulano&sex=m
    Defining on the request method: app.get('/users')
    Recovering inside the request method: request.query.name and request.query.sex
  
  - Route param: is a predefined param passed on the route after a '/'. Is mostly used to
  identify resources, like an user id, for example.
    Passing on the url: host/user/120412
    Defining inside the request method: app.get('/user/:id')
    Recovering inside the request method: request.params.id
  
  - Request Body param: params sent to the backend on the body of the request, not on the route.
  Is commonly used for creating or updating data. Can be sent in different formats, such as XML,
  but in Javascript is usually passed as a JSON.
    Passing: through the body (as a JSON, in most cases)
    Defining inside the request method: app.post('/user')
    Recovering inside the request method: request.body (contains the JSON, that will be converted
    into a Javascript object with a body parser, like in expressApp.use(express.json()) (see below)
*/

app.use(cors()); // Pass the params for the restriction of access.

app.use(express.json()); // Defining the body parser for JSON, turning them into objects when received.

app.use(routes); // Linking the routes on the router file to the index file.

app.listen(3300); // Defining the port the application will listen to.

/*
  Ways of accessing database inside the code:

  - Database Driver: works with the query itself, like 'SELECT * FROM users WHERE...';
  - Query Builder: works with the language, with commands that build queries, as
    table('users').select('*').where(...).
    For this project, we're using the QB Knex, with the SQLite (DB) extension.
*/