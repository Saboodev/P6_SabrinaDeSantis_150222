const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// création d'un schéma pour s'enregistrer
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// évite d'enregistrer 2 fois le même email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);