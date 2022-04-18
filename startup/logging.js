const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
  winston.createLogger({
    format: winston.format.metadata(),
    transports: [
      winston.add(new winston.transports.File({ filename: 'logfile.log' })),
      winston.add(
        new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' })
      ),
    ],
    rejectionHandlers: [
      new winston.transports.File({
        filename: 'rejections.log',
        handleRejections: true,
      }),
    ],
    exceptionHandlers: [
      new winston.transports.File({
        filename: 'uncaughtExceptions.log',
        handleExceptions: true,
      }),
    ],
  });
};
