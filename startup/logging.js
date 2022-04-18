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
};
