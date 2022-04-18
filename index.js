/**
 * @author  Jelani Thomas
 * The following program is built to simulate a movie genre directory webpage
 *  It showcases the simplicities of using Express.js and CRUD methods
 */
const winston = require('winston')
const express = require('express');
const app = express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db_connect')();
require('./startup/config')();

// throw new Error('Something failed durting startup'); //  Create an unhandled  exception on server startup
// const p = Promise.reject(new Error('Failed miserably'))  // Create an unhandled rejection
// p.then(() => console.log('Done'));

//  Creates a server
const port = process.env.PORT || 3000;
app.listen(port, () =>winston.info(`Listening on port ${port}....`));
