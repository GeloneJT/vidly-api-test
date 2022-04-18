/**
 * @author  Jelani Thomas
 * The following program is built to simulate a movie genre directory webpage
 *  It showcases the simplicities of using Express.js and CRUD methods
 */
const { default: mongoose } = require('mongoose');
const express = require('express');
const config = require('config');
const winston = require('winston');
const app = express();
require('winston-mongodb');
require('./startup/routes')(app)

winston.createLogger({
  format: winston.format.metadata(),
  transports: [
    winston.add(new winston.transports.File({ filename: 'logfile.log' })),
    winston.add(
      new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' })
    ),
  ],
});

winston.exceptions.handle(
  new winston.transports.File({
    filename: 'uncaughtExceptions.log',
    handleExceptions: true,
  })
);

winston.rejections.handle(
  new winston.transports.File({
    filename: 'rejections.log',
    handleRejections: true,
  })
);

// throw new Error('Something failed durting startup'); //  Create an unhandled  exception on server startup
// const p = Promise.reject(new Error('Failed miserably'))  // Create an unhandled rejection
// p.then(() => console.log('Done'));

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB....'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));



//  Creates a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
