/**
 * @author  Jelani Thomas
 * The following program is built to simulate a movie genre directory webpage
 *  It showcases the simplicities of using Express.js and CRUD methods
 */
const { default: mongoose } = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB....'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

//  Creates a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
