const { Schema, model } = require('mongoose');

const schema = new Schema({
  firstname: { type: String, required: true, minlength: 3 },
  lastname: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, minlength: 3 },
  phoneNumber: { type: Number, required: true },
  location: {
    city: { type: String, required: true, minlength: 3 },
    adress: { type: String, required: true, minlength: 3 },
  },
  socialNetworks: { type: Array },
});

module.exports = model('User', schema);
