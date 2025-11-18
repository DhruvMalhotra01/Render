const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });
  

// ✅ Fix: Assign model to a variable first
const User = mongoose.model("User", userSchema);

// ✅ Export it correctly
module.exports = User;
