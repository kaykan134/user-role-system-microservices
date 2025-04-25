// models/User.js
const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Email must be unique
  password: String,
  role: { type: String, default: 'user' } // Default role is 'user'
});

// Create a model for the schema
const User = mongoose.model('User', userSchema);

// Export the model so we can use it in other files
module.exports = User;
