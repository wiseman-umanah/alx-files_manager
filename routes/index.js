const express = require('express');

const route = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

route.get('/status', AppController.getStatus);
route.get('/stats', AppController.getStats);
route.get('/users', UsersController.postNew);

module.exports = route;
