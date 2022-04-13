const { default: mongoose } = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
  },
});
const Customer = mongoose.model('Customer', customerSchema);

//  Validates the data enterd by user in PUT and POST methods
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(10).maxlength(15).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer, Joi);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
