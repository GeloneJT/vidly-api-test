const { Rental } = require('../../../models/rental');
const mongoose = require('mongoose');

let server;

describe('/api/returns', () => {
  let customerId;
  let movieId;
  let rental;

  beforeEach(async () => {
    server = require('../../../index');

    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345',
      },
      movie: {
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    server.close();
    await Rental.deleteMany({});
  });

  it('should work', async () => {
    const result = await Rental.findById(rental);
    expect(result).not.toBeNull();
  });
});