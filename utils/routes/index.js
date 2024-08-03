const express = require('express');

const route = express.Router();
const AppController = require('../controllers/AppController');

route.get('/status', AppController.getStatus);
route.get('/stats', AppController.getStats);

module.exports = route;
