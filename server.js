const express = require('express');
const process = require('process');
const route = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

app.use('/', route);

app.listen(port);

module.exports = app;
