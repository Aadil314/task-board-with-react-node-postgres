const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Registration endpoint
router.post('/register', (req, res) => {
  UserController.register(req, res);
});

// Login endpoint
router.post('/login', (req, res) => {
  UserController.login(req, res);
});

module.exports = router;
