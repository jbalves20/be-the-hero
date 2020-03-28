const express = require('express');
const NGOController = require('./controllers/NGOController');
const IncidentController = require('./controllers/IncidentController');
const ProfiledIncidentController = require('./controllers/ProfiledIncidentController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

// This is a file for the routes (not to pollute index.js).

// Below, the NGO routes using the NGOController callbacks implementations:
routes.post(['/ngos', '/ongs'], NGOController.create);
routes.get(['/ngos', '/ongs'], NGOController.index);

// Incident routes
routes.post(['/incidents', '/incidentes'], IncidentController.create);
routes.get(['/incidents', '/incidentes'], IncidentController.index);
routes.delete(['/incidents/:id', '/incidentes/:id'], IncidentController.delete);

// Profiled incidents routes
routes.get(['/our-incidents', '/nossos-incidentes'], ProfiledIncidentController.index);

// Session routes (we use a post method named create because we're creating a new session)
routes.post(['/session', '/sessao'], SessionController.create);

module.exports = routes;