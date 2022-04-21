require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');


module.exports = function () {
  const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      winston.add(new winston.transports.File({ filename: 'logfile.log' })),
      winston.add(
        new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' })
      ),
    ],
    handleExceptions: [
      winston.exceptions.handle(
        new winston.transports.File({
          filename: 'uncaughtExceptions.log',
        }),
        new winston.transports.Console({})
      ),
    ],
    // handleRejections: [
    //   winston.rejections.handle(
    //     new winston.transports.File({
    //       filename: 'rejections.log',
    //     })
    //   ),
    // ],
  });
};
