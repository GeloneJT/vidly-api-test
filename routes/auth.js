const asyncMiddleware = require('../middleware/async');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
  })
);

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
  })
);

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(10).max(50).required().email(),
    password: Joi.string().required().min(8).max(1024),
  });
  return schema.validate(req, Joi);
}

module.exports = router;
