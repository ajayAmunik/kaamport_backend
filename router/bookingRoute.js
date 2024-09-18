const express = require('express');
const router = express.Router();
const Booking= require('../controller/bookingController');
const verification = require("../middleware/autho")

// Route for creating a new booking
router.post('/bookings',verification.userVerify, Booking.createBooking);

module.exports = router;
