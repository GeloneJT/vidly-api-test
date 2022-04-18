const winston = require('winston');
const { default: mongoose } = require('mongoose');

module.exports = function () {
  mongoose
    .connect('mongodb://localhost/vidly')
    .then(() => winston.info('Connected to MongoDB....'));
};
