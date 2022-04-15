const winston = require('winston');

module.exports = function (err, req, res, next) {
  // winston.log('error', err.message, {metadata: err.stack}); // works in logfile
  winston.error(err.message, {metadata: err}); // works in db to show meta as Obj
TODO: 'Display meta in logfile so the Obj is not empty'
  //  error
  //  warn
  //  info
  //  verbose
  //  debug
  //  silly
  res.status(500).send('Something failed');
};
