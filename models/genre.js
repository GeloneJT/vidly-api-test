const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const genreSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});
const Genre = mongoose.model('Genre', genreSchema);

//  Validates the data enterd by user in PUT and POST methods
function validateGenre(genre) {
  const schema = Joi.object({
    type: Joi.string().min(5).required(),
  });
  return schema.validate(genre, Joi);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
