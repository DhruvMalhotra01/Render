const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authController = require('../controllers/authController');

// GET Home Page
router.get('/', (req, res) => {
  res.render('home'); // Render home.ejs
});


// POST Signup Form
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

// GET Login Page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', authController.postLogin);
// POST Login Form

router.get('/login', (req, res) => {
    console.log("Login route accessed");
    res.render('login');
  });
  
module.exports = router;
