const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
  })
);

//  Validates the data enterd by user in PUT and POST methods
function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(50).required(),
    dailyRentalRate: Joi.number().min(0).max(50).required(),
  });
  return schema.validate(movie, Joi);
}

exports.Movie = Movie;
exports.validate = validateMovie;
