const User = require('../models/User');
const bcrypt = require('bcryptjs');

const session = require('express-session');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.getSignup = (req, res) => {
  res.render('signup', { error: null }); 
};

exports.postSignup = async (req, res) => {
  console.log("BODY:", req.body);
  const { username, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { error: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    req.session.user = newUser; // Log them in after signup
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('signup', { error: 'Something went wrong. Please try again.' });
  }
};
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      res.redirect('/hotelBooking');
    } else {
      res.render('login', { error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login Error:', err);
    res.render('login', { error: 'Something went wrong. Please try again.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

