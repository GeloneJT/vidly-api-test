const auth = require('../middleware/auth')
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

//  GET Endpoint to get all genres
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

//  GET Endpoint to find a movie based on the ID number
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(404).send('The movie with the given name was not found');
    return;
  } else {
    res.send(movie);
  }
});

//  POST Route to add new movies
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findById(req.body.genreId);
  if (genre) {
    res.status(400).send('Invalid genre');
  }
  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();

  res.send(movie);
});

//  PUT Route to update the genre type based on the ID
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie) {
    res.status(404).send('The movie with the given ID was not found');
    return;
  }

  res.send(movie);
});

//  DELETE Route to delete a genre
router.delete('/:id', auth,  async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) {
    res.status(404).send('The movie with the given ID was not found');
    return;
  }
  res.send(movie);
});

module.exports = router;
