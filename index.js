/**
 * @author  Jelani Thomas
 * The following program is built to simulate a movie genre directory webpage
 *  It showcases the simplicities of using Express.js and CRUD methods
 */
const winston = require('winston');
const express = require('express');
const app = express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db_connect')();
require('./startup/config')();
require('./startup/prod')(app);

//  Creates a server
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}....`)
);

module.exports = server;
