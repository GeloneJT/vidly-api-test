const Joi = require('joi');
const moment = require('moment');
const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');

router.post('/', [auth], async (req, res) => {
  FIXME: 'connect this to work with the validateReturn function';
  // const { error } = validateReturn(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  if (!req.body.customerId)
    return res.status(400).send('customerId not provided');
  if (!req.body.movieId) return res.status(400).send('movieId not provided');

  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send('No rental found');
  if (rental.dateReturned)
    return res.status(400).send('Return already processed');

  rental.return();

  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.status(200).send(rental);
});

FIXME: ' validateReturn currently breaks the route';
function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(req, Joi);
}

module.exports = router;
