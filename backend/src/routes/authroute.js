const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.post('/signup', authController.signup);
router.get('/verify/:token', authController.verifyEmail);
router.post('/login', authController.login);

module.exports = router;
