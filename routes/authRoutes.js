const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Home route
router.get('/', (req, res) => {
  res.render('index');
});

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

// Registration route
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle login request
router.post('/login', authController.login);

// Handle registration request
router.post('/register', authController.register);

module.exports = router;
