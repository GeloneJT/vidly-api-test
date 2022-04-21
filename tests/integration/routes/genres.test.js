const request = require('supertest');
const { Genre } = require('../../../models/genre');
const { User } = require('../../../models/user');
const mongoose = require('mongoose');
let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../../index');
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { type: 'genre1' },
        { type: 'genre2' },
      ]);
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.type === 'genre1')).toBeTruthy();
      expect(res.body.some((g) => g.type === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {
      const genre = new Genre({ type: ' genre1' });
      await genre.save();

      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('type', genre.type);
    });
    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/genres/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no genre with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/genres/' + id);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the test
    let token;
    let type;

    const exec = async () => {
      return await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ type: type });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      type = 'genre1';
    });

    it('should return a 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return a 400 if genre is less than 5 characters', async () => {
      type = '1234';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return a 400 if genre is more than 50 characters', async () => {
      type = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      await exec();

      const genre = await Genre.find({ type: 'genre1' });

      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('type', 'genre1');
    });
  });

  describe('DELETE', () => {
    let token;
    let genre;
    let id;

    const exec = async () => {
      return await request(server)
        .delete('/api/genres/' + id)
        .set('x-auth-token', token)
        .send();
    };

    beforeEach(async () => {
      genre = new Genre({ type: 'genre1' });
      await genre.save();

      id = genre._id;
      token = new User({ isAdmin: true }).generateAuthToken();
    });

    it('should delete genre input if id was found', async () => {
      await exec();

      const genreDb = await Genre.findById(id);

      expect(genreDb).toBeNull();
    });

    it('should return with 404 if invalid id is given', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return with 404 if no genre with the given id was found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });
  });
});
