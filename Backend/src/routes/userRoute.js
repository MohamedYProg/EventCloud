
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register and Login
router.post('/register', userController.register);
router.post('/login', userController.login);

// Request Event
router.post('/requestEvent', userController.requestEvent);

module.exports = router;

// Path: Backend/src/routes/userRoutes.js