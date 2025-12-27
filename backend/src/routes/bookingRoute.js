const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const bookingController = require('../controllers/booking.controller');

router.post('/', auth, bookingController?.createBooking);

module.exports = router;
