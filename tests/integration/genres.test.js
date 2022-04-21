const request = require('supertest');
const { default: mongoose } = require('mongoose');
const { Genre } = require('../../models/genre');
let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
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

    describe('GET /:id', () => {
      it('should return a genre if valid id is passed', async () => {
        const genre = new Genre({ type: ' genre1' });
        await genre.save();

        const res = await request(server).get('/api/genres/' + genre._id);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('type', genre.type);
      });
      it('should return 404 if invalid id is passed', async () => {
        const res = await request(server).get('/api/genres/1' );

        expect(res.status).toBe(404);
      });
    });
  });
});
