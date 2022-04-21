const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

//  GET Endpoint to get all genres
router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    // throw new Error('Could not get the genres');  // Uncomment to simulate error for winston to catch
    const genres = await Genre.find().sort('type');
    res.send(genres);
  })
);

//  GET Endpoint to find a genre based on the ID number
router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send('Invalid ID');
    const genre = await Genre.findById(req.params.id);

    if (!genre)
      return res
        .status(404)
        .send('The genre with the given type was not found');

    res.send(genre);
  })
);

//  POST Route to add new genres
router.post(
  '/',
  asyncMiddleware(auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ type: req.body.type });
    genre = await genre.save();

    res.send(genre);
  })
);

//  PUT Route to update the genre type based on the ID
router.put(
  '/:id',
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { type: req.body.type },
      { new: true }
    );

    if (!genre)
      return res.status(404).send('The genre with the given ID was not found');

    res.send(genre);
  })
);

//  DELETE Route to delete a genre
router.delete(
  '/:id',
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
      return res.status(404).send('The genre with the given ID was not found');

    res.send(genre);
  })
);

module.exports = router;
