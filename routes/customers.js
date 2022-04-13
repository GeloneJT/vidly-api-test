const {Customer, validate} = require("../models/customer")
const express = require('express');
const router = express.Router();

//  Endpoint to get all customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

//  Endpoint to find a customer based on the ID number
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404).send('The customer with the given ID was not found');
    return;
  } else {
    res.send(customer);
  }
});

//  Route to add new customers
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();

  res.send(customer);
});

//  Route to update the customer based on the ID
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );

  if (!genre) {
    res.status(404).send('The customer with the given ID was not found');
    return;
  }

  res.send(genre);
});

//  Route to delete a customer
router.delete('/:id', async (req, res) => {
  const genre = await Customer.findByIdAndRemove(req.params.id);
  if (!genre) {
    res.status(404).send('The genre with the given ID was not found');
    return;
  }
  res.send(genre);
});

module.exports = router;
